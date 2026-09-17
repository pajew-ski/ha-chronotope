"""Launch Library 2: upcoming and previous launches, alternating per cycle."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult

BASE_URL = "https://ll.thespacedevs.com/2.3.0/launches/{which}/"


class LaunchLibraryProvider(FeedProvider):
    async def async_fetch(self) -> FetchResult | None:
        which = "previous" if self.policy.extra.get("last_which") == "upcoming" else "upcoming"
        self.policy.extra["last_which"] = which
        headers = {}
        if token := self.manager.key("ll2"):
            headers["Authorization"] = f"Token {token}"
        return await self.fetch_url(
            BASE_URL.format(which=which),
            params={"limit": "50", "mode": "normal", "format": "json"},
            headers=headers,
            conditional=False,
        )

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_ll2(body, self.spec.budget.max_features)
