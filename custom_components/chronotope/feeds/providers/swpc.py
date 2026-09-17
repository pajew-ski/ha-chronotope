"""NOAA SWPC: OVATION aurora grid plus the planetary Kp index."""

from __future__ import annotations

import time
from typing import Any

from ... import feeds_parse
from ..base import Failure, FeedProvider, FetchResult

AURORA_URL = "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json"
KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"
_KP_INTERVAL_S = 900


class SwpcProvider(FeedProvider):
    calls_per_cycle = 2

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.kp: dict[str, Any] | None = self.policy.extra.get("kp")

    async def async_fetch(self) -> FetchResult | None:
        if time.time() - float(self.policy.extra.get("kp_fetched", 0)) >= _KP_INTERVAL_S:
            try:
                kp_result = await self.fetch_url(KP_URL, conditional=False, max_bytes=512 * 1024)
                if kp_result is not None:
                    self.kp = await self.hass.async_add_executor_job(feeds_parse.parse_swpc_kp, kp_result.body)
                    self.policy.extra["kp"] = self.kp
                    self.policy.extra["kp_fetched"] = time.time()
            except (Failure, feeds_parse.ParseError):
                pass  # Kp is a side product; the aurora grid decides freshness
        return await self.fetch_url(AURORA_URL)

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_swpc_aurora(body)

    def value_at(self, lat: float, lon: float) -> float | None:
        payload = self._payload or {}
        if "grid" not in payload:
            return None
        return feeds_parse.grid_value_at(payload["grid"], lat, lon)

    def meta(self) -> dict[str, Any]:
        meta = super().meta()
        if self.kp:
            meta["kp"] = self.kp
        return meta
