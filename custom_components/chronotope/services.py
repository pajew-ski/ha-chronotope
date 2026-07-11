"""Home Assistant services: write, query, digest and utility operations."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo

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
        vol.Optional("dedupe"): cv.boolean,
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


_WEEKDAYS_DE = ("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So")


def _format_local(iso: str, tz: ZoneInfo) -> str:
    dt = datetime.fromisoformat(iso).astimezone(tz)
    return f"{_WEEKDAYS_DE[dt.weekday()]} {dt.day:02d}.{dt.month:02d}. {dt:%H:%M}"


def _parse_calendar_time(value: Any, tz: ZoneInfo) -> datetime | None:
    """Parse calendar.get_events start/end (datetime or all-day date)."""
    if not isinstance(value, str):
        return None
    try:
        parsed = datetime.fromisoformat(value)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=tz)
    return parsed.astimezone(timezone.utc)


async def _busy_intervals(
    hass: HomeAssistant,
    calendar_ids: list[str],
    start: datetime,
    end: datetime,
    tz: ZoneInfo,
) -> list[tuple[datetime, datetime]]:
    """Fetch busy intervals from other HA calendars for the free-time check."""
    try:
        response = await hass.services.async_call(
            "calendar",
            "get_events",
            {
                "entity_id": calendar_ids,
                "start_date_time": start.isoformat(),
                "end_date_time": end.isoformat(),
            },
            blocking=True,
            return_response=True,
        )
    except Exception as err:  # noqa: BLE001 - report, don't crash the digest
        raise ServiceValidationError(
            f"calendar.get_events failed for {calendar_ids}: {err}"
        ) from err
    intervals: list[tuple[datetime, datetime]] = []
    for calendar_data in (response or {}).values():
        for item in calendar_data.get("events", []):
            busy_start = _parse_calendar_time(item.get("start"), tz)
            busy_end = _parse_calendar_time(item.get("end"), tz)
            if busy_start and busy_end:
                intervals.append((busy_start, busy_end))
    return intervals


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
        dedupe = data.pop("dedupe", False)
        existed = (
            "id" in data
            and await hass.async_add_executor_job(store.get_event, str(data["id"]))
            is not None
        )
        try:
            event = await hass.async_add_executor_job(
                lambda: store.save_event(data, dedupe=dedupe)
            )
        except ValueError as err:
            raise ServiceValidationError(str(err)) from err
        action = "updated" if existed or event.get("deduped") else "added"
        notify_event_change(hass, action, event)
        return {"event": event}

    async def handle_digest(call: ServiceCall) -> ServiceResponse:
        store = _get_store(hass)
        tz = ZoneInfo(hass.config.time_zone or "UTC")
        days = call.data.get("days", 7)
        now = datetime.now(timezone.utc)
        window_end = now + timedelta(days=days)

        payload: dict[str, Any] = {"profile": call.data.get("profile")}
        if not payload["profile"]:
            payload = {}
        flt_data = dict(payload)
        flt_data["start"] = now.isoformat()
        flt_data["end"] = window_end.isoformat()
        flt_data["limit"] = call.data.get("limit", 25)
        flt = await _service_filter(hass, flt_data)
        events = await hass.async_add_executor_job(store.query_events, flt)

        busy: list[tuple[datetime, datetime]] = []
        check_calendars = call.data.get("check_calendars") or []
        if check_calendars and events:
            busy = await _busy_intervals(hass, check_calendars, now, window_end, tz)

        # Favorites first, then chronological.
        events.sort(
            key=lambda ev: (
                not ev.get("favorite"),
                (ev.get("occurrences") or [[ev["start_time"], ev["end_time"]]])[0][0],
            )
        )

        items: list[dict[str, Any]] = []
        lines: list[str] = []
        for event in events:
            occ_start, occ_end = (
                event.get("occurrences") or [[event["start_time"], event["end_time"]]]
            )[0]
            start_dt = datetime.fromisoformat(occ_start)
            end_dt = datetime.fromisoformat(occ_end)
            conflict = any(
                start_dt < busy_end and end_dt > busy_start
                for busy_start, busy_end in busy
            )
            fuzzy = event.get("time_precision") == "approximate"
            when = (
                f"~ {event['schedule_text']}"
                if fuzzy and event.get("schedule_text")
                else _format_local(occ_start, tz)
            )
            parts = [when, "–", event["title"]]
            extras = []
            if event.get("category"):
                extras.append(event["category"])
            if event.get("distance_km") is not None:
                extras.append(f"{event['distance_km']:.1f} km".replace(".", ","))
            if extras:
                parts.append(f"({', '.join(extras)})")
            if event.get("favorite"):
                parts.append("★")
            if check_calendars:
                parts.append("[belegt]" if conflict else "[frei]")
            lines.append("• " + " ".join(parts))
            items.append(
                {**event, "digest_start": occ_start, "conflict": conflict}
            )

        title = call.data.get("title") or (
            f"Chronotope: {len(items)} Events in den nächsten {days} Tagen"
        )
        text = "\n".join(lines) if lines else "Keine passenden Events gefunden."

        if notify_service := call.data.get("notify_service"):
            domain, _, service = notify_service.rpartition(".")
            await hass.services.async_call(
                domain or "notify",
                service,
                {"title": title, "message": text},
                blocking=True,
            )
        return {"count": len(items), "title": title, "text": text, "events": items}

    async def handle_purge(call: ServiceCall) -> ServiceResponse:
        store = _get_store(hass)
        deleted = await hass.async_add_executor_job(
            lambda: store.purge(
                call.data["older_than_days"], call.data.get("source_name")
            )
        )
        if deleted:
            notify_event_change(hass, "deleted", None)
        return {"deleted": deleted}

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
    hass.services.async_register(
        DOMAIN,
        "digest",
        handle_digest,
        schema=vol.Schema(
            {
                vol.Optional("profile"): cv.string,
                vol.Optional("days"): vol.All(vol.Coerce(int), vol.Range(min=1, max=90)),
                vol.Optional("limit"): vol.All(vol.Coerce(int), vol.Range(min=1, max=200)),
                vol.Optional("title"): cv.string,
                vol.Optional("notify_service"): cv.string,
                vol.Optional("check_calendars"): [cv.entity_id],
            }
        ),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        "purge",
        handle_purge,
        schema=vol.Schema(
            {
                vol.Required("older_than_days"): vol.All(
                    vol.Coerce(int), vol.Range(min=0)
                ),
                vol.Optional("source_name"): cv.string,
            }
        ),
        supports_response=SupportsResponse.OPTIONAL,
    )
