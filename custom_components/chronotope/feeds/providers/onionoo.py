"""Tor Onionoo running relays per country (choropleth).

Onionoo 8.0 no longer publishes relay coordinates (measured 2026-09-17:
0 of 200 relays carried latitude/longitude), so the layer aggregates by
``country``. If-Modified-Since is mandatory there and honored.
"""

from __future__ import annotations

from ... import feeds_parse
from ..base import Failure
from .choropleth import ChoroplethProvider

DETAILS_URL = "https://onionoo.torproject.org/details"
FIELDS = "nickname,fingerprint,flags,observed_bandwidth,country"


class OnionooProvider(ChoroplethProvider):
    value_kind = "tor_relays"

    async def async_fetch_values(self) -> dict[str, float] | None:
        result = await self.fetch_url(
            DETAILS_URL, params={"type": "relay", "running": "true", "fields": FIELDS}, conditional=True
        )
        if result is None:
            return None  # 304: keep the last join
        parsed = await self.hass.async_add_executor_job(feeds_parse.parse_onionoo_countries, result.body)
        if not parsed["values"]:
            raise Failure("Onionoo returned no relays with a country")
        self._extra = parsed["extra"]
        self.policy.extra["relays_published"] = parsed.get("source_time")
        return parsed["values"]
