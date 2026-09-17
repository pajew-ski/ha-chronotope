"""Sensors: next event and today's count per profile, plus global stats."""

from __future__ import annotations

from datetime import datetime, time, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DATA_FEEDS, DATA_STORE, DOMAIN, SIGNAL_LAYER_DATA, SIGNAL_LAYERS_CHANGED
from .entity import ChronotopeEntity, async_setup_profile_entities
from .store import EventStore, haversine_km

SCAN_INTERVAL = timedelta(minutes=15)

_LOOKAHEAD = timedelta(days=400)
_ATTR_EVENT_FIELDS = (
    "id",
    "title",
    "category",
    "address",
    "lat",
    "lon",
    "source_name",
    "source_url",
    "time_precision",
    "schedule_text",
)


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    store: EventStore = hass.data[DOMAIN][DATA_STORE]
    await async_setup_profile_entities(
        hass,
        entry,
        async_add_entities,
        "sensor",
        lambda profile: [
            ChronotopeNextEventSensor(entry, store, profile),
            ChronotopeTodayCountSensor(entry, store, profile),
        ],
    )
    async_add_entities([ChronotopeStatsSensor(entry, store)], update_before_add=True)
    await async_setup_layer_sensors(hass, entry, async_add_entities)


class ChronotopeNextEventSensor(ChronotopeEntity, SensorEntity):
    """Timestamp of the next (occurrence of an) event matching the profile."""

    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_icon = "mdi:clock-star-four-points-outline"

    def __init__(
        self, entry: ConfigEntry, store: EventStore, profile: dict[str, Any]
    ) -> None:
        super().__init__(entry, store, profile, "next_event")

    def _make_name(self) -> str:
        return f"Chronotope {self._profile['name']} next event"

    async def async_update(self) -> None:
        now = datetime.now(timezone.utc)
        flt = self._profile_filter(
            now.isoformat(), (now + _LOOKAHEAD).isoformat(), limit=5
        )
        events = await self.hass.async_add_executor_job(
            self._store.query_events, flt
        )
        best: tuple[datetime, dict[str, Any]] | None = None
        for event in events:
            pairs = event.get("occurrences") or [
                [event["start_time"], event["end_time"]]
            ]
            for start, end in pairs:
                if datetime.fromisoformat(end) <= now:
                    continue
                start_dt = datetime.fromisoformat(start)
                if best is None or start_dt < best[0]:
                    best = (start_dt, event)
                break
        if best is None:
            self._attr_native_value = None
            self._attr_extra_state_attributes = {}
            return
        start_dt, event = best
        self._attr_native_value = start_dt
        self._attr_extra_state_attributes = {
            field: event.get(field) for field in _ATTR_EVENT_FIELDS
        }


class ChronotopeTodayCountSensor(ChronotopeEntity, SensorEntity):
    """Number of events matching the profile that touch today (local time)."""

    _attr_icon = "mdi:calendar-today"
    _attr_native_unit_of_measurement = "Events"

    def __init__(
        self, entry: ConfigEntry, store: EventStore, profile: dict[str, Any]
    ) -> None:
        super().__init__(entry, store, profile, "events_today")

    def _make_name(self) -> str:
        return f"Chronotope {self._profile['name']} events today"

    async def async_update(self) -> None:
        tz = ZoneInfo(self.hass.config.time_zone or "UTC")
        today_start = datetime.combine(
            datetime.now(tz).date(), time.min, tzinfo=tz
        )
        today_end = today_start + timedelta(days=1)
        flt = self._profile_filter(today_start.isoformat(), today_end.isoformat())
        events = await self.hass.async_add_executor_job(
            self._store.query_events, flt
        )
        self._attr_native_value = len(events)
        self._attr_extra_state_attributes = {
            "titles": [event["title"] for event in events[:20]]
        }


class ChronotopeStatsSensor(ChronotopeEntity, SensorEntity):
    """Global statistics: total events, categories, sources."""

    _attr_icon = "mdi:chart-box-outline"
    _attr_native_unit_of_measurement = "Events"

    def __init__(self, entry: ConfigEntry, store: EventStore) -> None:
        super().__init__(
            entry, store, {"id": "stats", "name": "Statistics"}, "stats"
        )

    def _make_name(self) -> str:
        return "Chronotope statistics"

    async def async_update(self) -> None:
        stats = await self.hass.async_add_executor_job(self._store.stats)
        self._attr_native_value = stats["total_events"]
        attributes = {key: value for key, value in stats.items() if key != "total_events"}
        manager = self.hass.data.get(DOMAIN, {}).get(DATA_FEEDS)
        # Layer health (6.4): {layer_id: {freshness, last_success, last_error, count}}
        attributes["layers"] = manager.sensor_summary() if manager else {}
        self._attr_extra_state_attributes = attributes


# ------------------------------------------------------------ layer sensors
#
# A fixed, small set of aggregate sensors (I3): no entity per tracked object.
# Each exists only while its layer is active and refreshes on provider data.

_LAYER_SENSORS: dict[str, tuple[str, type]] = {}


def _register(layer_id: str):
    def wrap(cls):
        _LAYER_SENSORS[cls.KIND] = (layer_id, cls)
        return cls

    return wrap


