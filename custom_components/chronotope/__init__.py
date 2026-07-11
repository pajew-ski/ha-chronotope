"""Chronotope: domain-open geo-time event engine for Home Assistant."""

from __future__ import annotations

import secrets
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from . import websocket_api
from .nearby import async_setup_nearby
from .services import async_register_services
from .const import (
    DATA_STORE,
    DATA_TOKEN,
    DATA_VIEW_REGISTERED,
    DATA_WS_REGISTERED,
    DB_FILENAME,
    DOMAIN,
    FRONTEND_SCRIPT_URL,
    FRONTEND_STATIC_PATH,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STORAGE_KEY,
    STORAGE_VERSION,
)
from .http import ChronotopeICSView, ChronotopeIngestView
from .store import EventStore

DATA_STATIC_REGISTERED = "static_registered"

PLATFORMS = [Platform.CALENDAR, Platform.SENSOR]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Chronotope from a config entry."""
    event_store = await hass.async_add_executor_job(
        EventStore, hass.config.path(DB_FILENAME)
    )

    storage = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    stored = await storage.async_load() or {}
    token = stored.get(DATA_TOKEN)
    if not token:
        token = secrets.token_hex(16)
        await storage.async_save({DATA_TOKEN: token})

    domain_data = hass.data.setdefault(DOMAIN, {})
    domain_data[DATA_STORE] = event_store
    domain_data[DATA_TOKEN] = token

    # WebSocket commands, HTTP view and static path can only be registered
    # once per HA run; the flags survive unload/reload of the entry.
    if not domain_data.get(DATA_WS_REGISTERED):
        websocket_api.async_register(hass)
        domain_data[DATA_WS_REGISTERED] = True
    if not domain_data.get(DATA_VIEW_REGISTERED):
        hass.http.register_view(ChronotopeICSView)
        hass.http.register_view(ChronotopeIngestView)
        domain_data[DATA_VIEW_REGISTERED] = True
    if not domain_data.get(DATA_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    FRONTEND_STATIC_PATH,
                    str(Path(__file__).parent / "frontend"),
                    cache_headers=False,
                )
            ]
        )
        domain_data[DATA_STATIC_REGISTERED] = True

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="chronotope-panel",
        frontend_url_path=PANEL_URL_PATH,
        module_url=FRONTEND_SCRIPT_URL,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        require_admin=False,
        embed_iframe=False,
    )

    async_register_services(hass)
    async_setup_nearby(hass, entry)
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the entry when options (nearby radius etc.) change."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload the config entry."""
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        return False
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    domain_data = hass.data.get(DOMAIN, {})
    event_store: EventStore | None = domain_data.pop(DATA_STORE, None)
    domain_data.pop(DATA_TOKEN, None)
    if event_store is not None:
        await hass.async_add_executor_job(event_store.close)
    return True
