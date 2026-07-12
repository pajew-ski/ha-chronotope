"""Mirror HA geo_location entities as Chronotope events (opt-in).

HA's geo_location platform family (earthquake feeds, GDACS, geo_json_events,
fire feeds, ...) exposes entities with lat/lon that appear while an external
geo event is active and vanish when it ends - a natural Chronotope source.

While an entity exists its mirrored event keeps a rolling end time (extended
on every feed refresh); when the entity disappears the event is closed at
that moment. Events use the stable id ``geoloc:<entity_id>`` so refreshes
update in place, and user flags survive via the store's flag carry-over.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, HomeAssistant, State, callback

from .const import DATA_STORE, DOMAIN
from .signals import notify_event_change
from .store import EventStore

_LOGGER = logging.getLogger(__name__)

OPTION_GEOLOC_INGEST = "geoloc_ingest_enabled"

# Grace window: how long a mirrored event stays "running" past the last
# feed refresh before its rolling end time expires on its own.
_ROLLING_END = timedelta(hours=1)


def _event_id(entity_id: str) -> str:
    return f"geoloc:{entity_id}"


def _event_from_state(
    state: State, existing_start: str | None, now: datetime
) -> dict[str, Any] | None:
    attrs = state.attributes
    lat = attrs.get("latitude")
    lon = attrs.get("longitude")
    if lat is None or lon is None:
        return None
    description_parts = []
    if state.state not in ("unknown", "unavailable"):
        unit = attrs.get("unit_of_measurement") or "km"
        description_parts.append(f"Distance: {state.state} {unit}")
    if attrs.get("external_id"):
        description_parts.append(f"ID: {attrs['external_id']}")
    return {
        "id": _event_id(state.entity_id),
        "title": attrs.get("friendly_name") or state.entity_id,
        "category": f"geo:{attrs.get('source', 'geo_location')}",
        "lat": lat,
        "lon": lon,
        "start_time": existing_start or now.isoformat(),
        "end_time": (now + _ROLLING_END).isoformat(),
        "source_name": "geo_location",
        "confidence": "scraped",
        "scraped_at": now.isoformat(),
        "raw_description": "\n".join(description_parts) or None,
    }


@callback
def async_setup_geoloc_ingest(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Start mirroring geo_location entities; stops on entry unload."""
    if not entry.options.get(OPTION_GEOLOC_INGEST, False):
        return

    def _store() -> EventStore | None:
        return hass.data.get(DOMAIN, {}).get(DATA_STORE)

    async def _upsert(state: State) -> None:
        store = _store()
        if store is None:
            return
        now = datetime.now(timezone.utc)
        existing = await hass.async_add_executor_job(
            store.get_event, _event_id(state.entity_id)
        )
        event = _event_from_state(
            state, existing["start_time"] if existing else None, now
        )
        if event is None:
            return
        try:
            saved = await hass.async_add_executor_job(store.save_event, event)
        except ValueError as err:
            _LOGGER.warning("geo_location ingest failed for %s: %s", state.entity_id, err)
            return
        notify_event_change(hass, "updated" if existing else "added", saved)

    async def _close(entity_id: str) -> None:
        store = _store()
        if store is None:
            return
        existing = await hass.async_add_executor_job(
            store.get_event, _event_id(entity_id)
        )
        if existing is None:
            return
        now = datetime.now(timezone.utc).isoformat()
        if existing["end_time"] <= now:
            return  # already expired on its own
        existing["end_time"] = now
        existing.pop("deduped", None)
        saved = await hass.async_add_executor_job(store.save_event, existing)
        notify_event_change(hass, "updated", saved)

    @callback
    def _is_geo_location(event_data: dict[str, Any]) -> bool:
        return str(event_data.get("entity_id", "")).startswith("geo_location.")

    async def _handle(event: Event) -> None:
        new_state = event.data.get("new_state")
        if new_state is None or new_state.state in ("unknown", "unavailable"):
            await _close(event.data["entity_id"])
        else:
            await _upsert(new_state)

    async def _initial_sweep() -> None:
        for state in hass.states.async_all("geo_location"):
            if state.state not in ("unknown", "unavailable"):
                await _upsert(state)

    entry.async_on_unload(
        hass.bus.async_listen("state_changed", _handle, event_filter=_is_geo_location)
    )
    hass.async_create_task(_initial_sweep())
