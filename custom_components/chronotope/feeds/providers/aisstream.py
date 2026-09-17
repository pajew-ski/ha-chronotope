"""AISStream websocket: vessels inside the layer bbox, hard limits (8.1).

The connection lives only while the layer is active; reconnects use the
policy backoff. Positions are kept in memory (I3) and published every
10 s; objects unseen for 15 minutes expire.
"""

from __future__ import annotations

import asyncio
import json
import logging
import time
from typing import Any

import aiohttp

from ... import feeds_parse
from ..base import FeedProvider, FetchResult, bbox_around, _now_iso

_LOGGER = logging.getLogger(__name__)
STREAM_URL = "wss://stream.aisstream.io/v0/stream"
_PUBLISH_EVERY_S = 10
_EXPIRE_S = 15 * 60


class AisStreamProvider(FeedProvider):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.limiter = feeds_parse.AisLimiter(
            max_objects=self.spec.budget.max_features, max_msgs_per_s=50
        )
        self._ws: aiohttp.ClientWebSocketResponse | None = None

    def bbox(self) -> tuple[float, float, float, float]:
        lat, lon = self.center()
        return bbox_around(lat, lon, self.radius_nm(default=50.0) * feeds_parse.NM_TO_KM)

    async def _loop(self) -> None:
        try:
            while self._running:
                wait = self.policy.seconds_until_allowed()
                if wait > 0:
                    await self._sleep(wait)
                    continue
                key = self.manager.key("aisstream")
                if not key:
                    self.policy.record_failure("AISStream API key is not configured")
                    self._publish_status()
                    await self._sleep(600)
                    continue
                self.policy.record_attempt()
                self._calls.append(time.time())
                try:
                    await self._stream(key)
                except asyncio.CancelledError:
                    raise
                except Exception as err:  # noqa: BLE001
                    self.policy.record_failure(f"{type(err).__name__}: {err}")
                    _LOGGER.info("Feed %s: stream ended: %s", self.layer_id, err)
                await self.manager.async_save_policy(self.layer_id, self.policy.to_dict())
                self._publish_status()
        except asyncio.CancelledError:
            raise

    async def _stream(self, key: str) -> None:
        min_lon, min_lat, max_lon, max_lat = self.bbox()
        subscription = {
            "APIKey": key,
            "BoundingBoxes": [[[min_lat, min_lon], [max_lat, max_lon]]],
            "FilterMessageTypes": ["PositionReport"],
        }
        last_publish = time.time()
        async with self._session.ws_connect(STREAM_URL, heartbeat=30, timeout=20) as ws:
            self._ws = ws
            await ws.send_str(json.dumps(subscription))
            self.policy.record_success()
            self._publish_status()
            try:
                async for msg in ws:
                    if not self._running:
                        break
                    if msg.type == aiohttp.WSMsgType.TEXT:
                        try:
                            data = json.loads(msg.data)
                        except ValueError:
                            continue
                        if isinstance(data, dict) and data.get("error"):
                            raise RuntimeError(f"AISStream: {data['error']}")
                        self.limiter.offer(feeds_parse.parse_ais_message(data))
                    elif msg.type in (aiohttp.WSMsgType.CLOSED, aiohttp.WSMsgType.ERROR):
                        break
                    if time.time() - last_publish >= _PUBLISH_EVERY_S:
                        last_publish = time.time()
                        self.limiter.expire(_EXPIRE_S)
                        self._payload = {"features": self.limiter.features()}
                        self._count = len(self._payload["features"])
                        self._payload_time = _now_iso()
                        self.policy.record_success()
                        self._publish_status()
            finally:
                self._ws = None

    async def async_stop(self) -> None:
        if self._ws is not None:
            try:
                await self._ws.close()
            except Exception:  # noqa: BLE001
                pass
        await super().async_stop()

    async def async_fetch(self) -> FetchResult | None:  # pragma: no cover - stream-driven
        return None

    def parse(self, body: bytes) -> dict[str, Any]:  # pragma: no cover
        return {"features": [], "truncated": False}

    def meta(self) -> dict[str, Any]:
        meta = super().meta()
        meta["dropped_rate"] = self.limiter.dropped_rate
        meta["dropped_capacity"] = self.limiter.dropped_capacity
        return meta
