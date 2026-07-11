"""WebSocket API for Chronotope."""

from __future__ import annotations

from typing import Any
from urllib.parse import urlencode

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers.network import NoURLAvailableError, get_url

from .const import DATA_STORE, DATA_TOKEN, DOMAIN, ICS_VIEW_URL
from .signals import notify_event_change, notify_profiles_changed
from .store import EventStore, QueryFilter

_FILTER_SCHEMA = {
    vol.Optional("categories"): [str],
    vol.Optional("center"): vol.Schema(
        {
            vol.Required("lat"): vol.Coerce(float),
            vol.Required("lon"): vol.Coerce(float),
        }
    ),
    vol.Optional("radius_km"): vol.Coerce(float),
    vol.Optional("start"): str,
    vol.Optional("end"): str,
    vol.Optional("weekdays"): [vol.All(int, vol.Range(min=0, max=6))],
    vol.Optional("time_from"): str,
    vol.Optional("time_to"): str,
    vol.Optional("text"): str,
    vol.Optional("favorites_only"): bool,
    vol.Optional("include_hidden"): bool,
    vol.Optional("limit"): vol.All(int, vol.Range(min=1)),
}


def async_register(hass: HomeAssistant) -> None:
    """Register all Chronotope WebSocket commands."""
    websocket_api.async_register_command(hass, ws_save_event)
    websocket_api.async_register_command(hass, ws_delete_event)
    websocket_api.async_register_command(hass, ws_query_events)
    websocket_api.async_register_command(hass, ws_categories)
    websocket_api.async_register_command(hass, ws_ics_url)
    websocket_api.async_register_command(hass, ws_lookup_place)
    websocket_api.async_register_command(hass, ws_flag_event)
    websocket_api.async_register_command(hass, ws_save_profile)
    websocket_api.async_register_command(hass, ws_delete_profile)
    websocket_api.async_register_command(hass, ws_list_profiles)
    websocket_api.async_register_command(hass, ws_stats)


def _get_store(hass: HomeAssistant) -> EventStore | None:
    return hass.data.get(DOMAIN, {}).get(DATA_STORE)


def _build_filter(hass: HomeAssistant, msg: dict[str, Any]) -> QueryFilter:
    return QueryFilter.from_payload(msg, tz_name=hass.config.time_zone or "UTC")


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/events/save",
        vol.Required("event"): dict,
        vol.Optional("dedupe"): bool,
    }
)
@websocket_api.async_response
async def ws_save_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Insert or update an event."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    incoming_id = msg["event"].get("id")
    existed = (
        incoming_id is not None
        and await hass.async_add_executor_job(store.get_event, str(incoming_id))
        is not None
    )
    try:
        event = await hass.async_add_executor_job(
            lambda: store.save_event(msg["event"], dedupe=msg.get("dedupe", False))
        )
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_event", str(err))
        return
    action = "updated" if existed or event.get("deduped") else "added"
    notify_event_change(hass, action, event)
    connection.send_result(msg["id"], {"event": event})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/events/delete",
        vol.Required("event_id"): str,
    }
)
@websocket_api.async_response
async def ws_delete_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Delete an event by id."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    deleted = await hass.async_add_executor_job(store.delete_event, msg["event_id"])
    if deleted:
        notify_event_change(hass, "deleted", {"id": msg["event_id"]})
    connection.send_result(msg["id"], {"deleted": deleted})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/events/flag",
        vol.Required("event_id"): str,
        vol.Optional("favorite"): bool,
        vol.Optional("hidden"): bool,
    }
)
@websocket_api.async_response
async def ws_flag_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Toggle favorite/hidden flags on an event."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    event = await hass.async_add_executor_job(
        lambda: store.set_event_flags(
            msg["event_id"], msg.get("favorite"), msg.get("hidden")
        )
    )
    if event is None:
        connection.send_error(msg["id"], "not_found", "Unknown event id")
        return
    notify_event_change(hass, "updated", event)
    connection.send_result(msg["id"], {"event": event})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/profiles/save",
        vol.Required("profile"): vol.Schema(
            {
                vol.Optional("id"): str,
                vol.Required("name"): str,
                vol.Optional("filters"): dict,
            }
        ),
    }
)
@websocket_api.async_response
async def ws_save_profile(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Create or update a named filter profile."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    try:
        profile = await hass.async_add_executor_job(
            store.save_profile, msg["profile"]
        )
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_profile", str(err))
        return
    notify_profiles_changed(hass)
    connection.send_result(msg["id"], {"profile": profile})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/profiles/delete",
        vol.Required("profile_id"): str,
    }
)
@websocket_api.async_response
async def ws_delete_profile(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Delete a filter profile."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    deleted = await hass.async_add_executor_job(
        store.delete_profile, msg["profile_id"]
    )
    if deleted:
        notify_profiles_changed(hass)
    connection.send_result(msg["id"], {"deleted": deleted})


