"""Calendar entities: one per filter profile plus 'all events'."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DATA_STORE, DOMAIN
from .entity import ChronotopeEntity, async_setup_profile_entities
from .store import EventStore

SCAN_INTERVAL = timedelta(minutes=15)

# How far ahead the `event` property looks for the next occurrence.
_LOOKAHEAD = timedelta(days=400)


def _to_calendar_events(events: list[dict[str, Any]]) -> list[CalendarEvent]:
    """Expand store events (incl. matched occurrences) into CalendarEvents."""
    out: list[CalendarEvent] = []
    for event in events:
        fuzzy = event.get("time_precision") == "approximate"
        summary = f"~ {event['title']}" if fuzzy else event["title"]
        description_parts = []
        if fuzzy and event.get("schedule_text"):
            description_parts.append(f"Schedule: {event['schedule_text']}")
        if event.get("raw_description"):
            description_parts.append(event["raw_description"])
        if event.get("source_url"):
            description_parts.append(event["source_url"])
        description = "\n".join(description_parts) or None

        pairs = event.get("occurrences") or [[event["start_time"], event["end_time"]]]
        for index, (start, end) in enumerate(pairs):
            out.append(
                CalendarEvent(
                    start=datetime.fromisoformat(start),
                    end=datetime.fromisoformat(end),
                    summary=summary,
                    description=description,
                    location=event.get("address"),
                    uid=f"{event['id']}-{index}" if index else event["id"],
                )
            )
    out.sort(key=lambda ev: ev.start)
    return out


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    store: EventStore = hass.data[DOMAIN][DATA_STORE]
    await async_setup_profile_entities(
        hass,
        entry,
        async_add_entities,
        "calendar",
        lambda profile: [ChronotopeCalendar(entry, store, profile)],
    )


class ChronotopeCalendar(ChronotopeEntity, CalendarEntity):
    """Filtered Chronotope events as a native HA calendar."""

    def __init__(
        self, entry: ConfigEntry, store: EventStore, profile: dict[str, Any]
    ) -> None:
        super().__init__(entry, store, profile, "calendar")
        self._next_event: CalendarEvent | None = None

    @property
    def event(self) -> CalendarEvent | None:
        return self._next_event

    async def async_update(self) -> None:
        now = datetime.now(timezone.utc)
        flt = self._profile_filter(
            now.isoformat(), (now + _LOOKAHEAD).isoformat(), limit=20
        )
        events = await self.hass.async_add_executor_job(
            self._store.query_events, flt
        )
        # ev.end is tz-aware UTC (built from the store's normalized ISO times).
        upcoming = [ev for ev in _to_calendar_events(events) if ev.end > now]
        self._next_event = upcoming[0] if upcoming else None

    async def async_get_events(
        self, hass: HomeAssistant, start_date: datetime, end_date: datetime
    ) -> list[CalendarEvent]:
        flt = self._profile_filter(start_date.isoformat(), end_date.isoformat())
        events = await hass.async_add_executor_job(self._store.query_events, flt)
        return _to_calendar_events(events)
