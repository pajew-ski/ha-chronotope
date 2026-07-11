"""Sensors: next event and today's count per profile, plus global stats."""

from __future__ import annotations

from datetime import datetime, time, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DATA_STORE, DOMAIN
from .entity import ChronotopeEntity, async_setup_profile_entities
from .store import EventStore

SCAN_INTERVAL = timedelta(minutes=15)

_LOOKAHEAD = timedelta(days=400)
_ATTR_EVENT_FIELDS = (
    "id",
    "title",
    "category",
    "address",
    "lat",
    "lon",
    "source_name",
    "source_url",
    "time_precision",
    "schedule_text",
)


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    store: EventStore = hass.data[DOMAIN][DATA_STORE]
    await async_setup_profile_entities(
        hass,
        entry,
        async_add_entities,
        "sensor",
        lambda profile: [
            ChronotopeNextEventSensor(entry, store, profile),
            ChronotopeTodayCountSensor(entry, store, profile),
        ],
    )
    async_add_entities([ChronotopeStatsSensor(entry, store)], update_before_add=True)


class ChronotopeNextEventSensor(ChronotopeEntity, SensorEntity):
    """Timestamp of the next (occurrence of an) event matching the profile."""

    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_icon = "mdi:clock-star-four-points-outline"

    def __init__(
        self, entry: ConfigEntry, store: EventStore, profile: dict[str, Any]
    ) -> None:
        super().__init__(entry, store, profile, "next_event")

    def _make_name(self) -> str:
        return f"Chronotope {self._profile['name']} next event"

    async def async_update(self) -> None:
        now = datetime.now(timezone.utc)
        flt = self._profile_filter(
            now.isoformat(), (now + _LOOKAHEAD).isoformat(), limit=5
        )
        events = await self.hass.async_add_executor_job(
            self._store.query_events, flt
        )
        best: tuple[datetime, dict[str, Any]] | None = None
        for event in events:
            pairs = event.get("occurrences") or [
                [event["start_time"], event["end_time"]]
            ]
            for start, end in pairs:
                if datetime.fromisoformat(end) <= now:
                    continue
                start_dt = datetime.fromisoformat(start)
                if best is None or start_dt < best[0]:
                    best = (start_dt, event)
                break
        if best is None:
            self._attr_native_value = None
            self._attr_extra_state_attributes = {}
            return
        start_dt, event = best
        self._attr_native_value = start_dt
        self._attr_extra_state_attributes = {
            field: event.get(field) for field in _ATTR_EVENT_FIELDS
        }


class ChronotopeTodayCountSensor(ChronotopeEntity, SensorEntity):
    """Number of events matching the profile that touch today (local time)."""

    _attr_icon = "mdi:calendar-today"
    _attr_native_unit_of_measurement = "Events"

    def __init__(
        self, entry: ConfigEntry, store: EventStore, profile: dict[str, Any]
    ) -> None:
        super().__init__(entry, store, profile, "events_today")

    def _make_name(self) -> str:
        return f"Chronotope {self._profile['name']} events today"

    async def async_update(self) -> None:
        tz = ZoneInfo(self.hass.config.time_zone or "UTC")
        today_start = datetime.combine(
            datetime.now(tz).date(), time.min, tzinfo=tz
        )
        today_end = today_start + timedelta(days=1)
        flt = self._profile_filter(today_start.isoformat(), today_end.isoformat())
        events = await self.hass.async_add_executor_job(
            self._store.query_events, flt
        )
        self._attr_native_value = len(events)
        self._attr_extra_state_attributes = {
            "titles": [event["title"] for event in events[:20]]
        }


class ChronotopeStatsSensor(ChronotopeEntity, SensorEntity):
    """Global statistics: total events, categories, sources."""

    _attr_icon = "mdi:chart-box-outline"
    _attr_native_unit_of_measurement = "Events"

    def __init__(self, entry: ConfigEntry, store: EventStore) -> None:
        super().__init__(
            entry, store, {"id": "stats", "name": "Statistics"}, "stats"
        )

    def _make_name(self) -> str:
        return "Chronotope statistics"

    async def async_update(self) -> None:
        stats = await self.hass.async_add_executor_job(self._store.stats)
        self._attr_native_value = stats["total_events"]
        self._attr_extra_state_attributes = {
            key: value for key, value in stats.items() if key != "total_events"
        }
