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

CONFIDENCE_VALUES = ("verified", "scraped", "inferred")

DATA_STORE = "store"
DATA_TOKEN = "ics_token"
DATA_WS_REGISTERED = "ws_registered"
DATA_VIEW_REGISTERED = "view_registered"

SIGNAL_DATA_CHANGED = "chronotope_data_changed"
SIGNAL_PROFILES_CHANGED = "chronotope_profiles_changed"

EVENT_ADDED = "chronotope_event_added"
EVENT_UPDATED = "chronotope_event_updated"
EVENT_DELETED = "chronotope_event_deleted"
EVENT_PROFILES_CHANGED = "chronotope_profiles_changed"

# Pseudo profile for "all events" calendar/sensor entities.
PROFILE_ALL_ID = "__all__"
PROFILE_ALL_NAME = "Alle Events"
