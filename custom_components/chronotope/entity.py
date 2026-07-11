"""Shared entity plumbing: one entity set per filter profile, kept in sync."""

from __future__ import annotations

from typing import Any, Callable

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    DATA_STORE,
    DOMAIN,
    PROFILE_ALL_ID,
    PROFILE_ALL_NAME,
    SIGNAL_DATA_CHANGED,
    SIGNAL_PROFILES_CHANGED,
)
from .store import EventStore, QueryFilter


def all_events_profile() -> dict[str, Any]:
    return {"id": PROFILE_ALL_ID, "name": PROFILE_ALL_NAME, "filters": {}}


class ChronotopeEntity(Entity):
    """Base for per-profile entities: device, naming, refresh signals."""

    _attr_should_poll = True

    def __init__(
        self,
        entry: ConfigEntry,
        store: EventStore,
        profile: dict[str, Any],
        kind: str,
    ) -> None:
        self._store = store
        self._profile = profile
        self._attr_unique_id = f"{entry.entry_id}-{profile['id']}-{kind}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name="Chronotope",
            entry_type=DeviceEntryType.SERVICE,
        )
        self._attr_name = self._make_name()

    def _make_name(self) -> str:
        return f"Chronotope {self._profile['name']}"

    @property
    def profile_id(self) -> str:
        return self._profile["id"]

    @callback
    def async_update_profile(self, profile: dict[str, Any]) -> None:
        """Profile was renamed or its filters changed."""
        self._profile = profile
        self._attr_name = self._make_name()
        if self.hass:
            self.async_schedule_update_ha_state(True)

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(self.hass, SIGNAL_DATA_CHANGED, self._data_changed)
        )

    @callback
    def _data_changed(self) -> None:
        self.async_schedule_update_ha_state(True)

    def _profile_filter(
        self, window_start: str, window_end: str, limit: int | None = None
    ) -> QueryFilter:
        return QueryFilter.from_payload(
            self._profile.get("filters") or {},
            tz_name=self.hass.config.time_zone or "UTC",
            window_start=window_start,
            window_end=window_end,
            limit=limit,
        )


async def async_setup_profile_entities(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
    platform_domain: str,
    factory: Callable[[dict[str, Any]], list[ChronotopeEntity]],
) -> None:
    """Create entities per profile and keep them in sync with profile CRUD."""
    store: EventStore = hass.data[DOMAIN][DATA_STORE]
    known: dict[str, list[ChronotopeEntity]] = {}

    async def _sync() -> None:
        profiles = [all_events_profile()] + await hass.async_add_executor_job(
            store.list_profiles
        )
        wanted = {profile["id"]: profile for profile in profiles}

        new_entities: list[ChronotopeEntity] = []
        for profile_id, profile in wanted.items():
            if profile_id in known:
                for entity in known[profile_id]:
                    entity.async_update_profile(profile)
            else:
                entities = factory(profile)
                known[profile_id] = entities
                new_entities.extend(entities)

        registry = er.async_get(hass)
        for profile_id in [pid for pid in known if pid not in wanted]:
            for entity in known.pop(profile_id):
                entity_id = registry.async_get_entity_id(
                    platform_domain, DOMAIN, entity.unique_id
                )
                if entity_id:
                    registry.async_remove(entity_id)

        if new_entities:
            async_add_entities(new_entities, update_before_add=True)

    await _sync()
    entry.async_on_unload(
        async_dispatcher_connect(hass, SIGNAL_PROFILES_CHANGED, _sync)
    )
