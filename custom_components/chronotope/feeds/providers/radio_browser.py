"""Community Radio Browser: server list, then geo-tagged stations."""

from __future__ import annotations

import random
from typing import Any

from ... import feeds_parse
from ..base import Failure, FeedProvider, FetchResult

SERVERS_URL = "https://all.api.radio-browser.info/json/servers"
SEARCH_PATH = "/json/stations/search"


class RadioBrowserProvider(FeedProvider):
    calls_per_cycle = 2

    async def async_fetch(self) -> FetchResult | None:
        servers = await self.fetch_url(SERVERS_URL, conditional=False, max_bytes=64 * 1024, allow_redirects=True)
        hosts = feeds_parse.parse_radio_servers(servers.body) if servers else []
        if not hosts:
            raise Failure("no radio-browser servers listed")
        host = random.choice(hosts)  # noqa: S311 - load spreading, not security
        return await self.fetch_url(
            f"https://{host}{SEARCH_PATH}",
            params={"has_geo_info": "true", "hidebroken": "true", "limit": str(self.spec.budget.max_features), "order": "votes", "reverse": "true"},
            conditional=False,
            allow_redirects=True,
        )

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_radio_browser(body, self.spec.budget.max_features)
