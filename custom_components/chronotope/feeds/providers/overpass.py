"""OpenStreetMap via Overpass: bbox tiles at zoom 8, cached 7 days.

The panel asks ``/data?bbox=&zoom=``; tiles that are missing or expired
are queued and fetched one at a time (spec 8.3: max 2x2 degrees, one
query in flight, 10 000 queries per day). Below zoom 8 nothing is fetched
and the response says ``zoom_in``.
"""

from __future__ import annotations

import asyncio
import time
from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult

INTERPRETER_URL = "https://overpass-api.de/api/interpreter"
_TILE_TTL_S = 7 * 24 * 3600
_QUERY_GAP_S = 2.0
_DAILY_LIMIT = 10_000


class OverpassProvider(FeedProvider):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self._tiles: dict[str, dict[str, Any]] = {}
        self._queue: list[tuple[int, int, int]] = []
        self._daily = feeds_parse.DailyBudget(_DAILY_LIMIT)
        self._daily.load(self.policy.extra.get("daily"))
        self._current: tuple[int, int, int] | None = None

    @property
    def kind(self) -> str:
        return str(self.params.get("kind") or self.spec.params_schema["kind"]["default"])

    # The base loop drives one queued tile per iteration.
    async def _loop(self) -> None:
        try:
            while self._running:
                if not self._queue:
                    await self._sleep(3600)
                    continue
                wait = self.policy.seconds_until_allowed()
                if wait > 0:
                    await self._sleep(wait)
                    continue
                await self._run_once()
                await self._sleep(_QUERY_GAP_S)
        except asyncio.CancelledError:
            raise
        except Exception:  # noqa: BLE001
            import logging

            logging.getLogger(__name__).exception("Feed %s: loop crashed", self.layer_id)

    async def async_fetch(self) -> FetchResult | None:
        if not self._queue:
            return None
        if not self._daily.allow():
            from ..base import BudgetExceeded

            raise BudgetExceeded("Overpass daily query limit reached")
        self.policy.extra["daily"] = self._daily.to_dict()
        self._current = self._queue.pop(0)
        query = feeds_parse.overpass_query(self.kind, feeds_parse.tile_bbox(*self._current))
        return await self.fetch_url(
            INTERPRETER_URL, method="POST", data={"data": query}, conditional=False, allow_redirects=True
        )

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_overpass(body, self.kind, self.spec.budget.max_features)

    def _set_payload(self, parsed: dict[str, Any]) -> None:
        if self._current is not None:
            key = "/".join(str(v) for v in self._current)
            self._tiles[key] = {"features": parsed.get("features") or [], "fetched": time.time()}
            self._current = None
        self._payload = {"tiles": self._tiles}
        self._count = sum(len(t["features"]) for t in self._tiles.values())

    async def _load_cache(self) -> None:
        await super()._load_cache()
        if self._payload and "tiles" in self._payload:
            self._tiles = self._payload["tiles"]
            self._count = sum(len(t["features"]) for t in self._tiles.values())

    def request_area(self, bbox: str | None, zoom: float | None) -> dict[str, Any]:
        """Register interest in an area; returns queue info for meta."""
        if not bbox or zoom is None:
            return {"zoom_in": True, "pending": 0}
        try:
            box = feeds_parse.parse_bbox(bbox)
        except ValueError:
            return {"zoom_in": True, "pending": 0}
        tiles = feeds_parse.overpass_tiles(box, zoom)
        if not tiles:
            return {"zoom_in": True, "pending": 0}
        now = time.time()
        queued = 0
        for tile in tiles:
            key = "/".join(str(v) for v in tile)
            cached = self._tiles.get(key)
            if cached and now - cached["fetched"] < _TILE_TTL_S:
                continue
            if tile not in self._queue and tile != self._current:
                self._queue.append(tile)
                queued += 1
        if queued:
            self._wake.set()
        return {"zoom_in": False, "pending": len(self._queue) + (1 if self._current else 0)}

    def snapshot(self, bbox: str | None = None, zoom: float | None = None) -> dict[str, Any]:
        info = self.request_area(bbox, zoom)
        meta = self.meta()
        meta.update(info)
        features: list[dict[str, Any]] = []
        seen: set[str] = set()
        for tile in self._tiles.values():
            for feature in tile["features"]:
                if feature["id"] not in seen:
                    seen.add(feature["id"])
                    features.append(feature)
        if bbox:
            try:
                features = feeds_parse.bbox_filter(features, feeds_parse.parse_bbox(bbox))
            except ValueError:
                pass
        meta["count"] = len(features)
        meta["daily_used"] = self._daily.count
        return {"type": "FeatureCollection", "features": features, "meta": meta}
