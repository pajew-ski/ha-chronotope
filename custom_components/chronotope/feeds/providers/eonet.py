"""NASA EONET v3 open events -> events; closes vanished events."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from ... import feeds_parse
from ...signals import notify_event_change
from ..base import FeedProvider, FetchResult

EVENTS_URL = "https://eonet.gsfc.nasa.gov/api/v3/events"


class EonetProvider(FeedProvider):
    async def async_fetch(self) -> FetchResult | None:
        return await self.fetch_url(EVENTS_URL, params={"status": "open", "days": "60"})

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_eonet(body, self.spec.budget.max_features)

    async def _store_events(self, parsed: dict[str, Any]) -> None:
        await super()._store_events(parsed)
        store = self.store
        if store is None:
            return
        open_ids = {ev["id"] for ev in parsed.get("events") or []}
        now = datetime.now(timezone.utc).isoformat()

        def _close_vanished() -> int:
            closed = 0
            for event_id in store.event_ids_by_prefix("feed:eonet:"):
                if event_id in open_ids:
                    continue
                existing = store.get_event(event_id)
                if existing and existing["end_time"] > now:
                    existing["end_time"] = now
                    existing.pop("deduped", None)
                    store.save_event(existing)
                    closed += 1
            return closed

        if await self.hass.async_add_executor_job(_close_vanished):
            notify_event_change(self.hass, "updated", None)
