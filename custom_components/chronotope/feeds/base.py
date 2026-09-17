"""FeedProvider base class: polling loop, politeness, budgets, caches.

One instance per active layer. The loop waits until the policy allows an
attempt, fetches (subclass ``async_fetch``), parses in the executor
(subclass ``parse``), then either publishes a data snapshot (tracks,
features, grid, omm) or writes events to the store (events class).
Every failure mode degrades to the last good state (I11).
"""

from __future__ import annotations

import asyncio
import gzip
import json
import logging
import time
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import TYPE_CHECKING, Any

import aiohttp

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.dispatcher import async_dispatcher_send

from ..const import CACHE_DIRNAME, DATA_STORE, DOMAIN, SIGNAL_LAYER_DATA
from ..feeds_parse import ParseError, bbox_filter, parse_bbox
from ..signals import notify_event_change
from .catalog import KLASS_EVENTS, KLASS_GRID, KLASS_TRACKS, LayerSpec, USER_AGENT
from .policy import BLOCKER_CODES, FeedPolicy, parse_retry_after

if TYPE_CHECKING:
    from . import FeedManager

_LOGGER = logging.getLogger(__name__)

REQUEST_TIMEOUT_S = 20
_CHUNK = 64 * 1024


class BudgetExceeded(Exception):
    """Response larger than the layer's byte budget."""


class Blocked(Exception):
    """Upstream answered with a blocker status code."""

    def __init__(self, status: int, retry_after_s: float | None, body: bytes) -> None:
        super().__init__(f"HTTP {status}")
        self.status = status
        self.retry_after_s = retry_after_s
        self.body = body


class Failure(Exception):
    """Retryable failure (5xx, timeout, network)."""

    def __init__(self, message: str, status: int | None = None) -> None:
        super().__init__(message)
        self.status = status


@dataclass
class FetchResult:
    status: int
    body: bytes
    headers: dict[str, str]

    @property
    def etag(self) -> str | None:
        return self.headers.get("ETag")

    @property
    def last_modified(self) -> str | None:
        return self.headers.get("Last-Modified")


