"""NASA FIRMS Area API (VIIRS SNPP NRT, CSV) -> fire events."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import Failure, FeedProvider, FetchResult, bbox_around

AREA_URL = "https://firms.modaps.eosdis.nasa.gov/api/area/csv/{key}/VIIRS_SNPP_NRT/{w:.2f},{s:.2f},{e:.2f},{n:.2f}/1"


class FirmsProvider(FeedProvider):
    def bbox(self) -> tuple[float, float, float, float]:
        bbox = self.params.get("bbox")
        if bbox and len(bbox) == 4:
            return tuple(float(v) for v in bbox)  # type: ignore[return-value]
        lat, lon = self.manager.home_center
        return bbox_around(lat, lon, 500.0)

    async def async_fetch(self) -> FetchResult | None:
        key = self.manager.key("firms")
        if not key:
            raise Failure("FIRMS MAP_KEY is not configured")
        w, s, e, n = self.bbox()
        return await self.fetch_url(AREA_URL.format(key=key, w=w, s=s, e=e, n=n), conditional=False)

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_firms_csv(body, self.spec.budget.max_features)
