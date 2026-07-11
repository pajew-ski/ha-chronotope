"""Config flow: single instance; options for proximity detection."""

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

from .const import DOMAIN
from .nearby import DEFAULT_RADIUS_KM, OPTION_NEARBY_ENABLED, OPTION_NEARBY_RADIUS


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
    """Options: proximity detection toggle and radius."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)
        options = self.config_entry.options
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
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
