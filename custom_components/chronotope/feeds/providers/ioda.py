"""IODA outage summary per country -> choropleth."""

from __future__ import annotations

import time

from ... import feeds_parse
from ..base import Failure
from .choropleth import ChoroplethProvider

SUMMARY_URL = "https://api.ioda.inetintel.cc.gatech.edu/v2/outages/summary"


class IodaProvider(ChoroplethProvider):
    value_kind = "outages"

    async def async_fetch_values(self) -> dict[str, float]:
        now = int(time.time())
        result = await self.fetch_url(
            SUMMARY_URL,
            params={"from": str(now - 24 * 3600), "until": str(now), "entityType": "country", "limit": "500"},
            conditional=False,
            allow_redirects=True,
        )
        if result is None:
            raise Failure("IODA returned nothing")
        return feeds_parse.parse_ioda(result.body)["values"]
