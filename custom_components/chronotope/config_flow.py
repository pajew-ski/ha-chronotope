"""Config flow: single instance; options for proximity, geoloc and layers."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from .const import (
    DOMAIN,
    OPTION_GEOLOC_SOURCES,
    OPTION_LAYERS_CENTER_LAT,
    OPTION_LAYERS_CENTER_LON,
    OPTION_LAYERS_ENABLED,
)
from .feeds.catalog import KEY_OPTIONS
from .geoloc import OPTION_GEOLOC_INGEST
from .nearby import DEFAULT_RADIUS_KM, OPTION_NEARBY_ENABLED, OPTION_NEARBY_RADIUS

_PASSWORD = TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD))


class ChronotopeConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the trivial single-instance config flow."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(title="Chronotope", data={})
        return self.async_show_form(step_id="user", data_schema=vol.Schema({}))

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> "ChronotopeOptionsFlow":
        return ChronotopeOptionsFlow()


class ChronotopeOptionsFlow(OptionsFlow):
    """Options: proximity, geoloc bridge, data layers; second step API keys."""

    def __init__(self) -> None:
        self._pending: dict[str, Any] = {}

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        options = self.config_entry.options
        if user_input is not None:
            self._pending = dict(user_input)
            self._pending[OPTION_GEOLOC_SOURCES] = _parse_list(
                user_input.get(OPTION_GEOLOC_SOURCES, "")
            )
            return await self.async_step_api_keys()
        hass = self.hass
        schema = vol.Schema(
            {
                vol.Required(
                    OPTION_NEARBY_ENABLED,
                    default=options.get(OPTION_NEARBY_ENABLED, True),
                ): bool,
                vol.Required(
                    OPTION_NEARBY_RADIUS,
                    default=options.get(OPTION_NEARBY_RADIUS, DEFAULT_RADIUS_KM),
                ): vol.All(vol.Coerce(float), vol.Range(min=0.05, max=50)),
                vol.Required(
                    OPTION_GEOLOC_INGEST,
                    default=options.get(OPTION_GEOLOC_INGEST, False),
                ): bool,
                vol.Optional(
                    OPTION_GEOLOC_SOURCES,
                    default=", ".join(options.get(OPTION_GEOLOC_SOURCES) or []),
                ): str,
                vol.Required(
                    OPTION_LAYERS_ENABLED,
                    default=options.get(OPTION_LAYERS_ENABLED, False),
                ): bool,
                vol.Required(
                    OPTION_LAYERS_CENTER_LAT,
                    default=options.get(OPTION_LAYERS_CENTER_LAT, hass.config.latitude),
                ): vol.All(vol.Coerce(float), vol.Range(min=-90, max=90)),
                vol.Required(
                    OPTION_LAYERS_CENTER_LON,
                    default=options.get(OPTION_LAYERS_CENTER_LON, hass.config.longitude),
                ): vol.All(vol.Coerce(float), vol.Range(min=-180, max=180)),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)

    async def async_step_api_keys(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        options = self.config_entry.options
        if user_input is not None:
            merged = dict(self._pending)
            for option in KEY_OPTIONS.values():
                value = str(user_input.get(option) or "").strip()
                if value:
                    merged[option] = value
            # Default center equal to the HA home is not persisted (6.3).
            if (
                abs(merged.get(OPTION_LAYERS_CENTER_LAT, 0) - self.hass.config.latitude) < 1e-9
                and abs(merged.get(OPTION_LAYERS_CENTER_LON, 0) - self.hass.config.longitude) < 1e-9
            ):
                merged.pop(OPTION_LAYERS_CENTER_LAT, None)
                merged.pop(OPTION_LAYERS_CENTER_LON, None)
            return self.async_create_entry(title="", data=merged)
        schema = vol.Schema(
            {
                vol.Optional(option, default=options.get(option, "")): _PASSWORD
                for option in KEY_OPTIONS.values()
            }
        )
        return self.async_show_form(step_id="api_keys", data_schema=schema)


def _parse_list(value: Any) -> list[str]:
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    return [part.strip() for part in str(value or "").split(",") if part.strip()]
