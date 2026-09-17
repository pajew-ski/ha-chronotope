"""TeleGeography submarine cables and landing points (CC BY-NC-SA)."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult

CABLES_URL = "https://www.submarinecablemap.com/api/v3/cable/cable-geo.json"
LANDINGS_URL = "https://www.submarinecablemap.com/api/v3/landing-point/landing-point-geo.json"


class TeleGeographyProvider(FeedProvider):
    calls_per_cycle = 2

    async def async_fetch(self) -> FetchResult | None:
        cables = await self.fetch_url(CABLES_URL, conditional=False, allow_redirects=True)
        if cables is None:
            return None
        landings = await self.fetch_url(LANDINGS_URL, conditional=False, allow_redirects=True, max_bytes=5_000_000)
        body = cables.body + b"\n\x1e\n" + (landings.body if landings else b"")
        return FetchResult(200, body, cables.headers)

    def parse(self, body: bytes) -> dict[str, Any]:
        cable_raw, _, landing_raw = body.partition(b"\n\x1e\n")
        cables = feeds_parse.parse_geojson_features(cable_raw, "cable", "cable", keep_properties=("id", "name"), max_features=self.spec.budget.max_features)
        features = cables["features"]
        if landing_raw.strip():
            try:
                landings = feeds_parse.parse_geojson_features(landing_raw, "landing_point", "landing", keep_properties=("id", "name"), max_features=self.spec.budget.max_features)
                features = features + landings["features"]
            except feeds_parse.ParseError:
                pass
        features, truncated = feeds_parse._truncate(features, self.spec.budget.max_features)
        return {"features": features, "source_time": None, "truncated": truncated or cables["truncated"]}
