"""HTTP view serving the filtered events as an iCalendar feed."""

from __future__ import annotations

import hmac

from aiohttp import web

from homeassistant.components.http import KEY_HASS, HomeAssistantView

from .const import DATA_STORE, DATA_TOKEN, DOMAIN, ICS_VIEW_URL
from .ics import events_to_ics
from .store import QueryFilter


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

        supplied = request.query.get("token", "")
        if not hmac.compare_digest(supplied, token):
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
            text=events_to_ics(events),
            content_type="text/calendar",
            charset="utf-8",
        )
