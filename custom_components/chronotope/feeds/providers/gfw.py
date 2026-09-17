"""Global Fishing Watch Events API v3 -> fishing events (bbox-filtered)."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from ... import feeds_parse
from ..base import Failure, FeedProvider, FetchResult, bbox_around

EVENTS_URL = "https://gateway.api.globalfishingwatch.org/v3/events"


class GfwProvider(FeedProvider):
    def bbox(self) -> tuple[float, float, float, float]:
        bbox = self.params.get("bbox")
        if bbox and len(bbox) == 4:
            return tuple(float(v) for v in bbox)  # type: ignore[return-value]
        lat, lon = self.manager.home_center
        return bbox_around(lat, lon, 500.0)

    async def async_fetch(self) -> FetchResult | None:
        token = self.manager.key("gfw")
        if not token:
            raise Failure("Global Fishing Watch token is not configured")
        now = datetime.now(timezone.utc)
        return await self.fetch_url(
            EVENTS_URL,
            params={
                "datasets[0]": "public-global-fishing-events:latest",
                "start-date": (now - timedelta(days=7)).date().isoformat(),
                "end-date": now.date().isoformat(),
                "limit": "1000",
                "offset": "0",
            },
            headers={"Authorization": f"Bearer {token}"},
            conditional=False,
        )

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_gfw_events(body, self.spec.budget.max_features, bbox=self.bbox())
