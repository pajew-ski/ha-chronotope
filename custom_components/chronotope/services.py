"""Home Assistant services: write, query, digest, import and utilities."""

from __future__ import annotations

import json
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path
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
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import DATA_STORE, DOMAIN
from .ics import parse_ics
from .importers import parse_geojson, parse_gpx
from .signals import notify_event_change
from .store import (
    CONFIDENCE_VALUES,
    TIME_PRECISION_VALUES,
    EventStore,
    QueryFilter,
    haversine_km,
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


# Digest wording follows the HA core language (German or English).
_DIGEST_STRINGS = {
    "en": {
        "weekdays": ("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"),
        "title": "Chronotope: {n} events in the next {days} days",
        "empty": "No matching events found.",
        "free": "[free]",
        "busy": "[busy]",
    },
    "de": {
        "weekdays": ("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"),
        "title": "Chronotope: {n} Events in den nächsten {days} Tagen",
        "empty": "Keine passenden Events gefunden.",
        "free": "[frei]",
        "busy": "[belegt]",
    },
}


def _digest_strings(hass: HomeAssistant) -> dict[str, Any]:
    language = (hass.config.language or "en").lower().split("-")[0]
    return _DIGEST_STRINGS.get(language, _DIGEST_STRINGS["en"])


def _format_local(iso: str, tz: ZoneInfo, weekdays: tuple[str, ...]) -> str:
    dt = datetime.fromisoformat(iso).astimezone(tz)
    return f"{weekdays[dt.weekday()]} {dt.day:02d}.{dt.month:02d}. {dt:%H:%M}"


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


async def _read_source(hass: HomeAssistant, call: ServiceCall) -> str:
    """Fetch import payload from url, path (relative to config) or data."""
    if data := call.data.get("data"):
        return data
    if path := call.data.get("path"):
        full = Path(path)
        if not full.is_absolute():
            full = Path(hass.config.path(path))
        try:
            return await hass.async_add_executor_job(
                full.read_text, "utf-8"
            )
        except OSError as err:
            raise ServiceValidationError(f"Cannot read {full}: {err}") from err
    if url := call.data.get("url"):
        session = async_get_clientsession(hass)
        try:
            async with session.get(url, timeout=30) as response:
                response.raise_for_status()
                return await response.text()
        except Exception as err:  # noqa: BLE001
            raise ServiceValidationError(f"Cannot fetch {url}: {err}") from err
    raise ServiceValidationError("One of url, path or data is required")


async def _save_imported(
    hass: HomeAssistant,
    events: list[dict[str, Any]],
    errors: list[str],
    call: ServiceCall,
) -> ServiceResponse:
    """Store parsed events with dedupe and shared source metadata."""
    store = _get_store(hass)
    dedupe = call.data.get("dedupe", True)
    now = datetime.now(timezone.utc).isoformat()
    saved = 0
    for event in events:
        if call.data.get("category"):
            event["category"] = call.data["category"]
        event.setdefault("source_name", call.data.get("source_name") or "import")
        event.setdefault("confidence", "scraped")
        event.setdefault("scraped_at", now)
        if call.data.get("url"):
            event.setdefault("source_url", call.data["url"])
        try:
            stored = await hass.async_add_executor_job(
                lambda data=event: store.save_event(data, dedupe=dedupe)
            )
        except ValueError as err:
            errors.append(f"{event.get('title', '?')}: {err}")
            continue
        notify_event_change(
            hass, "updated" if stored.get("deduped") else "added", stored
        )
        saved += 1
    return {"imported": saved, "errors": errors}


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
        strings = _digest_strings(hass)
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
                else _format_local(occ_start, tz, strings["weekdays"])
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
                parts.append("*")
            if check_calendars:
                parts.append(strings["busy"] if conflict else strings["free"])
            lines.append("- " + " ".join(parts))
            items.append(
                {**event, "digest_start": occ_start, "conflict": conflict}
            )

        title = call.data.get("title") or strings["title"].format(
            n=len(items), days=days
        )
        text = "\n".join(lines) if lines else strings["empty"]

        if notify_service := call.data.get("notify_service"):
            domain, _, service = notify_service.rpartition(".")
            await hass.services.async_call(
                domain or "notify",
                service,
                {"title": title, "message": text},
                blocking=True,
            )
        return {"count": len(items), "title": title, "text": text, "events": items}

    async def handle_import_ics(call: ServiceCall) -> ServiceResponse:
        text = await _read_source(hass, call)
        events = await hass.async_add_executor_job(
            parse_ics, text, hass.config.time_zone or "UTC"
        )
        return await _save_imported(hass, events, [], call)

    async def handle_import_geojson(call: ServiceCall) -> ServiceResponse:
        text = await _read_source(hass, call)
        try:
            events, errors = await hass.async_add_executor_job(
                lambda: parse_geojson(
                    text,
                    default_start=call.data.get("default_start"),
                    default_end=call.data.get("default_end"),
                    category=call.data.get("category"),
                    title_property=call.data.get("title_property"),
                )
            )
        except (ValueError, TypeError) as err:
            raise ServiceValidationError(f"Invalid GeoJSON: {err}") from err
        return await _save_imported(hass, events, errors, call)

    async def handle_import_gpx(call: ServiceCall) -> ServiceResponse:
        text = await _read_source(hass, call)
        try:
            events, errors = await hass.async_add_executor_job(
                lambda: parse_gpx(
                    text,
                    default_start=call.data.get("default_start"),
                    default_end=call.data.get("default_end"),
                    category=call.data.get("category"),
                )
            )
        except Exception as err:  # noqa: BLE001 - XML parse errors vary
            raise ServiceValidationError(f"Invalid GPX: {err}") from err
        return await _save_imported(hass, events, errors, call)

    async def handle_backup(call: ServiceCall) -> ServiceResponse:
        store = _get_store(hass)
        stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
        filename = call.data.get("filename") or f"chronotope-backup-{stamp}.db"
        dest = filename if Path(filename).is_absolute() else hass.config.path(filename)
        path = await hass.async_add_executor_job(store.backup, dest)
        return {"path": path}

    async def handle_extract_event(call: ServiceCall) -> ServiceResponse:
        """Experimental: extract a structured event from free text via a
        conversation agent (LLM), optionally saving it as inferred."""
        tz_name = hass.config.time_zone or "UTC"
        today = datetime.now(ZoneInfo(tz_name)).strftime("%A, %Y-%m-%d")
        prompt = (
            "Extract one event from the following text as a pure JSON object"
            " (no explanations, no markdown) with these fields:"
            " title (required), category, address, lat, lon, start_time and"
            " end_time (ISO 8601 with timezone offset), recurrence (RFC 5545"
            " RRULE, only if recurring; BYHOUR/BYDAY mean local time),"
            ' time_precision ("exact", or "approximate" for vague wording'
            ' like "about twice a month"), schedule_text (the original'
            " schedule wording when approximate), raw_description,"
            " source_url. Omit fields you cannot determine. Keep the"
            " original language of the text for title and descriptions."
            f" Today is {today}, timezone {tz_name}. Text:\n\n"
            f"{call.data['text']}"
        )
        service_data: dict[str, Any] = {"text": prompt}
        if agent := call.data.get("agent_id"):
            service_data["agent_id"] = agent
        try:
            result = await hass.services.async_call(
                "conversation",
                "process",
                service_data,
                blocking=True,
                return_response=True,
            )
            speech = result["response"]["speech"]["plain"]["speech"]
        except Exception as err:  # noqa: BLE001
            raise HomeAssistantError(f"conversation.process failed: {err}") from err

        match = re.search(r"\{.*\}", speech, re.DOTALL)
        if not match:
            raise HomeAssistantError(
                f"Agent returned no JSON object: {speech[:200]}"
            )
        try:
            extracted = json.loads(match.group(0))
        except json.JSONDecodeError as err:
            raise HomeAssistantError(f"Agent returned invalid JSON: {err}") from err

        extracted.setdefault("confidence", "inferred")
        extracted.setdefault("source_name", "llm-extract")
        saved = False
        if call.data.get("save"):
            store = _get_store(hass)
            try:
                extracted = await hass.async_add_executor_job(
                    lambda: store.save_event(extracted, dedupe=True)
                )
            except ValueError as err:
                raise ServiceValidationError(
                    f"Extracted event is invalid: {err}"
                ) from err
            notify_event_change(
                hass, "updated" if extracted.get("deduped") else "added", extracted
            )
            saved = True
        return {"event": extracted, "saved": saved}

    async def handle_match_visits(call: ServiceCall) -> ServiceResponse:
        """Retroactively fill the visit history from recorder data.

        Only reaches as far back as the recorder retention (purge_keep_days,
        default 10) - older positions simply no longer exist.
        """
        store = _get_store(hass)
        if "recorder" not in hass.config.components:
            raise HomeAssistantError(
                "Recorder integration is not available; match_visits needs it"
            )
        # Lazy import: recorder is the one heavyweight HA dependency here.
        from homeassistant.components.recorder import get_instance, history

        days = call.data.get("days", 10)
        radius_km = call.data.get("radius_km", 0.5)
        persons = call.data.get("person_entities") or hass.states.async_entity_ids(
            "person"
        )
        if not persons:
            return {"matched": 0, "visits": []}

        now = datetime.now(timezone.utc)
        start = now - timedelta(days=days)
        states_by_person = await get_instance(hass).async_add_executor_job(
            lambda: history.get_significant_states(
                hass,
                start,
                now,
                list(persons),
                significant_changes_only=False,
                minimal_response=False,
            )
        )

        flt = QueryFilter(
            window_start=start.isoformat(),
            window_end=now.isoformat(),
            include_hidden=True,
            tz_name=hass.config.time_zone or "UTC",
        )
        events = await hass.async_add_executor_job(store.query_events, flt)

        # Plain (time, lat, lon) samples per person for the executor job.
        samples: dict[str, list[tuple[datetime, float, float]]] = {}
        for person_id, states in (states_by_person or {}).items():
            rows = []
            for state in states:
                lat = state.attributes.get("latitude")
                lon = state.attributes.get("longitude")
                if lat is None or lon is None:
                    continue
                rows.append((state.last_updated, lat, lon))
            if rows:
                samples[person_id] = rows

        def _match() -> list[dict[str, Any]]:
            matched: list[dict[str, Any]] = []
            for event in events:
                if event.get("lat") is None:
                    continue
                pairs = event.get("occurrences") or [
                    [event["start_time"], event["end_time"]]
                ]
                windows = [
                    (datetime.fromisoformat(s), datetime.fromisoformat(e))
                    for s, e in pairs
                ]
                for person_id, rows in samples.items():
                    hit = next(
                        (
                            (when, lat, lon)
                            for when, lat, lon in rows
                            if any(ws <= when <= we for ws, we in windows)
                            and (
                                haversine_km(lat, lon, event["lat"], event["lon"])
                                or 1e9
                            )
                            <= radius_km
                        ),
                        None,
                    )
                    if hit is None:
                        continue
                    store.record_visit(
                        event["id"], person_id, seen_at=hit[0].isoformat()
                    )
                    matched.append(
                        {
                            "event_id": event["id"],
                            "title": event["title"],
                            "person_id": person_id,
                            "seen_at": hit[0].isoformat(),
                        }
                    )
            return matched

        matched = await hass.async_add_executor_job(_match)
        if matched:
            notify_event_change(hass, "updated", None)
        return {"matched": len(matched), "visits": matched}

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
    _import_base = {
        vol.Optional("url"): cv.string,
        vol.Optional("path"): cv.string,
        vol.Optional("data"): cv.string,
        vol.Optional("source_name"): cv.string,
        vol.Optional("category"): cv.string,
        vol.Optional("dedupe"): cv.boolean,
    }
    hass.services.async_register(
        DOMAIN,
        "import_ics",
        handle_import_ics,
        schema=vol.Schema(_import_base),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        "import_geojson",
        handle_import_geojson,
        schema=vol.Schema(
            {
                **_import_base,
                vol.Optional("default_start"): cv.string,
                vol.Optional("default_end"): cv.string,
                vol.Optional("title_property"): cv.string,
            }
        ),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        "import_gpx",
        handle_import_gpx,
        schema=vol.Schema(
            {
                **_import_base,
                vol.Optional("default_start"): cv.string,
                vol.Optional("default_end"): cv.string,
            }
        ),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        "backup",
        handle_backup,
        schema=vol.Schema({vol.Optional("filename"): cv.string}),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        "extract_event",
        handle_extract_event,
        schema=vol.Schema(
            {
                vol.Required("text"): cv.string,
                vol.Optional("agent_id"): cv.string,
                vol.Optional("save"): cv.boolean,
            }
        ),
        supports_response=SupportsResponse.OPTIONAL,
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
        "match_visits",
        handle_match_visits,
        schema=vol.Schema(
            {
                vol.Optional("days"): vol.All(vol.Coerce(int), vol.Range(min=1, max=365)),
                vol.Optional("radius_km"): vol.All(
                    vol.Coerce(float), vol.Range(min=0.05, max=50)
                ),
                vol.Optional("person_entities"): [cv.entity_id],
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
