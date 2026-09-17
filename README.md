# Chronotope

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**A domain-open geo-time event engine for Home Assistant** - grown into a
personal intelligence application. Chronotope collects *events* (anything
with a place, a time span and a category: flea markets, road closures,
meteor showers, concerts, garbage pickups …) from any source, filters them
through your personal profiles and delivers them where you need them: an
interactive map panel, native calendars, sensors, notifications and
calendar subscriptions.

The core is deliberately domain-neutral: the engine does not know or care
*what* an event is. Everything personal - profiles, calendars, digests,
proximity alerts, your visit history - lives on top.

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
- [Layers & data sources](#layers--data-sources)
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
  merged instead of duplicated - your favorites survive.
- **Map panel**: Leaflet + OpenStreetMap, marker clustering, GeoJSON lines
  and shapes, HA zones / people / geo_location feeds as toggleable layers,
  full event editor with draw-on-map geometry capture. Light/dark theme
  aware, fully vendored (no CDN). UI in English, German localization
  built in (follows your HA profile language).
- **Native HA integration**: calendar entities and sensors per profile,
  services with response data, bus events for automations.
- **Proximity detection**: fires `chronotope_nearby` when a person is at a
  running event - and builds a visit history (geo diary) from it,
  retroactively fillable from recorder data.
- **geo_location bridge**: earthquake/disaster/GeoJSON feed entities appear
  on the map and can optionally be mirrored as events.
- **Ingest & export**: REST endpoint for scrapers, ICS/GeoJSON/GPX
  importers, experimental LLM extraction from free text, and a
  token-guarded ICS feed any calendar client can subscribe to
  (recurring events exported with TZID + VTIMEZONE).
- **Geo data layers** (opt-in): aircraft, satellites, vessels,
  earthquakes, rocket launches, natural events, conflicts, aurora
  forecast, weather radar, night lights, submarine cables, Tor relays,
  data centers and more from public sources, rendered natively on the map
  (canvas, no iframes), combinable with your events, plus a Lovelace card
  `custom:chronotope-map-card`. See [Layers & data sources](#layers--data-sources).

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
   category (free text - categories emerge from usage), start/end. Type an
   address, or click **Pick point on map** and click the map. Save.
3. **Filter**: use the filter bar - category chips, a radius slider
   (click the map to move the center), a time window with a day-by-day
   slider, weekday chips (all-day or by time of day), text search.
4. **Save a profile**: with filters active, type a name (e.g.
   "Weekend with kids") and press **Save**. A calendar entity and two
   sensors for this profile appear automatically.
5. **Subscribe from a calendar app**: press **Copy ICS subscription URL**
   - with a profile selected the URL references the profile, so the
   subscription follows later edits to the profile.

## The map panel

- **Events** render as clustered circle markers; events with a `geometry`
  field (GeoJSON) render as lines/polygons. Fuzzy-schedule events are
  dashed and show their schedule wording instead of fabricated dates.
- **Layers** (toggleable in the filter bar): HA zones incl. home,
  people (live positions with their profile picture), and
  `geo_location.*` feed entities (diamond markers with source and
  distance). Note: HA *areas* have no coordinates in Home Assistant, so
  they cannot be drawn - zones are the geo-capable concept.
- **Result list**: sorted by distance when a radius center is set,
  otherwise by start time. Each entry offers favorite, edit and hide
  buttons, the source link, a "visited" badge fed by the visit
  history, and the next matched occurrence for recurring events.
- **Editor**: create/edit/delete events, capture a point by clicking the
  map, or record lines/areas click by click with a live preview. Popups
  include an OSM directions link.
- **Sticky state**: all filters, toggled layers and the selected profile
  persist per browser (localStorage) across panel visits and reloads.
  **Reset view** in the filter bar restores the defaults.

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
same secret used by the ICS feed - grab a URL containing it via the ICS
button in the panel. Geocoding stays the source's job, but thanks to the
address cache each address only ever needs to be resolved once.

**Other ways in:**

- `chronotope.add_event` service (automations, scripts, Node-RED)
- `chronotope.import_ics` / `import_geojson` / `import_gpx` - from a URL,
  a file relative to the config directory, or inline data
- `chronotope.extract_event` (experimental) - hand free text like
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
  real HA calendar entity - usable in the calendar dashboard, calendar
  triggers and the companion app. Occurrences of recurring events appear
  as concrete entries; fuzzy events are prefixed with `~`.
- **Sensors**: per profile a `next event` timestamp sensor (with title,
  category, address, coordinates as attributes) and an `events today`
  count; plus one global statistics sensor whose attributes include
  per-source health (event count, last scrape) - ideal for alerting when
  a scraper goes quiet.
- **ICS feed**: `GET /api/chronotope/calendar.ics?token=<secret>` serves
  RFC 5545 iCalendar for any calendar client (Thunderbird, CalDAV apps,
  HA Remote Calendar). One-off events are exported in UTC; recurring
  events use `DTSTART;TZID=<your-tz>` plus a generated `VTIMEZONE`, so
  weekly 18:00 stays 18:00 across DST changes. All query filters work as
  URL parameters (`category`, `lat/lon/radius`, `start/end`, `weekday`,
  `time_from/time_to`, `text`, `favorites`) - or just `profile=`.

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

**One-shot after installation - fill the visit history retroactively**
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

## Layers & data sources

Beyond your events, Chronotope can show **geographic data layers** from
public sources on the same map: moving objects (aircraft, satellites,
vessels), events (earthquakes, launches, natural events, conflicts),
static objects (data centers, dams, regions, submarine cables, Tor
relays, radio stations), gridded data (aurora forecast) and raster
overlays (weather radar, warnings, night lights). They replace the
iframe embeds people put on dashboards with native, filterable,
attributable layers.

**Everything is off by default.** Enable the feature in
**Settings > Devices & services > Chronotope > Configure** ("Enable data
layers"), then switch on individual layers in the panel's **Layers**
section. Keys for the few sources that need them go into the second
options step ("API keys"); they never leave the server.

How it works, in short:

- Data layers are fetched **by Home Assistant**, not by your browser
  (`custom_components/chronotope/feeds/`): one polite poller per active
  layer with a minimum interval per source, conditional requests,
  exponential backoff, a circuit breaker and a "blocked" state for
  401/403/404/429. Attempt times are persisted so a restart never bypasses
  a source's minimum interval. Every provider has byte, feature and
  calls-per-hour budgets; exceeding one keeps the last good data.
- The panel reads layer data through the authenticated view
  `GET /api/chronotope/layers/<id>/data` (ETag, gzip, bbox filtering for
  large feature sets) and renders it on canvas: aircraft interpolate
  between polls with dead reckoning, satellites are propagated in the
  browser with `satellite.js`, the aurora grid is drawn cell by cell.
- **Raster overlays and base map tiles are loaded directly by your
  browser from the provider** (like the OpenStreetMap tiles always were),
  which reveals your IP address to that provider. Data layers never do.
- Event-class layers (earthquakes, launches, ...) become regular events
  (`feed:<provider>:<id>`, categories `earthquake`, `launch`,
  `natural:<category>`, `conflict`, `fire`, `fishing`) and therefore
  appear in profiles, calendars, sensors and the ICS feed. Each provider
  prunes its own events after its retention period; favorites survive.
- Moving objects are never stored and never become entities. A small
  fixed set of aggregate sensors exists instead:
  `sensor.chronotope_aircraft_nearby`, `sensor.chronotope_vessels_nearby`,
  `sensor.chronotope_kp_index`, `sensor.chronotope_aurora_probability_at_home`
  (each only while its layer runs) plus a `layers` attribute with
  freshness per layer on `sensor.chronotope_statistics`.
- Chronotope does not redistribute any third-party data: nothing is
  bundled in the repository, everything is fetched at runtime and cached
  under `<config>/chronotope_cache/`. Attribution for every active source
  is shown in the map's attribution control.

### Sources

| Layer | Source | License / terms | Attribution | Key | NC |
|---|---|---|---|---|---|
| `flights_regional`, `flights_military` | [adsb.lol](https://adsb.lol) v2 API | ODbL 1.0 | adsb.lol contributors | no | no |
| `flights_opensky` (fallback only) | [OpenSky Network](https://opensky-network.org) | non-commercial; cite Schäfer et al. 2014 | The OpenSky Network | optional OAuth client | **yes** |
| `satellites_*` | [CelesTrak](https://celestrak.org) GP/OMM | US government data | CelesTrak, T.S. Kelso | no | no |
| `vessels` | [AISStream](https://aisstream.io) | beta, no formal terms | AISStream.io | **yes** | no |
| `earthquakes` | [USGS](https://earthquake.usgs.gov) | US public domain | Data courtesy of the U.S. Geological Survey | no | no |
| `launches` | [Launch Library 2](https://thespacedevs.com) | free use, 15 calls/h anonymous | The Space Devs | optional | no |
| `natural_events` | [NASA EONET](https://eonet.gsfc.nasa.gov) | NASA, public domain | NASA EONET | no | no |
| `conflicts`, `conflicts_api` | [UCDP](https://ucdp.uu.se) Candidate | CC BY 4.0, cite per codebook | UCDP | API: **yes** | no |
| `fires` | [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov) | public domain, acknowledge FIRMS | NASA FIRMS | **yes** (MAP_KEY) | no |
| `fishing` | [Global Fishing Watch](https://globalfishingwatch.org) | GFW terms of use | Global Fishing Watch | **yes** | no |
| `datacenters`, `dams` | OpenStreetMap via [Overpass](https://overpass-api.de) | ODbL 1.0 | © OpenStreetMap contributors | no | no |
| `regions`, `countries` | [Natural Earth](https://www.naturalearthdata.com) (pinned commit) | public domain | Made with Natural Earth | no | no |
| `submarine_cables` | [TeleGeography](https://www.submarinecablemap.com) | CC BY-NC-SA 3.0 | TeleGeography | no | **yes** |
| `tor_relays` | [Onionoo](https://metrics.torproject.org/onionoo.html) | Tor Metrics data (CC0, to be confirmed) | Tor Project | no | no |
| `radio_stations` | [Radio Browser](https://www.radio-browser.info) | PDDL 1.0 | Community Radio Browser | no | no |
| `refugees` | [UNHCR Refugee Data Finder](https://www.unhcr.org/refugee-statistics/) | UNHCR terms | UNHCR | no | no |
| `internet_outages` | [IODA](https://ioda.inetintel.cc.gatech.edu) | IODA terms | IODA, Georgia Tech | no | no |
| `aurora` + Kp sensor | [NOAA SWPC](https://www.swpc.noaa.gov) OVATION | US government data | NOAA SWPC | no | no |
| `dwd_radar`, `dwd_warnings`, preset `dwd_wind` | [DWD GeoServer](https://maps.dwd.de) WMS | GeoNutzV | © Deutscher Wetterdienst | no | no |
| `night_lights`, `thermal_anomalies` | [NASA GIBS](https://earthdata.nasa.gov/gibs) | NASA, public domain | NASA GIBS / Black Marble, FIRMS | no | no |
| base map `topplus` | [BKG TopPlusOpen](https://www.bkg.bund.de) WMS | dl-de/by-2-0 | © GeoBasis-DE / BKG | no | no |
| base map `esri_imagery` | Esri World Imagery | Esri terms, attribution required | Tiles © Esri and partners | no | no |
| custom `xyz` / `wmts` / `wms` / `geojson_url` | your URL | yours to check | required field | – | – |

"NC" marks non-commercial licenses; those layers carry an **NC** badge in
the panel. Lightning strikes are deliberately *not* fetched by
Chronotope: Blitzortung forbids third-party clients. Use the HACS
`blitzortung` integration; its `geo_location.*` entities render on the
panel's geo-feed layer (canvas, fast) and are excluded from the
geo_location event bridge by default.

### Recipes via HA integrations

- **GDACS disasters** and **USGS earthquakes** also exist as Home
  Assistant core integrations (`gdacs`, `usgs_earthquakes_feed`); their
  `geo_location.*` entities show up on the geo-feed layer and, with the
  geo_location bridge enabled, become events (`geoloc:<entity_id>`).
- **Blitzortung**: HACS integration `blitzortung` as described above.

### Lovelace card

```yaml
type: custom:chronotope-map-card
layers: [flights_regional, satellites_visual]   # ids to show (must be enabled)
center: [52.52, 13.405]      # optional, default HA home
zoom: 8                      # optional
base: osm                    # osm | topplus | esri_imagery
profile: Weekend with kids   # optional, shows the profile's events
show_events: true
show_layer_toggle: true      # compact checkbox overlay in the card
height: 400px                # use 100% in panel views
```

The card is registered automatically (`chronotope-card.js`); no resource
entry is needed. It shows layers that are enabled in the panel and never
starts a provider on its own.

### Deep links

The panel accepts `?layers=a,b&lat=..&lon=..&z=..&profile=..&base=..`
in its URL. These override the stored view for that visit without
replacing it.

### Probing sources

`scripts/probe_sources.py` (stdlib only, not in CI) calls every endpoint
once and prints status, content type, size and a schema sample. Run it
before changing a provider; keys are read from `AISSTREAM_KEY`,
`FIRMS_KEY`, `GFW_TOKEN`, `UCDP_TOKEN`.

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

1. Store a **best-effort RRULE** - `FREQ=WEEKLY;BYDAY=WE` for the first,
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

Layer data uses regular HA authentication instead (the panel sends its
token): `GET /api/chronotope/layers/<id>/data[?bbox=&zoom=]` (GeoJSON
profile with `meta`, ETag/304, gzip) and
`GET /api/chronotope/layers/<id>/legend` (WMS legend proxy).

## WebSocket API

For custom frontends and advanced tooling:
`chronotope/events/save|delete|flag|query`, `chronotope/categories`,
`chronotope/stats`, `chronotope/profiles/save|delete|list`,
`chronotope/ics_url`, `chronotope/places/lookup`, and for layers
`chronotope/layers/catalog|list|save|delete|status|preview`. Example query payload:

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
| geo_location sources | empty | allow-list of `source` attributes to mirror; empty means all except `blitzortung` |
| Enable data layers | off | master switch for the geo data layers; individual layers are enabled in the panel |
| Default center | HA home | center for regional layers (aircraft radius, vessels); only stored when changed |
| API keys (second step) | empty | AISStream, NASA FIRMS, Global Fishing Watch, UCDP, OpenSky client credentials, Launch Library token |

## Notes & limitations

- **HA areas** have no coordinates - zones, people and geo_location
  entities are what can be drawn on a map.
- **`match_visits`** only reaches as far back as your recorder retention
  (`purge_keep_days`, default 10 days). Live tracking covers everything
  from installation onward.
- **VTIMEZONE** transitions are computed with hour precision - exact for
  European/US zones; half-hour DST zones (e.g. Lord Howe) may be off by
  up to an hour at the transition moment.
- **Dedupe rule**: same title (case-insensitive) + same recurrence +
  start within 12 h (one-off events) + same place (same normalized
  address, else within 300 m, else both location-less).
- **Token security**: anyone with the token can read the ICS feed and
  push events. Treat the URL like a password; it is not your HA login.
- The panel UI is English by default and switches to German automatically
  when your HA profile language is German.
- No external requests from the core: the frontend loads only base map
  and raster overlay tiles; geocoding is the data source's job (the
  address cache keeps it to once per address); backend fetches happen
  only for user-initiated imports and for data layers you switched on.
- Layer endpoints marked "to be confirmed" in `docs/spec-geo-layers.md`
  (DWD layer names, GIBS time/level, UCDP API, GFW, IODA, UNHCR paths)
  were implemented from documentation; run `scripts/probe_sources.py` and
  open an issue if a provider stays in `error`.

## Development

```sh
cd frontend && npm ci && npm run build   # panel + card bundles (vendored/committed)
python3 -m unittest discover -s tests    # HA-free tests (store, ICS, importers, feeds)
python3 scripts/probe_sources.py         # live check of every layer endpoint
```

Architecture details live in [CLAUDE.md](CLAUDE.md) (German - it is the
internal engineering doc of this repository).

## License

[MIT](LICENSE) - use it, fork it, build on it.
