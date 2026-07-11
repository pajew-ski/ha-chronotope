"""Home Assistant services: write, query and utility operations."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.core import (
    HomeAssistant,
    ServiceCall,
    ServiceResponse,
    SupportsResponse,
)
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import config_validation as cv

from .const import DATA_STORE, DOMAIN
from .signals import notify_event_change
from .store import (
    CONFIDENCE_VALUES,
    TIME_PRECISION_VALUES,
    EventStore,
    QueryFilter,
)

_EVENT_SCHEMA = vol.Schema(
    {
        vol.Optional("id"): cv.string,
        vol.Required("title"): cv.string,
        vol.Optional("category"): cv.string,
        vol.Optional("lat"): vol.Coerce(float),
        vol.Optional("lon"): vol.Coerce(float),
        vol.Required("start_time"): cv.string,
        vol.Required("end_time"): cv.string,
        vol.Optional("recurrence"): cv.string,
        vol.Optional("source_url"): cv.string,
        vol.Optional("source_name"): cv.string,
        vol.Optional("confidence"): vol.In(CONFIDENCE_VALUES),
        vol.Optional("scraped_at"): cv.string,
        vol.Optional("raw_description"): cv.string,
        vol.Optional("geometry"): vol.Any(dict, cv.string),
        vol.Optional("address"): cv.string,
        vol.Optional("time_precision"): vol.In(TIME_PRECISION_VALUES),
        vol.Optional("schedule_text"): cv.string,
        vol.Optional("favorite"): cv.boolean,
        vol.Optional("hidden"): cv.boolean,
    }
)

_QUERY_SCHEMA = vol.Schema(
    {
        vol.Optional("profile"): cv.string,
        vol.Optional("categories"): [cv.string],
        vol.Optional("lat"): vol.Coerce(float),
        vol.Optional("lon"): vol.Coerce(float),
        vol.Optional("radius_km"): vol.Coerce(float),
        vol.Optional("start"): cv.string,
        vol.Optional("end"): cv.string,
        vol.Optional("weekdays"): [vol.All(vol.Coerce(int), vol.Range(min=0, max=6))],
        vol.Optional("time_from"): cv.string,
        vol.Optional("time_to"): cv.string,
        vol.Optional("text"): cv.string,
        vol.Optional("favorites_only"): cv.boolean,
        vol.Optional("include_hidden"): cv.boolean,
        vol.Optional("limit"): vol.All(vol.Coerce(int), vol.Range(min=1)),
    }
)


def _get_store(hass: HomeAssistant) -> EventStore:
    store = hass.data.get(DOMAIN, {}).get(DATA_STORE)
    if store is None:
        raise HomeAssistantError("Chronotope is not set up")
    return store


async def _service_filter(
    hass: HomeAssistant, data: dict[str, Any]
) -> QueryFilter:
    """Build a QueryFilter from service data, resolving a profile if given."""
    store = _get_store(hass)
    tz_name = hass.config.time_zone or "UTC"
    if profile_ref := data.get("profile"):
        profile = await hass.async_add_executor_job(store.get_profile, profile_ref)
        if profile is None:
            raise ServiceValidationError(f"Unknown profile: {profile_ref}")
        return QueryFilter.from_payload(
            profile["filters"],
            tz_name=tz_name,
            window_start=data.get("start"),
            window_end=data.get("end"),
            limit=data.get("limit"),
        )
    payload = dict(data)
    if "lat" in data and "lon" in data:
        payload["center"] = {"lat": data["lat"], "lon": data["lon"]}
    return QueryFilter.from_payload(payload, tz_name=tz_name)


def async_register_services(hass: HomeAssistant) -> None:
    """Register all Chronotope services (idempotent)."""
    if hass.services.has_service(DOMAIN, "add_event"):
        return

    async def handle_add_event(call: ServiceCall) -> ServiceResponse:
        store = _get_store(hass)
        data = dict(call.data)
        existed = (
            "id" in data
            and await hass.async_add_executor_job(store.get_event, str(data["id"]))
            is not None
        )
        try:
            event = await hass.async_add_executor_job(store.save_event, data)
        except ValueError as err:
            raise ServiceValidationError(str(err)) from err
        notify_event_change(hass, "updated" if existed else "added", event)
        return {"event": event}

    async def handle_delete_event(call: ServiceCall) -> ServiceResponse:
        store = _get_store(hass)
        deleted = await hass.async_add_executor_job(
            store.delete_event, call.data["event_id"]
        )
        if deleted:
            notify_event_change(hass, "deleted", {"id": call.data["event_id"]})
        return {"deleted": deleted}

    async def handle_query(call: ServiceCall) -> ServiceResponse:
        store = _get_store(hass)
        flt = await _service_filter(hass, dict(call.data))
        try:
            events = await hass.async_add_executor_job(store.query_events, flt)
        except ValueError as err:
            raise ServiceValidationError(str(err)) from err
        return {"count": len(events), "events": events}

    async def handle_lookup_place(call: ServiceCall) -> ServiceResponse:
        store = _get_store(hass)
        place = await hass.async_add_executor_job(
            store.lookup_place, call.data["address"]
        )
        return {"place": place}

    hass.services.async_register(
        DOMAIN,
        "add_event",
        handle_add_event,
        schema=_EVENT_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        "delete_event",
        handle_delete_event,
        schema=vol.Schema({vol.Required("event_id"): cv.string}),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        "query",
        handle_query,
        schema=_QUERY_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
    hass.services.async_register(
        DOMAIN,
        "lookup_place",
        handle_lookup_place,
        schema=vol.Schema({vol.Required("address"): cv.string}),
        supports_response=SupportsResponse.ONLY,
    )
