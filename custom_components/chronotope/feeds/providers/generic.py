"""User-configured GeoJSON URL layers (server-side fetch, I10)."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult
from ..catalog import Budget, KLASS_FEATURES, LayerSpec, LicenseInfo

GEOJSON_BUDGET = Budget(max_bytes=10_000_000, max_features=50_000, max_calls_per_hour=4)


def spec_for_generic(config: dict[str, Any]) -> LayerSpec:
    attribution = config.get("attribution") or {}
    return LayerSpec(
        id=config["id"],
        provider="geojson_url",
        klass=KLASS_FEATURES,
        title_key=config.get("title") or config["id"],
        min_interval_s=900,
        default_interval_s=int(config.get("interval_s") or 3600),
        attribution=(attribution.get("text") or "", attribution.get("url") or ""),
        license=LicenseInfo("user", None, False, config.get("license_note")),
        budget=GEOJSON_BUDGET,
        style={"color": "#66bb6a", "kind": "custom"},
        bbox_filtered=True,
        milestone="M2",
    )


class GeoJsonUrlProvider(FeedProvider):
    async def async_fetch(self) -> FetchResult | None:
        return await self.fetch_url(self.config["url"], allow_redirects=True)

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_geojson_features(
            body, "custom", self.layer_id, max_features=self.spec.budget.max_features
        )
