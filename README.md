# Chronotope

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**A domain-open geo-time event engine for Home Assistant** — grown into a
personal intelligence application. Chronotope collects *events* (anything
with a place, a time span and a category: flea markets, road closures,
meteor showers, concerts, garbage pickups …) from any source, filters them
through your personal profiles and delivers them where you need them: an
interactive map panel, native calendars, sensors, notifications and
calendar subscriptions.

The core is deliberately domain-neutral: the engine does not know or care
*what* an event is. Everything personal — profiles, calendars, digests,
proximity alerts, your visit history — lives on top.

---

## Table of contents

- [Features at a glance](#features-at-a-glance)
- [Installation](#installation)
- [Getting started](#getting-started)
- [The map panel](#the-map-panel)
- [Feeding events in](#feeding-events-in)
- [Filter profiles](#filter-profiles)
- [Calendars, sensors and ICS subscriptions](#calendars-sensors-and-ics-subscriptions)
- [Automations](#automations)
- [Event schema](#event-schema)
- [Fuzzy schedules](#fuzzy-schedules)
- [Services reference](#services-reference)
- [HTTP API](#http-api)
- [WebSocket API](#websocket-api)
- [Bus events](#bus-events)
- [Options](#options)
- [Notes & limitations](#notes--limitations)
- [Development](#development)

---

## Features at a glance

- **SQLite-backed event store** with combinable filters: category, radius
  around a point (Haversine), time-window overlap, weekday/time-of-day
  masks (DST-safe, evaluated in your HA timezone), text search, favorites.
- **Recurring events** via RFC 5545 RRULEs, expanded in local wall-clock
  time; **fuzzy schedules** ("Wednesdays ~twice a month") are first-class.
- **Address geo cache**: once any event taught the engine the coordinates
  of an address, later events at the same address get them for free.
- **Deduplication**: the same event arriving from multiple sources is
  merged instead of duplicated — your favorites survive.
- **Map panel**: Leaflet + OpenStreetMap, marker clustering, GeoJSON lines
  and shapes, HA zones / people / geo_location feeds as toggleable layers,
  full event editor with draw-on-map geometry capture. Light/dark theme
  aware, fully vendored (no CDN). UI in English, German localization
  built in (follows your HA profile language).
- **Native HA integration**: calendar entities and sensors per profile,
  services with response data, bus events for automations.
- **Proximity detection**: fires `chronotope_nearby` when a person is at a
  running event — and builds a visit history (geo diary) from it,
  retroactively fillable from recorder data.
- **geo_location bridge**: earthquake/disaster/GeoJSON feed entities appear
  on the map and can optionally be mirrored as events.
- **Ingest & export**: REST endpoint for scrapers, ICS/GeoJSON/GPX
  importers, experimental LLM extraction from free text, and a
  token-guarded ICS feed any calendar client can subscribe to
  (recurring events exported with TZID + VTIMEZONE).

## Installation

### Via HACS (recommended)

1. In HACS, open **⋮ → Custom repositories**.
2. Add `https://github.com/pajew-ski/ha-chronotope` with type
   **Integration**.
3. Search for **Chronotope** in HACS and download it.
4. Restart Home Assistant.
5. Go to **Settings → Devices & services → Add integration** and pick
   **Chronotope** (single instance, no configuration needed).

### Manual

1. Copy `custom_components/chronotope` into
   `<config>/custom_components/`.
2. Restart Home Assistant and add the integration as above.

After setup you will find:

- a **Chronotope** panel in the sidebar (the map),
- a `calendar.chronotope_alle_events` calendar entity,
- `sensor.chronotope_*` sensors (next event, events today, statistics),
- the `chronotope.*` services in Developer tools → Actions.

## Getting started

1. **Open the panel** from the sidebar. The map centers on your home
   coordinates; your HA zones and people are already visible as layers.
2. **Create your first event**: click **+ New event**, give it a title,
   category (free text — categories emerge from usage), start/end. Type an
   address, or click **Pick point on map** and click the map. Save.
3. **Filter**: use the filter bar — category chips, a radius slider
   (click the map to move the center), a time window with a day-by-day
   slider, weekday chips (all-day or by time of day), text search.
4. **Save a profile**: with filters active, type a name (e.g.
   "Weekend with kids") and press **Save**. A calendar entity and two
   sensors for this profile appear automatically.
5. **Subscribe from a calendar app**: press **Copy ICS subscription URL**
   — with a profile selected the URL references the profile, so the
   subscription follows later edits to the profile.

## The map panel

- **Events** render as clustered circle markers; events with a `geometry`
  field (GeoJSON) render as lines/polygons. Fuzzy-schedule events are
  dashed and show their schedule wording instead of fabricated dates.
- **Layers** (toggleable in the filter bar): HA zones incl. home,
  people (live positions with their profile picture), and
  `geo_location.*` feed entities (diamond markers with source and
  distance). Note: HA *areas* have no coordinates in Home Assistant, so
  they cannot be drawn — zones are the geo-capable concept.
- **Result list**: sorted by distance when a radius center is set,
  otherwise by start time. Each entry offers favorite, edit and hide
  buttons, the source link, a "visited" badge fed by the visit
  history, and the next matched occurrence for recurring events.
- **Editor**: create/edit/delete events, capture a point by clicking the
  map, or record lines/areas click by click with a live preview. Popups
  include an OSM directions link.

## Feeding events in

**REST ingest** (for scrapers, cron jobs, n8n, cloud functions):

```sh
curl -X POST "http://homeassistant.local:8123/api/chronotope/events" \
  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  -d '[{
    "title": "Flea market Boxhagener Platz",
    "category": "market",
    "address": "Boxhagener Platz, 10245 Berlin",
    "start_time": "2026-07-12T10:00:00+02:00",
    "end_time": "2026-07-12T16:00:00+02:00",
    "recurrence": "FREQ=WEEKLY;BYDAY=SU",
    "source_name": "example.org",
    "confidence": "scraped"
  }]'
```

Accepts a single object, a bare list, or `{"events": [...]}`.
Deduplication is on by default (`?dedupe=0` to disable). The token is the
same secret used by the ICS feed — grab a URL containing it via the ICS
button in the panel. Geocoding stays the source's job, but thanks to the
address cache each address only ever needs to be resolved once.

**Other ways in:**

- `chronotope.add_event` service (automations, scripts, Node-RED)
- `chronotope.import_ics` / `import_geojson` / `import_gpx` — from a URL,
  a file relative to the config directory, or inline data
- `chronotope.extract_event` (experimental) — hand free text like
  *"flea market at Boxhagener Platz, every Sunday 10-16h"* to a
  conversation agent and get a structured event back
- the panel's event editor
- the `geo_location` bridge (see [Options](#options))

## Filter profiles

A profile is a named filter set stored in the engine. Profiles power:

| Consumer | What it does |
|---|---|
| Panel | select a profile to apply its filters |
| `calendar.chronotope_<profile>` | native calendar with only matching events |
| `sensor.chronotope_<profile>_*` | next-event timestamp + today count |
| `chronotope.digest` | "this week nearby" text for notifications |
| ICS feed | `…calendar.ics?token=…&profile=<id-or-name>` |
| `chronotope.query` | `profile:` shorthand instead of repeating filters |

Create/update/delete profiles in the panel or via the WebSocket API.

## Calendars, sensors and ICS subscriptions

- **Calendars**: every profile (plus "Alle Events" for everything) is a
  real HA calendar entity — usable in the calendar dashboard, calendar
  triggers and the companion app. Occurrences of recurring events appear
  as concrete entries; fuzzy events are prefixed with `~`.
- **Sensors**: per profile a `next event` timestamp sensor (with title,
  category, address, coordinates as attributes) and an `events today`
  count; plus one global statistics sensor whose attributes include
  per-source health (event count, last scrape) — ideal for alerting when
  a scraper goes quiet.
- **ICS feed**: `GET /api/chronotope/calendar.ics?token=<secret>` serves
  RFC 5545 iCalendar for any calendar client (Thunderbird, CalDAV apps,
  HA Remote Calendar). One-off events are exported in UTC; recurring
  events use `DTSTART;TZID=<your-tz>` plus a generated `VTIMEZONE`, so
  weekly 18:00 stays 18:00 across DST changes. All query filters work as
  URL parameters (`category`, `lat/lon/radius`, `start/end`, `weekday`,
  `time_from/time_to`, `text`, `favorites`) — or just `profile=`.

## Automations

**Morning digest to your phone:**

```yaml
automation:
  - alias: Chronotope weekend digest
    triggers:
      - trigger: time
        at: "08:00:00"
    conditions:
      - condition: time
        weekday: [sat]
    actions:
      - action: chronotope.digest
        data:
          profile: "Weekend with kids"
          days: 2
          notify_service: notify.mobile_app_iphone
          check_calendars: [calendar.family]
```

**"You are standing next to an event":**

```yaml
automation:
  - alias: Chronotope nearby
    triggers:
      - trigger: event
        event_type: chronotope_nearby
    actions:
      - action: notify.mobile_app_iphone
        data:
          title: "Nearby: {{ trigger.event.data.events[0].title }}"
          message: >-
            {{ trigger.event.data.events[0].category }} –
            {{ trigger.event.data.events[0].address or "see map" }}
```

**One-shot after installation — fill the visit history retroactively**
(Developer tools → Actions; reaches back as far as your recorder
retention, default 10 days):

```yaml
action: chronotope.match_visits
data:
  days: 10
  radius_km: 0.5
```

**Nightly cleanup of stale scraped events:**

```yaml
automation:
  - alias: Chronotope purge
    triggers:
      - trigger: time
        at: "03:30:00"
    actions:
      - action: chronotope.purge
        data:
          older_than_days: 60
```

## Event schema

| Field | Type | Notes |
|---|---|---|
| `id` | string | primary key; UUID generated when omitted |
| `title` | string | **required** |
| `category` | string | free text; categories emerge from usage |
| `lat`, `lon` | float | canonical point for radius filter & distance |
| `start_time` | string | **required**, ISO 8601 with offset; stored as UTC |
| `end_time` | string | **required**, ISO 8601 with offset |
| `recurrence` | string | RFC 5545 RRULE; BYHOUR/BYDAY mean local time |
| `source_url` | string | link to the origin |
| `source_name` | string | feeds per-source health stats |
| `confidence` | string | `verified` \| `scraped` \| `inferred` |
| `scraped_at` | string | ISO 8601 |
| `raw_description` | string | free text |
| `geometry` | string | optional GeoJSON (lines/shapes for the map) |
| `address` | string | optional; feeds/uses the address geo cache |
| `time_precision` | string | `exact` (default) \| `approximate` |
| `schedule_text` | string | original schedule wording for display |
| `favorite`, `hidden` | bool | user flags; survive re-saves and dedupe |

## Fuzzy schedules

Real-world sources say things like *"Wednesdays at 6 pm, roughly twice a
month"* or *"every Tue and Thu at 6 or 8 pm"*. Chronotope handles these
with the machinery it already has:

1. Store a **best-effort RRULE** — `FREQ=WEEKLY;BYDAY=WE` for the first,
   `FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20` for the second (yes, alternative
   times fit in one rule). Recall beats precision: better to show a
   possible event than to miss it.
2. Set `time_precision: approximate` and put the original wording into
   `schedule_text`.

Filters and the map work unchanged; the UI, calendars and ICS export mark
the event as fuzzy (`~`, dashed markers, wording instead of fabricated
dates, `X-CHRONOTOPE-TIME-PRECISION` in ICS).

## Services reference

All services return response data where noted.

| Service | Purpose |
|---|---|
| `chronotope.add_event` | create/update an event (optional `dedupe`) |
| `chronotope.delete_event` | delete by id |
| `chronotope.query` | query with filters or `profile:` (response) |
| `chronotope.lookup_place` | address → cached coordinates (response) |
| `chronotope.digest` | text digest, optional notify + free/busy check |
| `chronotope.import_ics` | import an iCalendar feed (url/path/data) |
| `chronotope.import_geojson` | import GeoJSON features as events |
| `chronotope.import_gpx` | import GPX tracks as line events |
| `chronotope.match_visits` | retroactive visit matching from recorder |
| `chronotope.purge` | delete events older than N days |
| `chronotope.backup` | consistent SQLite backup (response: path) |
| `chronotope.extract_event` | LLM extraction from free text (experimental) |

## HTTP API

Both endpoints are unauthenticated but guarded by a per-install secret
token (generated at setup, stored in `.storage/chronotope`), accepted as
`?token=` or `Authorization: Bearer`:

| Endpoint | Purpose |
|---|---|
| `GET /api/chronotope/calendar.ics` | filtered ICS feed (see above) |
| `POST /api/chronotope/events` | scraper ingest (single/list/`{"events"}`) |

## WebSocket API

For custom frontends and advanced tooling:
`chronotope/events/save|delete|flag|query`, `chronotope/categories`,
`chronotope/stats`, `chronotope/profiles/save|delete|list`,
`chronotope/ics_url`, `chronotope/places/lookup`. Example query payload:

```js
{ "type": "chronotope/events/query",
  "categories": ["market"], "text": "flea",
  "center": {"lat": 52.52, "lon": 13.405}, "radius_km": 5,
  "start": "2026-07-11T00:00:00+02:00", "end": "2026-07-18T00:00:00+02:00",
  "weekdays": [5, 6], "time_from": "10:00", "time_to": "18:00",
  "favorites_only": false }
```

Responses include `distance_km` (when a center is set), `occurrences`
(matched instances of recurring events, UTC) and `visits`.

## Bus events

| Event | Fired when |
|---|---|
| `chronotope_event_added` / `_updated` / `_deleted` | any write path |
| `chronotope_profiles_changed` | profile created/renamed/deleted |
| `chronotope_nearby` | a person is within the radius of a running event (payload: person, radius, matched events) |

## Options

**Settings → Devices & services → Chronotope → Configure:**

| Option | Default | Effect |
|---|---|---|
| Proximity detection | on | `chronotope_nearby` events + visit history |
| Proximity radius (km) | 0.5 | match distance for running events |
| Mirror geo_location entities | off | earthquake/disaster/GeoJSON feed entities become events (`geoloc:<entity_id>`, category `geo:<source>`, rolling end while the feed entity exists) |

## Notes & limitations

- **HA areas** have no coordinates — zones, people and geo_location
  entities are what can be drawn on a map.
- **`match_visits`** only reaches as far back as your recorder retention
  (`purge_keep_days`, default 10 days). Live tracking covers everything
  from installation onward.
- **VTIMEZONE** transitions are computed with hour precision — exact for
  European/US zones; half-hour DST zones (e.g. Lord Howe) may be off by
  up to an hour at the transition moment.
- **Dedupe rule**: same title (case-insensitive) + same recurrence +
  start within 12 h (one-off events) + same place (same normalized
  address, else within 300 m, else both location-less).
- **Token security**: anyone with the token can read the ICS feed and
  push events. Treat the URL like a password; it is not your HA login.
- The panel UI is English by default and switches to German automatically
  when your HA profile language is German.
- No external requests from the core: the frontend loads only OSM tiles;
  geocoding is the data source's job (the address cache keeps it to once
  per address); backend fetches happen only for user-initiated imports.

## Development

```sh
cd frontend && npm ci && npm run build   # panel bundle (vendored/committed)
python3 -m unittest discover -s tests    # HA-free tests (store, ICS, importers)
```

Architecture details live in [CLAUDE.md](CLAUDE.md) (German — it is the
internal engineering doc of this repository).

## License

[MIT](LICENSE) — use it, fork it, build on it.