class ChronotopeLayerSensor(SensorEntity):
    KIND = ""
    LAYER_ID = ""
    _attr_should_poll = False

    def __init__(self, entry: ConfigEntry, hass: HomeAssistant) -> None:
        self.hass = hass
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}-layer-{self.KIND}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name="Chronotope",
            entry_type=DeviceEntryType.SERVICE,
        )

    @property
    def _provider(self):
        manager = self.hass.data.get(DOMAIN, {}).get(DATA_FEEDS)
        return manager.provider(self.LAYER_ID) if manager else None

    @property
    def _manager(self):
        return self.hass.data.get(DOMAIN, {}).get(DATA_FEEDS)

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(self.hass, SIGNAL_LAYER_DATA, self._layer_data)
        )
        self._refresh()

    @callback
    def _layer_data(self, layer_id: str) -> None:
        if layer_id == self.LAYER_ID:
            self._refresh()
            self.async_write_ha_state()

    def _refresh(self) -> None:
        raise NotImplementedError


def _nearby(provider, manager, kind: str) -> tuple[int, dict[str, Any]]:
    """Count features within the layer radius; nearest as attributes."""
    lat, lon = provider.center()
    radius_km = provider.radius_nm() * 1.852
    features = (provider._payload or {}).get("features") or []
    nearest = None
    count = 0
    for feature in features:
        coords = (feature.get("geometry") or {}).get("coordinates") or []
        if len(coords) < 2:
            continue
        distance = haversine_km(lat, lon, coords[1], coords[0])
        if distance is None or distance > radius_km:
            continue
        count += 1
        if nearest is None or distance < nearest[0]:
            nearest = (distance, feature)
    attributes: dict[str, Any] = {"radius_km": round(radius_km, 1), "freshness": provider.policy.freshness(provider.interval_s)}
    if nearest:
        distance, feature = nearest
        props = feature["properties"]
        attributes["nearest_label"] = props.get("label")
        attributes["nearest_distance_km"] = round(distance, 2)
        if kind == "aircraft":
            attributes["nearest_alt_m"] = props.get("alt_m")
        attributes["nearest_track"] = props.get("track")
        attributes["nearest_detail"] = props.get("detail")
    return count, attributes


@_register("flights_regional")
class ChronotopeAircraftNearbySensor(ChronotopeLayerSensor):
    KIND = "aircraft_nearby"
    LAYER_ID = "flights_regional"
    _attr_name = "Chronotope aircraft nearby"
    _attr_icon = "mdi:airplane"
    _attr_native_unit_of_measurement = "aircraft"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def _refresh(self) -> None:
        provider = self._provider
        if provider is None:
            self._attr_native_value = None
            self._attr_extra_state_attributes = {}
            return
        self._attr_native_value, self._attr_extra_state_attributes = _nearby(provider, self._manager, "aircraft")


@_register("vessels")
class ChronotopeVesselsNearbySensor(ChronotopeLayerSensor):
    KIND = "vessels_nearby"
    LAYER_ID = "vessels"
    _attr_name = "Chronotope vessels nearby"
    _attr_icon = "mdi:ferry"
    _attr_native_unit_of_measurement = "vessels"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def _refresh(self) -> None:
        provider = self._provider
        if provider is None:
            self._attr_native_value = None
            self._attr_extra_state_attributes = {}
            return
        self._attr_native_value, self._attr_extra_state_attributes = _nearby(provider, self._manager, "vessel")


@_register("aurora")
class ChronotopeKpSensor(ChronotopeLayerSensor):
    KIND = "kp_index"
    LAYER_ID = "aurora"
    _attr_name = "Chronotope Kp index"
    _attr_icon = "mdi:sun-wireless-outline"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def _refresh(self) -> None:
        provider = self._provider
        kp = getattr(provider, "kp", None) if provider else None
        self._attr_native_value = kp["kp"] if kp else None
        self._attr_extra_state_attributes = {"time": kp["time"]} if kp else {}


@_register("aurora")
class ChronotopeAuroraHomeSensor(ChronotopeLayerSensor):
    KIND = "aurora_probability_home"
    LAYER_ID = "aurora"
    _attr_name = "Chronotope aurora probability at home"
    _attr_icon = "mdi:aurora"
    _attr_native_unit_of_measurement = "%"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def _refresh(self) -> None:
        provider = self._provider
        if provider is None or not hasattr(provider, "value_at"):
            self._attr_native_value = None
            self._attr_extra_state_attributes = {}
            return
        lat, lon = self._manager.home_center
        self._attr_native_value = provider.value_at(lat, lon)
        self._attr_extra_state_attributes = {
            "forecast_time": provider.policy.extra.get("forecast_time"),
            "freshness": provider.policy.freshness(provider.interval_s),
        }


async def async_setup_layer_sensors(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Add/remove the aggregate layer sensors as layers start and stop."""
    known: dict[str, ChronotopeLayerSensor] = {}

    @callback
    def _sync() -> None:
        manager = hass.data.get(DOMAIN, {}).get(DATA_FEEDS)
        registry = er.async_get(hass)
        new_entities: list[ChronotopeLayerSensor] = []
        for kind, (layer_id, cls) in _LAYER_SENSORS.items():
            active = manager is not None and manager.provider(layer_id) is not None
            if active and kind not in known:
                entity = cls(entry, hass)
                known[kind] = entity
                new_entities.append(entity)
            elif not active and kind in known:
                entity = known.pop(kind)
                entity_id = registry.async_get_entity_id("sensor", DOMAIN, entity.unique_id)
                if entity_id:
                    registry.async_remove(entity_id)
        if new_entities:
            async_add_entities(new_entities)

    _sync()
    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_LAYERS_CHANGED, _sync))