@websocket_api.websocket_command({vol.Required("type"): "chronotope/stats"})
@websocket_api.async_response
async def ws_stats(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Aggregate statistics (totals, categories, source health)."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    stats = await hass.async_add_executor_job(store.stats)
    connection.send_result(msg["id"], stats)


@websocket_api.websocket_command({vol.Required("type"): "chronotope/profiles/list"})
@websocket_api.async_response
async def ws_list_profiles(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """List stored filter profiles."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    profiles = await hass.async_add_executor_job(store.list_profiles)
    connection.send_result(msg["id"], {"profiles": profiles})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/events/query",
        **_FILTER_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_query_events(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Query events with combinable filters."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    try:
        flt = _build_filter(hass, msg)
        events = await hass.async_add_executor_job(store.query_events, flt)
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_filter", str(err))
        return
    connection.send_result(msg["id"], {"events": events})


@websocket_api.websocket_command({vol.Required("type"): "chronotope/categories"})
@websocket_api.async_response
async def ws_categories(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """List distinct categories for the filter UI."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    categories = await hass.async_add_executor_job(store.categories)
    connection.send_result(msg["id"], {"categories": categories})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/places/lookup",
        vol.Required("address"): str,
    }
)
@websocket_api.async_response
async def ws_lookup_place(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Look up cached coordinates for an address (geo cache for scrapers)."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return
    place = await hass.async_add_executor_job(store.lookup_place, msg["address"])
    connection.send_result(msg["id"], {"place": place})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chronotope/ics_url",
        vol.Optional("profile_id"): str,
        **_FILTER_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_ics_url(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the tokenized ICS subscription URL for the given filters."""
    token = hass.data.get(DOMAIN, {}).get(DATA_TOKEN)
    if token is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return

    params: list[tuple[str, str]] = [("token", token)]
    if msg.get("profile_id"):
        params.append(("profile", msg["profile_id"]))
        try:
            base = get_url(hass, prefer_external=True, allow_cloud=False)
        except NoURLAvailableError:
            base = ""
        connection.send_result(
            msg["id"], {"url": f"{base}{ICS_VIEW_URL}?{urlencode(params)}"}
        )
        return
    for category in msg.get("categories") or []:
        params.append(("category", category))
    center = msg.get("center") or {}
    if "lat" in center and "lon" in center and msg.get("radius_km") is not None:
        params.append(("lat", str(center["lat"])))
        params.append(("lon", str(center["lon"])))
        params.append(("radius", str(msg["radius_km"])))
    if msg.get("start"):
        params.append(("start", msg["start"]))
    if msg.get("end"):
        params.append(("end", msg["end"]))
    for weekday in msg.get("weekdays") or []:
        params.append(("weekday", str(weekday)))
    if msg.get("time_from"):
        params.append(("time_from", msg["time_from"]))
    if msg.get("time_to"):
        params.append(("time_to", msg["time_to"]))

    try:
        base = get_url(hass, prefer_external=True, allow_cloud=False)
    except NoURLAvailableError:
        base = ""
    connection.send_result(
        msg["id"], {"url": f"{base}{ICS_VIEW_URL}?{urlencode(params)}"}
    )
