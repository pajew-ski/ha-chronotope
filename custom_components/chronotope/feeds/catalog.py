"""Built-in layer catalog (spec section 5.1) and generic-layer presets.

Pure data, free of Home Assistant imports so the frontend contract and the
tests can read it without HA. ``params_schema`` is a plain, JSON-serializable
description (the WebSocket layer validates against it) instead of a
voluptuous schema, which keeps this module importable standalone.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any

KLASS_TRACKS = "tracks"
KLASS_EVENTS = "events"
KLASS_FEATURES = "features"
KLASS_RASTER = "raster"
KLASS_GRID = "grid"

USER_AGENT = "ha-chronotope/{version} (+https://github.com/pajew-ski/ha-chronotope)"

# Option keys (entry.options) holding API keys; values never leave the server.
KEY_OPTIONS = {
    "aisstream": "api_key_aisstream",
    "firms": "api_key_firms",
    "gfw": "api_key_gfw",
    "ucdp": "api_key_ucdp",
    "opensky": "api_key_opensky",  # "client_id:client_secret"
    "ll2": "api_key_ll2",
}


@dataclass(frozen=True)
class LicenseInfo:
    id: str
    url: str | None = None
    noncommercial: bool = False
    notes: str | None = None


@dataclass(frozen=True)
class Budget:
    max_bytes: int = 5_000_000
    max_features: int = 5_000
    max_calls_per_hour: int = 60


@dataclass(frozen=True)
class LayerSpec:
    id: str
    provider: str
    klass: str
    title_key: str
    attribution: tuple[str, str]
    license: LicenseInfo
    default_enabled: bool = False
    min_interval_s: int = 60
    default_interval_s: int = 60
    params_schema: dict[str, Any] = field(default_factory=dict)
    requires_key: str | None = None
    budget: Budget = field(default_factory=Budget)
    retention_days: float | None = None
    style: dict[str, Any] = field(default_factory=dict)
    milestone: str = "M1"
    # The panel fetches bbox-limited data for these (server filters).
    bbox_filtered: bool = False
    # Built-in raster layers are rendered directly by the browser (I10).
    raster: dict[str, Any] | None = None
    notes: str | None = None

    def to_dict(self, key_set: bool | None = None) -> dict[str, Any]:
        data = asdict(self)
        data["attribution"] = {"text": self.attribution[0], "url": self.attribution[1]}
        data["license"] = asdict(self.license)
        data["budget"] = asdict(self.budget)
        if key_set is not None:
            data["key_set"] = key_set
        return data


def _radius_params(default_nm: int = 100, max_nm: int = 250) -> dict[str, Any]:
    return {
        "radius_nm": {"type": "number", "min": 5, "max": max_nm, "default": default_nm},
        "center": {"type": "latlon", "default": None},
    }


_ODBL = LicenseInfo("ODbL-1.0", "https://opendatacommons.org/licenses/odbl/1-0/")
_US_GOV = LicenseInfo("US-PD", "https://www.usa.gov/government-works")
_NASA = LicenseInfo("NASA-PD", "https://www.nasa.gov/nasa-brand-center/images-and-media/")

CATALOG: dict[str, LayerSpec] = {}


def _add(spec: LayerSpec) -> None:
    CATALOG[spec.id] = spec


# ---------------------------------------------------------------- tracks (8.1)

_add(
    LayerSpec(
        id="flights_regional",
        provider="adsb_lol",
        klass=KLASS_TRACKS,
        title_key="layer.flights_regional",
        min_interval_s=10,
        default_interval_s=15,
        params_schema=_radius_params(),
        attribution=("adsb.lol contributors (ODbL 1.0)", "https://adsb.lol"),
        license=_ODBL,
        budget=Budget(max_bytes=5_000_000, max_features=5_000, max_calls_per_hour=400),
        style={"icon": "aircraft", "rotate_by": "track", "color": "#42a5f5"},
        notes="Falls back to OpenSky while adsb.lol is blocked or erroring.",
    )
)
_add(
    LayerSpec(
        id="flights_military",
        provider="adsb_lol",
        klass=KLASS_TRACKS,
        title_key="layer.flights_military",
        min_interval_s=30,
        default_interval_s=60,
        params_schema={"mode": {"type": "const", "default": "mil"}},
        attribution=("adsb.lol contributors (ODbL 1.0)", "https://adsb.lol"),
        license=_ODBL,
        budget=Budget(max_bytes=5_000_000, max_features=5_000, max_calls_per_hour=120),
        style={"icon": "aircraft", "rotate_by": "track", "color": "#8d6e63"},
    )
)
_add(
    LayerSpec(
        id="flights_opensky",
        provider="opensky",
        klass=KLASS_TRACKS,
        title_key="layer.flights_opensky",
        min_interval_s=60,
        default_interval_s=60,
        params_schema=_radius_params(default_nm=100, max_nm=250),
        attribution=(
            "The OpenSky Network (non-commercial; Schäfer et al. 2014)",
            "https://opensky-network.org",
        ),
        license=LicenseInfo(
            "OpenSky-NC",
            "https://opensky-network.org/about/terms-of-use",
            noncommercial=True,
            notes="Operational use may require an agreement with OpenSky.",
        ),
        budget=Budget(max_bytes=5_000_000, max_features=5_000, max_calls_per_hour=60),
        style={"icon": "aircraft", "rotate_by": "track", "color": "#7e57c2"},
        notes="Fallback source only; never polled alongside flights_regional.",
    )
)

_SAT_GROUPS = {
    "stations": ("layer.satellites_stations", "#ffb300", True),
    "visual": ("layer.satellites_visual", "#26a69a", True),
    "starlink": ("layer.satellites_starlink", "#90a4ae", False),
    "gps-ops": ("layer.satellites_gps", "#5c6bc0", False),
    "weather": ("layer.satellites_weather", "#29b6f6", False),
    "active": ("layer.satellites_active", "#ef5350", False),
}
for _group, (_title, _color, _default) in _SAT_GROUPS.items():
    _add(
        LayerSpec(
            id=f"satellites_{_group.replace('-', '_')}",
            provider="celestrak",
            klass=KLASS_TRACKS,
            title_key=_title,
            min_interval_s=2 * 3600,
            default_interval_s=2 * 3600,
            params_schema={"group": {"type": "const", "default": _group}},
            attribution=("CelesTrak, T.S. Kelso", "https://celestrak.org"),
            license=_US_GOV,
            budget=Budget(max_bytes=8_000_000, max_features=3000, max_calls_per_hour=2),
            style={"icon": "satellite", "color": _color, "propagate": "browser"},
            notes="Group 'active' exceeds the 3000-object budget and is truncated."
            if _group == "active"
            else None,
        )
    )

_add(
    LayerSpec(
        id="vessels",
        provider="aisstream",
        klass=KLASS_TRACKS,
        title_key="layer.vessels",
        min_interval_s=10,
        default_interval_s=10,
        params_schema=_radius_params(default_nm=50, max_nm=250),
        requires_key="aisstream",
        attribution=("AISStream.io", "https://aisstream.io"),
        license=LicenseInfo("AISStream", "https://aisstream.io", notes="Beta, no formal terms."),
        budget=Budget(max_bytes=2_000_000, max_features=2000, max_calls_per_hour=10),
        style={"icon": "vessel", "rotate_by": "track", "color": "#26c6da"},
        milestone="M3",
    )
)

# ---------------------------------------------------------------- events (8.2)

_add(
    LayerSpec(
        id="earthquakes",
        provider="usgs",
        klass=KLASS_EVENTS,
        title_key="layer.earthquakes",
        min_interval_s=300,
        default_interval_s=300,
        params_schema={
            "magnitude": {"type": "enum", "values": ["significant", "4.5", "2.5", "all"], "default": "2.5"},
            "period": {"type": "enum", "values": ["hour", "day", "week"], "default": "day"},
        },
        attribution=("Data courtesy of the U.S. Geological Survey", "https://earthquake.usgs.gov"),
        license=_US_GOV,
        budget=Budget(max_bytes=10_000_000, max_features=10_000, max_calls_per_hour=12),
        retention_days=7,
        style={"category": "earthquake", "color": "#ef5350"},
    )
)
_add(
    LayerSpec(
        id="launches",
        provider="ll2",
        klass=KLASS_EVENTS,
        title_key="layer.launches",
        min_interval_s=900,
        default_interval_s=1800,
        attribution=("The Space Devs, Launch Library 2", "https://thespacedevs.com"),
        license=LicenseInfo("LL2", "https://ll.thespacedevs.com/docs/", notes="Free use, 15 calls/h anonymous."),
        budget=Budget(max_bytes=5_000_000, max_features=500, max_calls_per_hour=4),
        retention_days=30,
        style={"category": "launch", "color": "#ffa726"},
        requires_key=None,
    )
)
_add(
    LayerSpec(
        id="natural_events",
        provider="eonet",
        klass=KLASS_EVENTS,
        title_key="layer.natural_events",
        min_interval_s=1800,
        default_interval_s=1800,
        attribution=("NASA EONET", "https://eonet.gsfc.nasa.gov"),
        license=_NASA,
        budget=Budget(max_bytes=10_000_000, max_features=2000, max_calls_per_hour=2),
        retention_days=7,
        style={"category": "natural", "color": "#ab47bc"},
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="conflicts",
        provider="ucdp",
        klass=KLASS_EVENTS,
        title_key="layer.conflicts",
        min_interval_s=6 * 3600,
        default_interval_s=24 * 3600,
        attribution=("Uppsala Conflict Data Program, UCDP Candidate", "https://ucdp.uu.se"),
        license=LicenseInfo("CC-BY-4.0", "https://creativecommons.org/licenses/by/4.0/", notes="Cite per UCDP codebook."),
        budget=Budget(max_bytes=60_000_000, max_features=20_000, max_calls_per_hour=1),
        retention_days=90,
        style={"category": "conflict", "color": "#d32f2f"},
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="conflicts_api",
        provider="ucdp_api",
        klass=KLASS_EVENTS,
        title_key="layer.conflicts_api",
        min_interval_s=6 * 3600,
        default_interval_s=24 * 3600,
        requires_key="ucdp",
        attribution=("Uppsala Conflict Data Program", "https://ucdp.uu.se"),
        license=LicenseInfo("CC-BY-4.0", "https://creativecommons.org/licenses/by/4.0/"),
        budget=Budget(max_bytes=30_000_000, max_features=20_000, max_calls_per_hour=1),
        retention_days=90,
        style={"category": "conflict", "color": "#d32f2f"},
        milestone="M3",
    )
)
_add(
    LayerSpec(
        id="fires",
        provider="firms",
        klass=KLASS_EVENTS,
        title_key="layer.fires",
        min_interval_s=1800,
        default_interval_s=1800,
        params_schema={"bbox": {"type": "bbox", "default": None}},
        requires_key="firms",
        attribution=("NASA FIRMS (VIIRS NRT)", "https://firms.modaps.eosdis.nasa.gov"),
        license=_NASA,
        budget=Budget(max_bytes=20_000_000, max_features=20_000, max_calls_per_hour=2),
        retention_days=2,
        style={"category": "fire", "color": "#ff7043"},
        milestone="M3",
    )
)
_add(
    LayerSpec(
        id="fishing",
        provider="gfw",
        klass=KLASS_EVENTS,
        title_key="layer.fishing",
        min_interval_s=6 * 3600,
        default_interval_s=6 * 3600,
        params_schema={"bbox": {"type": "bbox", "default": None}},
        requires_key="gfw",
        attribution=("Global Fishing Watch", "https://globalfishingwatch.org"),
        license=LicenseInfo("GFW-ToU", "https://globalfishingwatch.org/our-apis/documentation#terms-of-use"),
        budget=Budget(max_bytes=20_000_000, max_features=10_000, max_calls_per_hour=1),
        retention_days=30,
        style={"category": "fishing", "color": "#00acc1"},
        milestone="M3",
    )
)

# -------------------------------------------------------------- features (8.3)

_OSM = ("© OpenStreetMap contributors (ODbL), via Overpass API", "https://www.openstreetmap.org/copyright")
_add(
    LayerSpec(
        id="datacenters",
        provider="overpass",
        klass=KLASS_FEATURES,
        title_key="layer.datacenters",
        min_interval_s=60,
        default_interval_s=7 * 24 * 3600,
        params_schema={"kind": {"type": "const", "default": "datacenters"}},
        attribution=_OSM,
        license=_ODBL,
        budget=Budget(max_bytes=10_000_000, max_features=20_000, max_calls_per_hour=60),
        style={"icon": "datacenter", "color": "#5c6bc0"},
        bbox_filtered=True,
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="dams",
        provider="overpass",
        klass=KLASS_FEATURES,
        title_key="layer.dams",
        min_interval_s=60,
        default_interval_s=7 * 24 * 3600,
        params_schema={"kind": {"type": "const", "default": "dams"}},
        attribution=_OSM,
        license=_ODBL,
        budget=Budget(max_bytes=10_000_000, max_features=20_000, max_calls_per_hour=60),
        style={"icon": "dam", "color": "#26a69a"},
        bbox_filtered=True,
        milestone="M2",
    )
)
_NE_LICENSE = LicenseInfo("PD", "https://www.naturalearthdata.com/about/terms-of-use/", notes="Made with Natural Earth.")
_add(
    LayerSpec(
        id="regions",
        provider="natural_earth",
        klass=KLASS_FEATURES,
        title_key="layer.regions",
        min_interval_s=24 * 3600,
        default_interval_s=365 * 24 * 3600,
        params_schema={"dataset": {"type": "const", "default": "ne_50m_geography_regions_polys"}},
        attribution=("Made with Natural Earth", "https://www.naturalearthdata.com"),
        license=_NE_LICENSE,
        budget=Budget(max_bytes=60_000_000, max_features=10_000, max_calls_per_hour=1),
        style={"fill": "#7986cb", "kind": "region"},
        bbox_filtered=True,
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="countries",
        provider="natural_earth",
        klass=KLASS_FEATURES,
        title_key="layer.countries",
        min_interval_s=24 * 3600,
        default_interval_s=365 * 24 * 3600,
        params_schema={"dataset": {"type": "const", "default": "ne_110m_admin_0_countries"}},
        attribution=("Made with Natural Earth", "https://www.naturalearthdata.com"),
        license=_NE_LICENSE,
        budget=Budget(max_bytes=20_000_000, max_features=1000, max_calls_per_hour=1),
        style={"fill": "#90a4ae", "kind": "country"},
        milestone="M3",
    )
)
_add(
    LayerSpec(
        id="submarine_cables",
        provider="telegeography",
        klass=KLASS_FEATURES,
        title_key="layer.submarine_cables",
        min_interval_s=24 * 3600,
        default_interval_s=30 * 24 * 3600,
        attribution=("TeleGeography Submarine Cable Map (CC BY-NC-SA 3.0)", "https://www.submarinecablemap.com"),
        license=LicenseInfo(
            "CC-BY-NC-SA-3.0",
            "https://creativecommons.org/licenses/by-nc-sa/3.0/",
            noncommercial=True,
            notes="Non-commercial use only; fetched at runtime, never redistributed.",
        ),
        budget=Budget(max_bytes=30_000_000, max_features=5000, max_calls_per_hour=1),
        style={"color": "#ec407a", "kind": "cable"},
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="tor_relays",
        provider="onionoo",
        klass=KLASS_FEATURES,
        title_key="layer.tor_relays",
        min_interval_s=3600,
        default_interval_s=3600,
        attribution=("Tor Project, Onionoo (Tor Metrics)", "https://metrics.torproject.org/onionoo.html"),
        license=LicenseInfo("CC0-1.0", "https://creativecommons.org/publicdomain/zero/1.0/", notes="Tor Metrics data license; verify (open point 9)."),
        budget=Budget(max_bytes=30_000_000, max_features=1000, max_calls_per_hour=2),
        style={"kind": "choropleth", "palette": "purples"},
        milestone="M2",
        notes="Onionoo 8.0 no longer publishes relay coordinates (measured 2026-09-17): relays per country.",
    )
)
_add(
    LayerSpec(
        id="radio_stations",
        provider="radio_browser",
        klass=KLASS_FEATURES,
        title_key="layer.radio_stations",
        min_interval_s=6 * 3600,
        default_interval_s=24 * 3600,
        attribution=("Community Radio Browser (PDDL)", "https://www.radio-browser.info"),
        license=LicenseInfo("PDDL-1.0", "https://opendatacommons.org/licenses/pddl/1-0/"),
        budget=Budget(max_bytes=60_000_000, max_features=50_000, max_calls_per_hour=2),
        style={"icon": "radio", "color": "#ffca28"},
        bbox_filtered=True,
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="refugees",
        provider="unhcr",
        klass=KLASS_FEATURES,
        title_key="layer.refugees",
        min_interval_s=24 * 3600,
        default_interval_s=30 * 24 * 3600,
        params_schema={
            "mode": {"type": "enum", "values": ["asylum", "origin"], "default": "asylum"},
            "year": {"type": "number", "min": 2000, "max": 2100, "default": None},
        },
        attribution=("UNHCR Refugee Data Finder", "https://www.unhcr.org/refugee-statistics/"),
        license=LicenseInfo("UNHCR-ToU", "https://www.unhcr.org/terms-and-conditions-use-unhcr-websites", notes="Verify (open point 4)."),
        budget=Budget(max_bytes=20_000_000, max_features=1000, max_calls_per_hour=1),
        style={"kind": "choropleth", "palette": "blues"},
        milestone="M3",
        notes="Choropleth over the countries layer (Natural Earth 110m).",
    )
)
_add(
    LayerSpec(
        id="internet_outages",
        provider="ioda",
        klass=KLASS_FEATURES,
        title_key="layer.internet_outages",
        min_interval_s=900,
        default_interval_s=900,
        attribution=("IODA, Georgia Tech Internet Intelligence Lab", "https://ioda.inetintel.cc.gatech.edu"),
        license=LicenseInfo("IODA-ToU", "https://ioda.inetintel.cc.gatech.edu/", notes="Verify (open point 4)."),
        budget=Budget(max_bytes=10_000_000, max_features=1000, max_calls_per_hour=4),
        style={"kind": "choropleth", "palette": "reds"},
        milestone="M3",
        notes="Choropleth over the countries layer (Natural Earth 110m).",
    )
)

# ------------------------------------------------------------ grid (8.4)

_add(
    LayerSpec(
        id="aurora",
        provider="swpc",
        klass=KLASS_GRID,
        title_key="layer.aurora",
        min_interval_s=300,
        default_interval_s=600,
        attribution=("NOAA SWPC OVATION", "https://www.swpc.noaa.gov/products/aurora-30-minute-forecast"),
        license=_US_GOV,
        budget=Budget(max_bytes=5_000_000, max_features=70_000, max_calls_per_hour=12),
        style={"threshold": 5, "palette": "aurora"},
        milestone="M2",
        notes="Also feeds sensor.chronotope_kp_index (15 min) while active.",
    )
)

# ------------------------------------------------------- built-in raster (8.4)

_DWD = ("© Deutscher Wetterdienst (GeoNutzV)", "https://www.dwd.de/DE/service/copyright/copyright_node.html")
_add(
    LayerSpec(
        id="dwd_radar",
        provider="wms",
        klass=KLASS_RASTER,
        title_key="layer.dwd_radar",
        attribution=_DWD,
        license=LicenseInfo("GeoNutzV", "https://www.dwd.de/DE/service/copyright/copyright_node.html"),
        raster={
            "type": "wms",
            "url": "https://maps.dwd.de/geoserver/dwd/wms",
            "params": {"layers": "dwd:Niederschlagsradar", "format": "image/png", "transparent": True},
            "opacity": 0.7,
        },
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="dwd_warnings",
        provider="wms",
        klass=KLASS_RASTER,
        title_key="layer.dwd_warnings",
        attribution=_DWD,
        license=LicenseInfo("GeoNutzV", "https://www.dwd.de/DE/service/copyright/copyright_node.html"),
        raster={
            "type": "wms",
            "url": "https://maps.dwd.de/geoserver/dwd/wms",
            "params": {"layers": "dwd:Warnungen_Gemeinden_vereinigt", "format": "image/png", "transparent": True},
            "opacity": 0.6,
        },
        milestone="M2",
    )
)
_add(
    LayerSpec(
        id="night_lights",
        provider="wmts",
        klass=KLASS_RASTER,
        title_key="layer.night_lights",
        attribution=("NASA GIBS / Black Marble", "https://earthdata.nasa.gov/gibs"),
        license=_NASA,
        raster={
            "type": "xyz",
            # GIBS publishes Black Marble only for 2012-01-01 and 2016-01-01
            # (measured 2026-09-17); the date is therefore fixed.
            "url": "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/2016-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png",
            "max_zoom": 8,
            "opacity": 0.8,
        },
        milestone="M2",
        notes="Night-time lights (2016 composite), not sky brightness.",
    )
)
_add(
    LayerSpec(
        id="thermal_anomalies",
        provider="wms",
        klass=KLASS_RASTER,
        title_key="layer.thermal_anomalies",
        attribution=("NASA GIBS, FIRMS VIIRS Thermal Anomalies", "https://earthdata.nasa.gov/gibs"),
        license=_NASA,
        raster={
            "type": "wms",
            "url": "https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi",
            # NOAA-21 has no gaps; SNPP is missing 2026-07-11 to 2026-07-15.
            "params": {"layers": "VIIRS_NOAA21_Thermal_Anomalies_375m_All", "format": "image/png", "transparent": True},
            "time": "today",
            "opacity": 0.9,
        },
        milestone="M2",
    )
)

# ---------------------------------------------------------- base maps (7.6)

BASEMAPS: dict[str, dict[str, Any]] = {
    "osm": {
        "type": "xyz",
        "url": "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        "max_zoom": 19,
        "attribution": {"text": "© OpenStreetMap contributors", "url": "https://www.openstreetmap.org/copyright"},
        "invert_dark": True,
    },
    "topplus": {
        "type": "wms",
        "url": "https://sgx.geodatenzentrum.de/wms_topplus_open",
        "params": {"layers": "web", "format": "image/png"},
        "max_zoom": 18,
        "attribution": {"text": "© GeoBasis-DE / BKG (dl-de/by-2-0)", "url": "https://www.bkg.bund.de"},
        "invert_dark": True,
    },
    "esri_imagery": {
        "type": "xyz",
        "url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        "max_zoom": 19,
        "attribution": {
            "text": "Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community",
            "url": "https://www.esri.com/en-us/legal/terms/full-master-agreement",
        },
        "invert_dark": False,
    },
}

# -------------------------------------------------------------- presets (8.4)

PRESETS: list[dict[str, Any]] = [
    {
        "preset_id": "dwd_wind",
        "provider": "wms",
        "title": "DWD wind (WMS)",
        "url": "https://maps.dwd.de/geoserver/dwd/wms",
        "params": {"layers": "dwd:icon_reg025_fd_sl_uv10m_wmc_windbarbs", "format": "image/png", "transparent": True},
        "attribution": {"text": "© Deutscher Wetterdienst", "url": "https://www.dwd.de"},
        "license_note": "GeoNutzV. ICON 10 m wind barbs (verified 2026-09-17).",
        "opacity": 0.6,
    },
    {
        "preset_id": "gibs_true_color",
        "provider": "xyz",
        "title": "NASA GIBS true color (today)",
        "url": "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/{Time}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg",
        "params": {"time": "today"},
        "attribution": {"text": "NASA GIBS", "url": "https://earthdata.nasa.gov/gibs"},
        "license_note": "NASA, public domain.",
        "opacity": 1.0,
        "max_zoom": 9,
    },
    {
        "preset_id": "custom_rainviewer",
        "provider": "xyz",
        "title": "RainViewer radar (bring your own URL)",
        "url": "https://tilecache.rainviewer.com/v2/radar/nowcast/256/{z}/{x}/{y}/2/1_1.png",
        "params": {},
        "attribution": {"text": "RainViewer", "url": "https://www.rainviewer.com"},
        "license_note": "Free tier restricted since 2026; check terms before use.",
        "opacity": 0.7,
    },
]

GENERIC_PROVIDERS = ("xyz", "wmts", "wms", "geojson_url")


def catalog_payload(keys_set: dict[str, bool]) -> dict[str, Any]:
    """Serializable catalog for the WebSocket API (never key values)."""
    return {
        "layers": [
            spec.to_dict(key_set=(keys_set.get(spec.requires_key, False) if spec.requires_key else None))
            for spec in CATALOG.values()
        ],
        "presets": PRESETS,
        "basemaps": BASEMAPS,
        "generic_providers": list(GENERIC_PROVIDERS),
    }


def validate_params(spec: LayerSpec, params: dict[str, Any]) -> dict[str, Any]:
    """Check user params against the spec's plain schema; returns cleaned."""
    cleaned: dict[str, Any] = {}
    for name, rule in spec.params_schema.items():
        value = params.get(name, rule.get("default"))
        kind = rule.get("type")
        if kind == "const":
            cleaned[name] = rule.get("default")
            continue
        if value is None:
            cleaned[name] = None
            continue
        if kind == "number":
            try:
                number = float(value)
            except (TypeError, ValueError) as err:
                raise ValueError(f"{name} must be a number") from err
            if "min" in rule and number < rule["min"]:
                raise ValueError(f"{name} must be at least {rule['min']}")
            if "max" in rule and number > rule["max"]:
                raise ValueError(f"{name} must be at most {rule['max']}")
            cleaned[name] = number
        elif kind == "enum":
            if str(value) not in rule["values"]:
                raise ValueError(f"{name} must be one of {rule['values']}")
            cleaned[name] = str(value)
        elif kind == "latlon":
            try:
                lat, lon = float(value["lat"]), float(value["lon"])
            except (TypeError, ValueError, KeyError) as err:
                raise ValueError(f"{name} must be {{lat, lon}}") from err
            if not (-90 <= lat <= 90 and -180 <= lon <= 180):
                raise ValueError(f"{name} out of range")
            cleaned[name] = {"lat": lat, "lon": lon}
        elif kind == "bbox":
            try:
                bbox = [float(v) for v in value]
            except (TypeError, ValueError) as err:
                raise ValueError(f"{name} must be [minLon, minLat, maxLon, maxLat]") from err
            if len(bbox) != 4 or bbox[0] >= bbox[2] or bbox[1] >= bbox[3]:
                raise ValueError(f"{name} must be [minLon, minLat, maxLon, maxLat]")
            cleaned[name] = bbox
        else:
            cleaned[name] = value
    return cleaned
