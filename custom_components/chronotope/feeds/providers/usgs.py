"""USGS earthquake summary feed -> events."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult

FEED_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/{magnitude}_{period}.geojson"


class UsgsProvider(FeedProvider):
    async def async_fetch(self) -> FetchResult | None:
        magnitude = str(self.params.get("magnitude") or "2.5")
        period = str(self.params.get("period") or "day")
        return await self.fetch_url(FEED_URL.format(magnitude=magnitude, period=period))

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_usgs(body, self.spec.budget.max_features)
