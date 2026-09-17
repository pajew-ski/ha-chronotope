"""CelesTrak GP (OMM JSON) per group; browser propagates positions."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import Blocked, FeedProvider, FetchResult

GP_URL = "https://celestrak.org/NORAD/elements/gp.php"


class CelestrakProvider(FeedProvider):
    @property
    def group(self) -> str:
        return str(self.params.get("group") or self.spec.params_schema.get("group", {}).get("default") or "stations")

    async def async_fetch(self) -> FetchResult | None:
        try:
            return await self.fetch_url(
                GP_URL, params={"GROUP": self.group, "FORMAT": "json"}, allow_redirects=False
            )
        except Blocked as err:
            if feeds_parse.celestrak_not_updated(err.status, err.body):
                return None  # success without new data
            raise

    def parse(self, body: bytes) -> dict[str, Any]:
        parsed = feeds_parse.parse_celestrak_omm(body, self.spec.budget.max_features)
        parsed["group"] = self.group
        return parsed

    def meta(self) -> dict[str, Any]:
        meta = super().meta()
        meta["group"] = self.group
        return meta
