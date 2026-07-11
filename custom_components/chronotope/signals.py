"""Change notifications: HA bus events for users, dispatcher for entities."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send

from .const import (
    EVENT_ADDED,
    EVENT_DELETED,
    EVENT_PROFILES_CHANGED,
    EVENT_UPDATED,
    SIGNAL_DATA_CHANGED,
    SIGNAL_PROFILES_CHANGED,
)

_ACTION_EVENTS = {
    "added": EVENT_ADDED,
    "updated": EVENT_UPDATED,
    "deleted": EVENT_DELETED,
}


@callback
def notify_event_change(
    hass: HomeAssistant, action: str, event: dict[str, Any] | None
) -> None:
    """Fire a bus event for automations and refresh our entities."""
    payload: dict[str, Any] = {}
    if event is not None:
        payload["event"] = event
    hass.bus.async_fire(_ACTION_EVENTS[action], payload)
    async_dispatcher_send(hass, SIGNAL_DATA_CHANGED)


@callback
def notify_profiles_changed(hass: HomeAssistant) -> None:
    hass.bus.async_fire(EVENT_PROFILES_CHANGED, {})
    async_dispatcher_send(hass, SIGNAL_PROFILES_CHANGED)
