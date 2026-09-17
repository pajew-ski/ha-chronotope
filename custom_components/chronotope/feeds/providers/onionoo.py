"""Tor Onionoo running relays (If-Modified-Since is mandatory there)."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult

DETAILS_URL = "https://onionoo.torproject.org/details"
FIELDS = "nickname,fingerprint,latitude,longitude,flags,observed_bandwidth,country"


class OnionooProvider(FeedProvider):
    async def async_fetch(self) -> FetchResult | None:
        return await self.fetch_url(
            DETAILS_URL, params={"type": "relay", "running": "true", "fields": FIELDS}, conditional=True
        )

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_onionoo(body, self.spec.budget.max_features)
