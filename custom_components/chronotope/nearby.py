"""Proximity detection: fire chronotope_nearby when a person is at an event.

Listens to person.* state changes; whenever a person's position is inside
the configured radius of a currently running event (occurrence), a
``chronotope_nearby`` bus event fires (per person+event with a cooldown)
and a visit is recorded — that visit history is the geo diary.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, HomeAssistant, callback

from .const import DATA_STORE, DOMAIN, EVENT_NEARBY
from .store import EventStore, QueryFilter, haversine_km

DEFAULT_RADIUS_KM = 0.5
OPTION_NEARBY_ENABLED = "nearby_enabled"
OPTION_NEARBY_RADIUS = "nearby_radius_km"

_COOLDOWN = timedelta(hours=2)
_MIN_MOVE_KM = 0.05
_MAX_EVENTS_IN_PAYLOAD = 10


@callback
def async_setup_nearby(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Start proximity tracking; stops automatically on entry unload."""
    if not entry.options.get(OPTION_NEARBY_ENABLED, True):
        return
    radius_km = float(entry.options.get(OPTION_NEARBY_RADIUS, DEFAULT_RADIUS_KM))

    last_position: dict[str, tuple[float, float]] = {}
    last_fired: dict[tuple[str, str], datetime] = {}

    @callback
    def _is_person(event_data: dict[str, Any]) -> bool:
        return str(event_data.get("entity_id", "")).startswith("person.")

    async def _handle(event: Event) -> None:
        new_state = event.data.get("new_state")
        if new_state is None:
            return
        lat = new_state.attributes.get("latitude")
        lon = new_state.attributes.get("longitude")
        if lat is None or lon is None:
            return
        person_id = new_state.entity_id

        previous = last_position.get(person_id)
        moved = (
            previous is None
            or (haversine_km(previous[0], previous[1], lat, lon) or 0) >= _MIN_MOVE_KM
        )
        last_position[person_id] = (lat, lon)
        if not moved:
            return

        store: EventStore | None = hass.data.get(DOMAIN, {}).get(DATA_STORE)
        if store is None:
            return
        now = datetime.now(timezone.utc)
        flt = QueryFilter(
            center_lat=lat,
            center_lon=lon,
            radius_km=radius_km,
            window_start=now.isoformat(),
            window_end=(now + timedelta(minutes=1)).isoformat(),
            tz_name=hass.config.time_zone or "UTC",
        )
        events = await hass.async_add_executor_job(store.query_events, flt)

        hits: list[dict[str, Any]] = []
        for ev in events:
            key = (person_id, ev["id"])
            fired = last_fired.get(key)
            if fired is not None and now - fired < _COOLDOWN:
                continue
            last_fired[key] = now
            await hass.async_add_executor_job(
                store.record_visit, ev["id"], person_id
            )
            hits.append(ev)

        if hits:
            hass.bus.async_fire(
                EVENT_NEARBY,
                {
                    "person_id": person_id,
                    "person_name": new_state.name,
                    "radius_km": radius_km,
                    "events": hits[:_MAX_EVENTS_IN_PAYLOAD],
                },
            )

    entry.async_on_unload(
        hass.bus.async_listen("state_changed", _handle, event_filter=_is_person)
    )
