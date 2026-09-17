"""adsb.lol v2: regional point query or global military list.

Fallback (8.1): when adsb.lol is blocked or failing, the regional layer
polls OpenSky instead, at OpenSky's slower cadence. Never both at once: a
cycle asks adsb.lol first and only turns to OpenSky when that failed.
"""

from __future__ import annotations

import time
from typing import Any

from ... import feeds_parse
from ..base import Blocked, Failure, FeedProvider, FetchResult
from .opensky import fetch_opensky_states

POINT_URL = "https://api.adsb.lol/v2/lat/{lat:.4f}/lon/{lon:.4f}/dist/{nm:.0f}"
MIL_URL = "https://api.adsb.lol/v2/mil"
_FALLBACK_DEFAULT_S = 6 * 3600
_FALLBACK_INTERVAL_S = 60
_FALLBACK_AFTER_FAILURES = 3


class AdsbLolProvider(FeedProvider):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self._source = "adsb"

    @property
    def _military(self) -> bool:
        return self.params.get("mode") == "mil" or self.spec.id == "flights_military"

    def _fallback_active(self) -> bool:
        until = self.policy.extra.get("adsb_fallback_until")
        return bool(until) and until > time.time()

    async def async_fetch(self) -> FetchResult | None:
        if self._military:
            self._source = "adsb"
            return await self.fetch_url(MIL_URL, conditional=False)
        if self._fallback_active():
            return await self._fetch_fallback()
        lat, lon = self.center()
        try:
            result = await self.fetch_url(
                POINT_URL.format(lat=lat, lon=lon, nm=self.radius_nm()), conditional=False
            )
        except Blocked as err:
            self.policy.extra["adsb_fallback_until"] = time.time() + (err.retry_after_s or _FALLBACK_DEFAULT_S)
            self.policy.extra["adsb_error"] = f"HTTP {err.status}"
            return await self._fetch_fallback()
        except Failure as err:
            failures = int(self.policy.extra.get("adsb_failures", 0)) + 1
            self.policy.extra["adsb_failures"] = failures
            if failures >= _FALLBACK_AFTER_FAILURES:
                self.policy.extra["adsb_fallback_until"] = time.time() + 3600
                self.policy.extra["adsb_error"] = str(err)
                return await self._fetch_fallback()
            raise
        self.policy.extra["adsb_failures"] = 0
        self._source = "adsb"
        return result

    async def _fetch_fallback(self) -> FetchResult | None:
        self._source = "opensky"
        # OpenSky must not be hit faster than once a minute.
        self.interval_s = max(self.interval_s, _FALLBACK_INTERVAL_S)
        return await fetch_opensky_states(self)

    def parse(self, body: bytes) -> dict[str, Any]:
        if self._source == "opensky":
            parsed = feeds_parse.parse_opensky(body, self.spec.budget.max_features)
        else:
            parsed = feeds_parse.parse_adsb(body, self.spec.budget.max_features)
        parsed["source"] = self._source
        return parsed

    def meta(self) -> dict[str, Any]:
        meta = super().meta()
        if self._source == "opensky":
            meta["attribution"] = {
                "text": "The OpenSky Network (fallback; non-commercial)",
                "url": "https://opensky-network.org",
            }
            meta["fallback"] = "opensky"
            meta["fallback_reason"] = self.policy.extra.get("adsb_error")
        return meta
