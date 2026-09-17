"""Natural Earth GeoJSON at a pinned commit (regions, countries)."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult

NE_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/{dataset}.geojson"
COUNTRY_PROPS = ("ISO_A2", "ISO_A2_EH", "ISO_A3", "ISO_A3_EH", "ADM0_A3", "NAME", "CONTINENT", "POP_EST")
REGION_PROPS = ("name", "admin", "iso_a2", "type_en", "adm1_code")


class NaturalEarthProvider(FeedProvider):
    @property
    def dataset(self) -> str:
        return str(self.params.get("dataset") or self.spec.params_schema["dataset"]["default"])

    async def async_fetch(self) -> FetchResult | None:
        return await self.fetch_url(NE_URL.format(dataset=self.dataset), allow_redirects=True)

    def parse(self, body: bytes) -> dict[str, Any]:
        countries = "admin_0" in self.dataset
        return feeds_parse.parse_geojson_features(
            body,
            "country" if countries else "region",
            "ne",
            label_keys=("NAME", "name", "name_en"),
            max_features=self.spec.budget.max_features,
            keep_properties=COUNTRY_PROPS if countries else REGION_PROPS,
        )

    def features(self) -> list[dict[str, Any]]:
        return list((self._payload or {}).get("features") or [])
