"""Feed layer: builds and tears down providers per config entry (I2).

External requests of the integration live exclusively in this package.
Every source is opt-in and off by default; the global switch lives in the
options flow. The manager owns the persisted policy state and the mapping
layer_id -> running provider.
"""

from __future__ import annotations

import asyncio
import json
import logging
from pathlib import Path
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store

from ..const import (
    DATA_FEEDS,
    DATA_STORE,
    DOMAIN,
    FEEDS_STORAGE_KEY,
    FEEDS_STORAGE_VERSION,
    OPTION_LAYERS_CENTER_LAT,
    OPTION_LAYERS_CENTER_LON,
    OPTION_LAYERS_ENABLED,
    SIGNAL_LAYERS_CHANGED,
)
from .base import FeedProvider
from .catalog import CATALOG, GENERIC_PROVIDERS, KEY_OPTIONS, KLASS_RASTER, LayerSpec
from .providers import PROVIDERS
from .providers.generic import spec_for_generic

_LOGGER = logging.getLogger(__name__)


class FeedManager:
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._providers: dict[str, FeedProvider] = {}
        self._policy_store = Store(hass, FEEDS_STORAGE_VERSION, FEEDS_STORAGE_KEY)
        self._policies: dict[str, dict[str, Any]] = {}
        self._save_task: asyncio.TimerHandle | None = None
        self.version = "0"
        self._lock = asyncio.Lock()

    # ---------------------------------------------------------------- setup

    @property
    def enabled(self) -> bool:
        return bool(self.entry.options.get(OPTION_LAYERS_ENABLED, False))

    @property
    def home_center(self) -> tuple[float, float]:
        lat = self.entry.options.get(OPTION_LAYERS_CENTER_LAT)
        lon = self.entry.options.get(OPTION_LAYERS_CENTER_LON)
        if lat is not None and lon is not None:
            return float(lat), float(lon)
        return float(self.hass.config.latitude), float(self.hass.config.longitude)

    def key(self, name: str) -> str | None:
        option = KEY_OPTIONS.get(name)
        value = self.entry.options.get(option) if option else None
        return str(value).strip() or None if value else None

    def keys_set(self) -> dict[str, bool]:
        return {name: self.key(name) is not None for name in KEY_OPTIONS}

    async def async_setup(self) -> None:
        manifest = Path(__file__).parent.parent / "manifest.json"
        try:
            data = await self.hass.async_add_executor_job(manifest.read_text)
            self.version = str(json.loads(data).get("version", "0"))
        except (OSError, ValueError):
            pass
        self._policies = await self._policy_store.async_load() or {}
        if not self.enabled:
            _LOGGER.debug("Chronotope layers are disabled in the options")
            return
        store = self.hass.data[DOMAIN][DATA_STORE]
        configs = await self.hass.async_add_executor_job(store.list_layers)
        for config in configs:
            if config.get("enabled"):
                await self.async_apply_layer(config)

    async def async_shutdown(self) -> None:
        for layer_id in list(self._providers):
            await self._stop(layer_id)
        if self._save_task:
            self._save_task.cancel()
        await self._policy_store.async_save(self._policies)

    # ------------------------------------------------------------- policies

    def policy_state(self, layer_id: str) -> dict[str, Any] | None:
        return self._policies.get(layer_id)

    async def async_save_policy(self, layer_id: str, state: dict[str, Any]) -> None:
        self._policies[layer_id] = state
        self._policy_store.async_delay_save(lambda: self._policies, 15)

    # ------------------------------------------------------------ providers

    def provider(self, layer_id: str) -> FeedProvider | None:
        return self._providers.get(layer_id)

    def providers(self) -> dict[str, FeedProvider]:
        return dict(self._providers)

    @staticmethod
    def spec_for(config: dict[str, Any]) -> LayerSpec | None:
        if config.get("layer_id"):
            return CATALOG.get(config["layer_id"])
        if config.get("provider") == "geojson_url":
            return spec_for_generic(config)
        return None

    def is_data_layer(self, config: dict[str, Any]) -> bool:
        spec = self.spec_for(config)
        return spec is not None and spec.klass != KLASS_RASTER and spec.provider in PROVIDERS

    def missing_key(self, config: dict[str, Any]) -> str | None:
        spec = self.spec_for(config)
        if spec and spec.requires_key and not self.key(spec.requires_key):
            return spec.requires_key
        return None

    async def async_apply_layer(self, config: dict[str, Any]) -> None:
        """Start, update or stop the provider for a saved configuration."""
        layer_id = config["id"]
        async with self._lock:
            wanted = self.enabled and bool(config.get("enabled")) and self.is_data_layer(config)
            if wanted and self.missing_key(config):
                wanted = False
            current = self._providers.get(layer_id)
            if not wanted:
                if current is not None:
                    await self._stop(layer_id)
            elif current is None:
                spec = self.spec_for(config)
                provider_cls = PROVIDERS[spec.provider]
                provider = provider_cls(self.hass, self, spec, config)
                self._providers[layer_id] = provider
                await provider.async_start()
                _LOGGER.info("Chronotope layer %s started (%s)", layer_id, spec.provider)
            else:
                if current.config.get("url") != config.get("url"):
                    await self._stop(layer_id)
                    await self.async_apply_layer(config)
                    return
                current.update_config(config)
        async_dispatcher_send(self.hass, SIGNAL_LAYERS_CHANGED)

    async def async_remove_layer(self, layer_id: str) -> None:
        async with self._lock:
            await self._stop(layer_id)
        self._policies.pop(layer_id, None)
        self._policy_store.async_delay_save(lambda: self._policies, 15)
        async_dispatcher_send(self.hass, SIGNAL_LAYERS_CHANGED)

    async def _stop(self, layer_id: str) -> None:
        provider = self._providers.pop(layer_id, None)
        if provider is not None:
            await provider.async_stop()
            _LOGGER.info("Chronotope layer %s stopped", layer_id)

    # --------------------------------------------------------------- status

    def status(self, configs: list[dict[str, Any]] | None = None) -> dict[str, dict[str, Any]]:
        out: dict[str, dict[str, Any]] = {}
        for layer_id, provider in self._providers.items():
            out[layer_id] = provider.status()
        for config in configs or []:
            layer_id = config["id"]
            if layer_id in out:
                continue
            spec = self.spec_for(config)
            if not self.enabled:
                freshness = "disabled"
                note = "layers disabled in options"
            elif not config.get("enabled"):
                freshness = "disabled"
                note = None
            elif self.missing_key(config):
                freshness = "blocked"
                note = f"API key missing: {self.missing_key(config)}"
            elif spec is None or spec.klass == KLASS_RASTER or config.get("provider") in ("xyz", "wms", "wmts"):
                freshness = "fresh"
                note = "rendered by the browser"
            else:
                freshness = "stale"
                note = "starting"
            out[layer_id] = {"layer_id": layer_id, "freshness": freshness, "last_error": note, "count": 0}
        return out

    def sensor_summary(self) -> dict[str, dict[str, Any]]:
        """Compact status for sensor.chronotope_statistics attributes."""
        return {
            layer_id: {
                "freshness": st.get("freshness"),
                "last_success": st.get("last_success"),
                "last_error": st.get("last_error"),
                "count": st.get("count"),
            }
            for layer_id, st in self.status().items()
        }

    # -------------------------------------------------------------- preview

    async def async_preview(self, config: dict[str, Any]) -> dict[str, Any]:
        """One test request for a generic layer (no persistence)."""
        provider_kind = config.get("provider")
        if provider_kind == "geojson_url":
            spec = spec_for_generic({**config, "id": config.get("id") or "custom_preview"})
            probe = PROVIDERS["geojson_url"](self.hass, self, spec, {**config, "id": spec.id})
            try:
                result = await probe.async_fetch()
                if result is None:
                    return {"ok": True, "status": 304, "count": 0}
                parsed = await self.hass.async_add_executor_job(probe.parse, result.body)
                return {"ok": True, "status": result.status, "count": len(parsed["features"]), "truncated": parsed["truncated"], "bytes": len(result.body)}
            except Exception as err:  # noqa: BLE001
                return {"ok": False, "error": str(err)}
        if provider_kind in ("xyz", "wmts", "wms"):
            from .views import sample_raster_url

            url = sample_raster_url(config)
            from homeassistant.helpers.aiohttp_client import async_get_clientsession

            session = async_get_clientsession(self.hass)
            try:
                async with session.get(url, timeout=15, headers={"User-Agent": f"ha-chronotope/{self.version}"}) as response:
                    await response.content.read(64)
                    content_type = response.headers.get("Content-Type", "")
                    ok = response.status == 200 and content_type.startswith("image/")
                    return {"ok": ok, "status": response.status, "content_type": content_type, "url": url, "error": None if ok else f"HTTP {response.status} {content_type}"}
            except Exception as err:  # noqa: BLE001
                return {"ok": False, "error": str(err), "url": url}
        return {"ok": False, "error": f"cannot preview provider {provider_kind!r}"}


@callback
def get_manager(hass: HomeAssistant) -> FeedManager | None:
    return hass.data.get(DOMAIN, {}).get(DATA_FEEDS)


__all__ = ["FeedManager", "get_manager", "CATALOG", "GENERIC_PROVIDERS"]
