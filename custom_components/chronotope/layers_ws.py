"""WebSocket commands for geo layers (spec 6.1)."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DATA_FEEDS, DATA_STORE, DOMAIN
from .feeds.catalog import CATALOG, catalog_payload, validate_params
from .store import EventStore


def async_register(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_layers_catalog)
    websocket_api.async_register_command(hass, ws_layers_list)
    websocket_api.async_register_command(hass, ws_layers_save)
    websocket_api.async_register_command(hass, ws_layers_delete)
    websocket_api.async_register_command(hass, ws_layers_status)
    websocket_api.async_register_command(hass, ws_layers_preview)


def _context(hass: HomeAssistant, connection, msg) -> tuple[EventStore, Any] | None:
    domain_data = hass.data.get(DOMAIN, {})
    store = domain_data.get(DATA_STORE)
    manager = domain_data.get(DATA_FEEDS)
    if store is None or manager is None:
        connection.send_error(msg["id"], "not_ready", "Chronotope is not set up")
        return None
    return store, manager


@websocket_api.websocket_command({vol.Required("type"): "chronotope/layers/catalog"})
@websocket_api.async_response
async def ws_layers_catalog(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    ctx = _context(hass, connection, msg)
    if ctx is None:
        return
    _, manager = ctx
    payload = catalog_payload(manager.keys_set())
    payload["layers_enabled"] = manager.enabled
    payload["home_center"] = {"lat": manager.home_center[0], "lon": manager.home_center[1]}
    connection.send_result(msg["id"], payload)


@websocket_api.websocket_command({vol.Required("type"): "chronotope/layers/list"})
@websocket_api.async_response
async def ws_layers_list(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    ctx = _context(hass, connection, msg)
    if ctx is None:
        return
    store, manager = ctx
    configs = await hass.async_add_executor_job(store.list_layers)
    status = manager.status(configs)
    for config in configs:
        config["status"] = status.get(config["id"])
        config["missing_key"] = manager.missing_key(config)
    connection.send_result(msg["id"], {"layers": configs, "layers_enabled": manager.enabled})


@websocket_api.websocket_command(
    {vol.Required("type"): "chronotope/layers/save", vol.Required("layer"): dict}
)
@websocket_api.async_response
async def ws_layers_save(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    ctx = _context(hass, connection, msg)
    if ctx is None:
        return
    store, manager = ctx
    layer = dict(msg["layer"])
    if layer.get("layer_id"):
        spec = CATALOG.get(str(layer["layer_id"]))
        if spec is None:
            connection.send_error(msg["id"], "unknown_layer", f"Unknown layer {layer['layer_id']!r}")
            return
        try:
            layer["params"] = validate_params(spec, layer.get("params") or {})
        except ValueError as err:
            connection.send_error(msg["id"], "invalid_layer", str(err))
            return
        if layer.get("interval_s") is not None:
            layer["interval_s"] = max(int(layer["interval_s"]), spec.min_interval_s)
    try:
        saved = await hass.async_add_executor_job(store.save_layer, layer)
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_layer", str(err))
        return
    await manager.async_apply_layer(saved)
    saved["status"] = manager.status([saved]).get(saved["id"])
    saved["missing_key"] = manager.missing_key(saved)
    connection.send_result(msg["id"], {"layer": saved})


@websocket_api.websocket_command(
    {vol.Required("type"): "chronotope/layers/delete", vol.Required("layer_id"): str}
)
@websocket_api.async_response
async def ws_layers_delete(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    ctx = _context(hass, connection, msg)
    if ctx is None:
        return
    store, manager = ctx
    deleted = await hass.async_add_executor_job(store.delete_layer, msg["layer_id"])
    await manager.async_remove_layer(msg["layer_id"])
    connection.send_result(msg["id"], {"deleted": deleted})


@websocket_api.websocket_command({vol.Required("type"): "chronotope/layers/status"})
@websocket_api.async_response
async def ws_layers_status(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    ctx = _context(hass, connection, msg)
    if ctx is None:
        return
    store, manager = ctx
    configs = await hass.async_add_executor_job(store.list_layers)
    connection.send_result(msg["id"], {"status": manager.status(configs), "layers_enabled": manager.enabled})


@websocket_api.websocket_command(
    {vol.Required("type"): "chronotope/layers/preview", vol.Required("layer"): dict}
)
@websocket_api.async_response
async def ws_layers_preview(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Validate a generic layer and make one test request (7.1)."""
    ctx = _context(hass, connection, msg)
    if ctx is None:
        return
    _, manager = ctx
    from .store import validate_layer_config

    try:
        config = validate_layer_config(dict(msg["layer"]))
    except ValueError as err:
        connection.send_result(msg["id"], {"ok": False, "error": str(err)})
        return
    result = await manager.async_preview(config)
    result["config"] = config
    connection.send_result(msg["id"], result)
