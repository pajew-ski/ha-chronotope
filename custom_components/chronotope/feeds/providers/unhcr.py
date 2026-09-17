"""UNHCR Refugee Data Finder -> choropleth (refugees + asylum seekers)."""

from __future__ import annotations

from datetime import datetime, timezone

from ... import feeds_parse
from ..base import Failure
from .choropleth import ChoroplethProvider

POPULATION_URL = "https://api.unhcr.org/population/v1/population/"
_MAX_PAGES = 10


class UnhcrProvider(ChoroplethProvider):
    calls_per_cycle = _MAX_PAGES + 1
    value_kind = "refugees"

    async def async_fetch_values(self) -> dict[str, float]:
        mode = str(self.params.get("mode") or "asylum")
        year = self.params.get("year") or datetime.now(timezone.utc).year - 1
        values: dict[str, float] = {}
        for page in range(1, _MAX_PAGES + 1):
            result = await self.fetch_url(
                POPULATION_URL,
                params={"limit": "1000", "page": str(page), "year": str(int(year)), "coo_all": "true", "coa_all": "true"},
                conditional=False,
                allow_redirects=True,
            )
            if result is None:
                break
            parsed = feeds_parse.parse_unhcr(result.body, mode=mode)
            for code, value in parsed["values"].items():
                values[code] = values.get(code, 0.0) + value
            if not parsed.get("max_pages") or page >= int(parsed["max_pages"]):
                break
        if not values:
            raise Failure("UNHCR returned no population rows")
        return values
