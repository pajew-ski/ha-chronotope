"""UCDP GED Candidate: monthly CSV (discovered) or the token API."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from ... import feeds_parse
from ..base import Failure, FeedProvider, FetchResult

DOWNLOAD_PAGE = "https://ucdp.uu.se/downloads/candidateged/"
API_URL = "https://ucdpapi.pcr.uu.se/api/gedevents/{version}"
_MAX_API_PAGES = 20


class UcdpCandidateProvider(FeedProvider):
    calls_per_cycle = 2

    async def async_fetch(self) -> FetchResult | None:
        page = await self.fetch_url(DOWNLOAD_PAGE, conditional=False, max_bytes=2_000_000, allow_redirects=True)
        if page is None:
            return None
        found = feeds_parse.discover_ucdp_candidate(page.body, DOWNLOAD_PAGE)
        if found is None:
            raise Failure("no candidate CSV link on the download page")
        if found["version"] == self.policy.extra.get("version"):
            return None  # same file as last time: nothing new
        result = await self.fetch_url(found["url"], conditional=False, allow_redirects=True)
        if result is not None:
            self.policy.extra["version"] = found["version"]
            self.policy.extra["file"] = found["filename"]
        return result

    def parse(self, body: bytes) -> dict[str, Any]:
        since = datetime.now(timezone.utc) - timedelta(days=self.spec.retention_days or 90)
        parsed = feeds_parse.parse_ucdp_csv(body, self.spec.budget.max_features, since=since)
        parsed["version"] = self.policy.extra.get("version")
        return parsed


class UcdpApiProvider(FeedProvider):
    calls_per_cycle = _MAX_API_PAGES

    async def async_fetch(self) -> FetchResult | None:
        token = self.manager.key("ucdp")
        if not token:
            raise Failure("UCDP API token is not configured")
        version = str(self.params.get("version") or "25.1")
        url: str | None = API_URL.format(version=version)
        pages: list[bytes] = []
        params: dict[str, Any] | None = {"pagesize": "1000", "page": "0"}
        for _ in range(_MAX_API_PAGES):
            if not url:
                break
            result = await self.fetch_url(
                url, params=params, headers={"x-ucdp-access-token": token}, conditional=False, allow_redirects=True
            )
            params = None
            if result is None:
                break
            pages.append(result.body)
            url = feeds_parse.parse_ucdp_api(result.body).get("next_page")
        if not pages:
            return None
        return FetchResult(200, b"\n".join(pages), {})

    def parse(self, body: bytes) -> dict[str, Any]:
        since = datetime.now(timezone.utc) - timedelta(days=self.spec.retention_days or 90)
        events: list[dict[str, Any]] = []
        for page in body.split(b"\n"):
            if page.strip():
                events.extend(feeds_parse.parse_ucdp_api(page, since=since)["events"])
        events, truncated = feeds_parse._truncate(events, self.spec.budget.max_features)
        return {"events": events, "source_time": None, "truncated": truncated}
