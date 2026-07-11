"""HTTP views: iCalendar export and REST ingest for scrapers."""

from __future__ import annotations

import hmac
import json

from aiohttp import web

from homeassistant.components.http import KEY_HASS, HomeAssistantView

from .const import DATA_STORE, DATA_TOKEN, DOMAIN, ICS_VIEW_URL, INGEST_VIEW_URL
from .ics import events_to_ics
from .signals import notify_event_change
from .store import QueryFilter


def _authorized(request: web.Request, token: str) -> bool:
    """Token via ?token= or 'Authorization: Bearer <token>' header."""
    supplied = request.query.get("token", "")
    if not supplied:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            supplied = auth[len("Bearer "):]
    return hmac.compare_digest(supplied, token)


def _float_param(query, name: str) -> float | None:
    value = query.get(name)
    if value is None:
        return None
    try:
        return float(value)
    except ValueError as err:
        raise ValueError(f"{name} must be a number, got {value!r}") from err


def filter_from_query(query, tz_name: str) -> QueryFilter:
    """Build a QueryFilter from URL query parameters."""
    weekdays: list[int] = []
    for raw in query.getall("weekday", []):
        try:
            weekday = int(raw)
        except ValueError as err:
            raise ValueError(f"weekday must be an integer 0-6, got {raw!r}") from err
        if not 0 <= weekday <= 6:
            raise ValueError(f"weekday must be 0-6, got {weekday}")
        weekdays.append(weekday)

    limit = query.get("limit")
    if limit is not None:
        try:
            limit = int(limit)
        except ValueError as err:
            raise ValueError(f"limit must be an integer, got {limit!r}") from err

    return QueryFilter(
        categories=query.getall("category", []) or None,
        center_lat=_float_param(query, "lat"),
        center_lon=_float_param(query, "lon"),
        radius_km=_float_param(query, "radius"),
        window_start=query.get("start"),
        window_end=query.get("end"),
        weekdays=weekdays or None,
        time_from=query.get("time_from"),
        time_to=query.get("time_to"),
        text=query.get("text"),
        favorites_only=query.get("favorites") in ("1", "true", "yes"),
        tz_name=tz_name,
        limit=limit,
    )


class ChronotopeICSView(HomeAssistantView):
    """Unauthenticated view guarded by a per-install secret token.

    Calendar clients (HA Remote Calendar, CalDAV/ICS subscribers,
    Thunderbird, ...) cannot send Authorization headers, so the feed uses
    the common pattern of a secret in the query string instead.
    """

    url = ICS_VIEW_URL
    name = "api:chronotope:ics"
    requires_auth = False

    async def get(self, request: web.Request) -> web.Response:
        hass = request.app[KEY_HASS]
        domain_data = hass.data.get(DOMAIN, {})
        store = domain_data.get(DATA_STORE)
        token = domain_data.get(DATA_TOKEN)
        if store is None or token is None:
            return web.Response(status=503, text="Chronotope is not set up")

        if not _authorized(request, token):
            return web.Response(status=401, text="Invalid token")

        tz_name = hass.config.time_zone or "UTC"
        try:
            if profile_ref := request.query.get("profile"):
                profile = await hass.async_add_executor_job(
                    store.get_profile, profile_ref
                )
                if profile is None:
                    return web.Response(status=404, text="Unknown profile")
                flt = QueryFilter.from_payload(
                    profile["filters"],
                    tz_name=tz_name,
                    window_start=request.query.get("start"),
                    window_end=request.query.get("end"),
                )
            else:
                flt = filter_from_query(request.query, tz_name)
            events = await hass.async_add_executor_job(store.query_events, flt)
        except ValueError as err:
            return web.Response(status=400, text=str(err))

        return web.Response(
            text=events_to_ics(events, tz_name=tz_name),
            content_type="text/calendar",
            charset="utf-8",
        )


class ChronotopeIngestView(HomeAssistantView):
    """REST ingest for scrapers: POST events without speaking WebSocket.

    Accepts a single event object, a bare list, or {"events": [...]}.
    Token-guarded like the ICS feed (query param or Bearer header).
    Deduplication is on by default; disable with ?dedupe=0.
    """

    url = INGEST_VIEW_URL
    name = "api:chronotope:ingest"
    requires_auth = False

    async def post(self, request: web.Request) -> web.Response:
        hass = request.app[KEY_HASS]
        domain_data = hass.data.get(DOMAIN, {})
        store = domain_data.get(DATA_STORE)
        token = domain_data.get(DATA_TOKEN)
        if store is None or token is None:
            return web.Response(status=503, text="Chronotope is not set up")
        if not _authorized(request, token):
            return web.Response(status=401, text="Invalid token")

        try:
            body = await request.json()
        except (json.JSONDecodeError, UnicodeDecodeError):
            return web.Response(status=400, text="Body must be JSON")

        if isinstance(body, dict) and "events" in body:
            items = body["events"]
        elif isinstance(body, list):
            items = body
        else:
            items = [body]
        if not isinstance(items, list) or not all(
            isinstance(item, dict) for item in items
        ):
            return web.Response(status=400, text="Expected event object(s)")

        dedupe = request.query.get("dedupe", "1") not in ("0", "false", "no")
        saved: list[dict] = []
        errors: list[dict] = []
        for index, item in enumerate(items):
            incoming_id = item.get("id")
            existed = (
                incoming_id is not None
                and await hass.async_add_executor_job(
                    store.get_event, str(incoming_id)
                )
                is not None
            )
            try:
                event = await hass.async_add_executor_job(
                    lambda data=item: store.save_event(data, dedupe=dedupe)
                )
            except ValueError as err:
                errors.append({"index": index, "error": str(err)})
                continue
            action = "updated" if existed or event.get("deduped") else "added"
            notify_event_change(hass, action, event)
            saved.append(event)

        return self.json(
            {"saved": len(saved), "events": saved, "errors": errors},
            status_code=200 if not errors else (207 if saved else 400),
        )