class FeedProvider:
    """Base class; subclasses implement ``async_fetch`` and ``parse``."""

    # Set by subclasses that talk to more than one endpoint per cycle.
    calls_per_cycle = 1

    def __init__(
        self, hass: HomeAssistant, manager: "FeedManager", spec: LayerSpec, config: dict[str, Any]
    ) -> None:
        self.hass = hass
        self.manager = manager
        self.spec = spec
        self.config = dict(config)
        self.layer_id = config.get("id") or spec.id
        self.interval_s = self._effective_interval(config)
        self.policy = FeedPolicy.from_dict(
            manager.policy_state(self.layer_id), min_interval_s=spec.min_interval_s
        )
        self._task: asyncio.Task | None = None
        self._wake = asyncio.Event()
        self._running = False
        self._payload: dict[str, Any] | None = None  # last good snapshot (data classes)
        self._payload_time: str | None = None
        self._source_time: str | None = None
        self._count = 0
        self._truncated = False
        self._calls: list[float] = []  # timestamps for the per-hour budget
        self._session = async_get_clientsession(hass)
        self.version = manager.version

    # ---------------------------------------------------------------- setup

    def _effective_interval(self, config: dict[str, Any]) -> int:
        wanted = config.get("interval_s") or self.spec.default_interval_s
        return max(int(wanted), int(self.spec.min_interval_s))

    @property
    def params(self) -> dict[str, Any]:
        return self.config.get("params") or {}

    @property
    def store(self):
        return self.hass.data.get(DOMAIN, {}).get(DATA_STORE)

    @property
    def cache_path(self) -> Path:
        return Path(self.hass.config.path(CACHE_DIRNAME)) / f"{self.layer_id}.json.gz"

    async def async_start(self) -> None:
        if self._running:
            return
        self._running = True
        self.policy.enabled = True
        if self.spec.klass != KLASS_EVENTS:
            await self._load_cache()
        self._task = self.hass.async_create_background_task(
            self._loop(), f"chronotope feed {self.layer_id}"
        )

    async def async_stop(self) -> None:
        self._running = False
        self.policy.enabled = False
        self._wake.set()
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except (asyncio.CancelledError, Exception):  # noqa: BLE001
                pass
            self._task = None
        await self.manager.async_save_policy(self.layer_id, self.policy.to_dict())

    def update_config(self, config: dict[str, Any]) -> None:
        """Interval/params changed without restart; wakes the loop."""
        self.config = dict(config)
        self.interval_s = self._effective_interval(config)
        self._wake.set()

    # ----------------------------------------------------------------- loop

    async def _loop(self) -> None:
        try:
            while self._running:
                wait = max(self.policy.seconds_until_allowed(), 0.0)
                if wait > 0:
                    await self._sleep(wait)
                    if not self._running:
                        break
                    continue
                await self._run_once()
                await self._sleep(self.interval_s)
        except asyncio.CancelledError:
            raise
        except Exception:  # noqa: BLE001 - never let a provider kill the loop
            _LOGGER.exception("Feed %s: loop crashed", self.layer_id)

    async def _sleep(self, seconds: float) -> None:
        self._wake.clear()
        try:
            await asyncio.wait_for(self._wake.wait(), timeout=seconds)
        except asyncio.TimeoutError:
            pass

    async def _run_once(self) -> None:
        if not self._hour_budget_ok():
            self.policy.record_budget_exceeded(
                f"more than {self.spec.budget.max_calls_per_hour} calls in the last hour"
            )
            _LOGGER.warning("Feed %s: hourly call budget exhausted", self.layer_id)
            self._publish_status()
            return
        self.policy.record_attempt()
        try:
            result = await self.async_fetch()
        except Blocked as err:
            self.policy.record_blocked(err.status, err.retry_after_s, str(err))
            _LOGGER.warning(
                "Feed %s: blocked by upstream (HTTP %s), pausing", self.layer_id, err.status
            )
        except BudgetExceeded as err:
            self.policy.record_budget_exceeded(str(err))
            _LOGGER.warning("Feed %s: %s", self.layer_id, err)
        except Failure as err:
            self.policy.record_failure(str(err), err.status)
            _LOGGER.info("Feed %s: %s", self.layer_id, err)
        except asyncio.CancelledError:
            raise
        except Exception as err:  # noqa: BLE001
            self.policy.record_failure(f"{type(err).__name__}: {err}")
            _LOGGER.warning("Feed %s: unexpected error: %s", self.layer_id, err)
        else:
            if result is None:
                self.policy.record_not_modified()
            else:
                try:
                    await self._handle_result(result)
                except (ParseError, ValueError) as err:
                    self.policy.record_failure(f"parse error: {err}")
                    _LOGGER.warning("Feed %s: parse error: %s", self.layer_id, err)
                else:
                    self.policy.record_success(result.etag, result.last_modified, result.status)
        await self.manager.async_save_policy(self.layer_id, self.policy.to_dict())
        self._publish_status()

    def _hour_budget_ok(self) -> bool:
        now = time.time()
        self._calls = [t for t in self._calls if now - t < 3600]
        if len(self._calls) + self.calls_per_cycle > self.spec.budget.max_calls_per_hour:
            return False
        return True

    async def _handle_result(self, result: FetchResult) -> None:
        parsed = await self.hass.async_add_executor_job(self.parse, result.body)
        if self.spec.klass == KLASS_EVENTS:
            await self._store_events(parsed)
            self._count = len(parsed.get("events") or [])
        else:
            self._set_payload(parsed)
            await self._write_cache()
        self._truncated = bool(parsed.get("truncated"))
        self._source_time = parsed.get("source_time")
        self._payload_time = _now_iso()

    # --------------------------------------------------------------- fetch

    async def fetch_url(
        self,
        url: str,
        headers: dict[str, str] | None = None,
        params: dict[str, Any] | None = None,
        conditional: bool = True,
        allow_redirects: bool = False,
        method: str = "GET",
        data: Any = None,
        max_bytes: int | None = None,
    ) -> FetchResult | None:
        """Polite GET with UA, timeout, conditional headers and byte budget.

        Returns None on 304 (not modified). Raises Blocked/Failure/
        BudgetExceeded for the policy to record.
        """
        request_headers = {
            "User-Agent": USER_AGENT.format(version=self.version),
            "Accept": "application/json, text/csv, */*;q=0.5",
            "Accept-Encoding": "gzip, deflate",
        }
        if conditional:
            request_headers.update(self.policy.conditional_headers())
        if headers:
            request_headers.update(headers)
        limit = max_bytes or self.spec.budget.max_bytes
        self._calls.append(time.time())
        try:
            async with self._session.request(
                method,
                url,
                headers=request_headers,
                params=params,
                data=data,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT_S),
                allow_redirects=allow_redirects,
            ) as response:
                status = response.status
                if status == 304:
                    return None
                if status in BLOCKER_CODES or (300 <= status < 400):
                    body = await response.content.read(4096)
                    raise Blocked(
                        status, parse_retry_after(response.headers.get("Retry-After")), body
                    )
                if status >= 500:
                    raise Failure(f"HTTP {status}", status)
                if status != 200:
                    body = await response.content.read(512)
                    raise Failure(f"HTTP {status}: {body[:200]!r}", status)
                declared = response.headers.get("Content-Length")
                if declared and declared.isdigit() and int(declared) > limit:
                    raise BudgetExceeded(f"response declares {declared} bytes, budget is {limit}")
                chunks: list[bytes] = []
                size = 0
                async for chunk in response.content.iter_chunked(_CHUNK):
                    size += len(chunk)
                    if size > limit:
                        raise BudgetExceeded(f"response exceeds byte budget of {limit}")
                    chunks.append(chunk)
                return FetchResult(
                    status, b"".join(chunks), {k: v for k, v in response.headers.items()}
                )
        except asyncio.TimeoutError as err:
            raise Failure("timeout") from err
        except aiohttp.ClientError as err:
            raise Failure(f"network error: {err}") from err

    async def async_fetch(self) -> FetchResult | None:
        raise NotImplementedError

    def parse(self, body: bytes) -> dict[str, Any]:
        raise NotImplementedError

    # -------------------------------------------------------------- events

    async def _store_events(self, parsed: dict[str, Any]) -> None:
        store = self.store
        if store is None:
            return
        events = parsed.get("events") or []
        now = _now_iso()
        prefix = f"feed:{self.spec.provider.split('_')[0]}:"

        def _write() -> int:
            saved = 0
            for event in events:
                event = dict(event)
                event["scraped_at"] = now
                try:
                    store.save_event(event, dedupe=False)
                    saved += 1
                except ValueError as err:
                    _LOGGER.debug("Feed %s: skipping event %s: %s", self.layer_id, event.get("id"), err)
            deleted = 0
            if self.spec.retention_days:
                cutoff = datetime.now(timezone.utc) - timedelta(days=self.spec.retention_days)
                deleted = store.delete_events_by_prefix(prefix, older_than=cutoff.isoformat())
            return saved + deleted

        changed = await self.hass.async_add_executor_job(_write)
        if changed:
            notify_event_change(self.hass, "updated", None)

    # ------------------------------------------------------------ snapshot

    def _set_payload(self, parsed: dict[str, Any]) -> None:
        if "grid" in parsed:
            self._payload = {"grid": parsed["grid"], "extra": {k: v for k, v in parsed.items() if k not in ("grid", "truncated", "source_time")}}
            self._count = sum(1 for v in parsed["grid"]["values"] if v)
        elif "omm" in parsed:
            self._payload = {"omm": parsed["omm"]}
            self._count = len(parsed["omm"])
        else:
            self._payload = {"features": parsed.get("features") or []}
            self._count = len(self._payload["features"])

    def snapshot(self, bbox: str | None = None, zoom: float | None = None) -> dict[str, Any]:
        """Response document for the data view (5.3), never raising."""
        meta = self.meta()
        payload = self._payload or {}
        if "grid" in payload:
            doc: dict[str, Any] = {"grid": payload["grid"], "meta": meta}
            doc["meta"].update(payload.get("extra") or {})
            return doc
        if "omm" in payload:
            return {"omm": payload["omm"], "meta": meta}
        features = payload.get("features") or []
        box = None
        if bbox:
            try:
                box = parse_bbox(bbox)
            except ValueError:
                box = None
        if box is not None and self.spec.bbox_filtered:
            features = bbox_filter(features, box)
        meta["count"] = len(features)
        return {"type": "FeatureCollection", "features": features, "meta": meta}

    def meta(self) -> dict[str, Any]:
        freshness = self.policy.freshness(self.interval_s)
        stale_since = None
        if freshness in ("stale", "error", "blocked") and self.policy.last_success:
            stale_since = datetime.fromtimestamp(
                self.policy.last_success, tz=timezone.utc
            ).isoformat(timespec="seconds")
        return {
            "layer_id": self.layer_id,
            "klass": self.spec.klass,
            "fetched_at": self._payload_time,
            "source_time": self._source_time,
            "freshness": freshness,
            "stale_since": stale_since,
            "attribution": {"text": self.spec.attribution[0], "url": self.spec.attribution[1]},
            "license": {"id": self.spec.license.id, "noncommercial": self.spec.license.noncommercial},
            "truncated": self._truncated,
            "count": self._count,
            "interval_s": self.interval_s,
            "style": self.spec.style,
            "last_error": self.policy.last_error,
        }

    def status(self) -> dict[str, Any]:
        data = self.policy.status(self.interval_s)
        data.update({"layer_id": self.layer_id, "count": self._count, "klass": self.spec.klass, "fetched_at": self._payload_time})
        return data

    @callback
    def _publish_status(self) -> None:
        async_dispatcher_send(self.hass, SIGNAL_LAYER_DATA, self.layer_id)

    # --------------------------------------------------------------- cache

    async def _write_cache(self) -> None:
        if self._payload is None:
            return
        payload = {
            "payload": self._payload,
            "fetched_at": _now_iso(),
            "source_time": self._source_time,
            "count": self._count,
            "truncated": self._truncated,
        }

        def _write() -> None:
            self.cache_path.parent.mkdir(parents=True, exist_ok=True)
            tmp = self.cache_path.with_suffix(".tmp")
            with gzip.open(tmp, "wt", encoding="utf-8") as handle:
                json.dump(payload, handle)
            tmp.replace(self.cache_path)

        try:
            await self.hass.async_add_executor_job(_write)
        except OSError as err:
            _LOGGER.warning("Feed %s: cannot write cache: %s", self.layer_id, err)

    async def _load_cache(self) -> None:
        def _read() -> dict[str, Any] | None:
            if not self.cache_path.exists():
                return None
            with gzip.open(self.cache_path, "rt", encoding="utf-8") as handle:
                return json.load(handle)

        try:
            data = await self.hass.async_add_executor_job(_read)
        except (OSError, ValueError) as err:
            _LOGGER.warning("Feed %s: cannot read cache: %s", self.layer_id, err)
            return
        if not data or "payload" not in data:
            return
        self._payload = data["payload"]
        self._payload_time = data.get("fetched_at")
        self._source_time = data.get("source_time")
        self._count = int(data.get("count") or 0)
        self._truncated = bool(data.get("truncated"))
        self._publish_status()

    # ------------------------------------------------------------- helpers

    def center(self) -> tuple[float, float]:
        """Layer center: params.center, else the configured default."""
        center = self.params.get("center") or {}
        if center.get("lat") is not None and center.get("lon") is not None:
            return float(center["lat"]), float(center["lon"])
        return self.manager.home_center

    def radius_nm(self, default: float = 100.0, maximum: float = 250.0) -> float:
        value = self.params.get("radius_nm")
        try:
            radius = float(value) if value is not None else default
        except (TypeError, ValueError):
            radius = default
        return max(5.0, min(maximum, radius))


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def bbox_around(lat: float, lon: float, radius_km: float) -> tuple[float, float, float, float]:
    """Approximate bbox (minLon, minLat, maxLon, maxLat) around a point."""
    import math

    dlat = radius_km / 111.0
    dlon = radius_km / (111.0 * max(0.1, math.cos(math.radians(lat))))
    return (
        max(-180.0, lon - dlon),
        max(-90.0, lat - dlat),
        min(180.0, lon + dlon),
        min(90.0, lat + dlat),
    )
