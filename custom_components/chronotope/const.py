"""Constants for the Chronotope integration."""

DOMAIN = "chronotope"

PANEL_URL_PATH = "chronotope"
PANEL_TITLE = "Chronotope"
PANEL_ICON = "mdi:map-clock"
FRONTEND_SCRIPT_URL = "/chronotope_files/chronotope-panel.js"
FRONTEND_STATIC_PATH = "/chronotope_files"

DB_FILENAME = "chronotope.db"

STORAGE_KEY = "chronotope"
STORAGE_VERSION = 1

ICS_VIEW_URL = "/api/chronotope/calendar.ics"
INGEST_VIEW_URL = "/api/chronotope/events"

CONFIDENCE_VALUES = ("verified", "scraped", "inferred")

DATA_STORE = "store"
DATA_FEEDS = "feeds"
DATA_CARD_REGISTERED = "card_registered"
CARD_SCRIPT_URL = "/chronotope_files/chronotope-card.js"
LAYER_DATA_VIEW_URL = "/api/chronotope/layers/{layer_id}/data"
LAYER_LEGEND_VIEW_URL = "/api/chronotope/layers/{layer_id}/legend"
CACHE_DIRNAME = "chronotope_cache"
FEEDS_STORAGE_KEY = "chronotope_feeds"
FEEDS_STORAGE_VERSION = 1

# Options (entry.options) for the layer feature.
OPTION_LAYERS_ENABLED = "layers_enabled"
OPTION_LAYERS_CENTER_LAT = "layers_center_lat"
OPTION_LAYERS_CENTER_LON = "layers_center_lon"
OPTION_GEOLOC_SOURCES = "geoloc_sources"
DATA_TOKEN = "ics_token"
DATA_WS_REGISTERED = "ws_registered"
DATA_VIEW_REGISTERED = "view_registered"

SIGNAL_DATA_CHANGED = "chronotope_data_changed"
SIGNAL_PROFILES_CHANGED = "chronotope_profiles_changed"
# Layer configuration changed (enabled/params); sensors add/remove entities.
SIGNAL_LAYERS_CHANGED = "chronotope_layers_changed"
# A provider produced new data or a status change; payload: layer_id.
SIGNAL_LAYER_DATA = "chronotope_layer_data"

EVENT_NEARBY = "chronotope_nearby"
EVENT_ADDED = "chronotope_event_added"
EVENT_UPDATED = "chronotope_event_updated"
EVENT_DELETED = "chronotope_event_deleted"
EVENT_PROFILES_CHANGED = "chronotope_profiles_changed"

# Pseudo profile for "all events" calendar/sensor entities.
PROFILE_ALL_ID = "__all__"
PROFILE_ALL_NAME = "All events"
