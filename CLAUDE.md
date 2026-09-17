# ha-chronotope

## Projekt

Domänenoffene Geo-Zeit-Event-Engine als Home-Assistant-Custom-Integration,
ausgebaut zur Personal-Intelligence-Anwendung: Events sind Objekte mit Ort,
Zeitspanne und Kategorie aus beliebigen Quellen (Scraper, REST-Ingest,
Importer, manuelle Eingabe, LLM-Extraktion). Kern und Schema bleiben
domänenneutral - die Engine weiß nicht, ob ein Event ein Flohmarkt, eine
Straßensperrung oder eine Sternschnuppennacht ist. Das Persönliche
(Profile, Kalender, Sensoren, Digest, Näheerkennung, Besuchshistorie)
lebt in der HA-Schicht.

## Architektur

Alle Teile unter `custom_components/chronotope/`:

1. **Store** (`store.py`): SQLite-Datenbank (`<config>/chronotope.db`).
   Bewusst frei von Home-Assistant-Imports, damit sie ohne HA testbar ist.
   Die HA-Schicht ruft alle Operationen über `hass.async_add_executor_job`
   auf. Tabellen:
   - `events` - das Event-Schema unten
   - `places` - Adress-Geo-Cache (normalisierter Adress-Key → Lat/Lon):
     Event mit Adresse *und* Koordinaten füllt den Cache, Event mit Adresse
     *ohne* Koordinaten bekommt sie beim Speichern automatisch - Geocoding
     selbst bleibt Sache der Quelle (kein externer Request im Kern)
   - `profiles` - benannte Filterprofile (JSON-Payload im WS-Filterformat);
     speisen Panel, Kalender-Entities, Sensoren, Digest und ICS-Abos
   - `visits` - Besuchshistorie (Event × Person, first/last_seen), gefüllt
     von der Näheerkennung; hängt als `visits` an Query-Ergebnissen
   - `layers` - Layer-Konfigurationen (`id, payload JSON, updated_at`):
     eingebaute Layer (`layer_id` aus dem Katalog, enabled, interval_s,
     params, opacity) und generische Layer (`custom_<hex>`, provider
     `xyz|wmts|wms|geojson_url`, https-Pflicht, Platzhalter-Prüfung,
     Attribution Pflicht). `validate_layer_config` prüft nur die Form,
     nicht den Katalog (Domänenneutralität). `delete_events_by_prefix`
     ist die Retention für Feed-Events (`feed:<provider>:…`, Favoriten
     bleiben).

   Schema-Upgrades laufen beim Öffnen in-place über `ALTER TABLE`
   (`_MIGRATED_COLUMNS`). Filter (`QueryFilter`, kombinierbar):
   - Kategorie (eine oder mehrere, exakter Match)
   - Radius um Lat/Lon-Punkt via Haversine (als SQLite-Funktion registriert)
   - Zeitfenster-Überlappung (`start < window_end AND end > window_start`)
     auf UTC-normalisierten ISO-8601-Strings (lexikographisch vergleichbar)
   - Wochentag-/Uhrzeit-Maske (ganztags oder `HH:MM`-Bereich, in der
     HA-Zeitzone ausgewertet)
   - Textsuche (Substring über Titel/Beschreibung/Adresse/Kategorie/
     schedule_text), `favorites_only`, `include_hidden`
   - RRULE-Events werden mit `dateutil.rrule` expandiert (Core-Dependency
     von HA) und gegen Fenster + Maske geprüft; gematchte Vorkommen landen
     als `occurrences` (UTC) in der Antwort. Die Expansion läuft in der
     Query-Zeitzone, damit BYHOUR/BYDAY lokale Uhrzeit bedeuten und über
     DST-Wechsel stabil bleiben.

   Weitere Store-Funktionen: **Dedupe** beim Speichern (`dedupe=True`:
   gleicher Titel case-insensitiv + gleiche RRULE + Start ±12 h + gleicher
   Ort - Adress-Key, sonst ≤300 m, sonst beide ortlos - wird in das
   bestehende Event gemerged; Nutzer-Flags überleben), **purge**
   (Events älter N Tage; wiederkehrende nur bei ausgelaufener Regel),
   **source_stats/stats** (Quellen-Health), **backup** (SQLite-Backup-API),
   `set_event_flags` (favorite/hidden ohne Datenverlust).

2. **WebSocket-API** (`websocket_api.py`): Befehle
   - `chronotope/events/save` (Upsert, optional `dedupe`), `events/delete`,
     `events/flag` (favorite/hidden), `events/query` (alle Filter; mit
     Center wird `distance_km` berechnet und sortiert)
   - `chronotope/categories`, `chronotope/stats`
   - `chronotope/profiles/save|delete|list`
   - `chronotope/ics_url` (Filter- oder Profil-basiert)
   - `chronotope/places/lookup` (Adress-Geo-Cache)
   - Layer (`layers_ws.py`): `chronotope/layers/catalog|list|save|delete|
     status|preview` - Katalog inkl. Presets, Basiskarten und `key_set`
     (bool, nie der Wert), Konfigurationen mit Frische, Speichern startet/
     stoppt den Provider ohne Entry-Reload, `preview` macht einen
     Testabruf für generische Layer.
   Schreiboperationen feuern `chronotope_event_added|updated|deleted` auf
   dem HA-Bus plus interne Dispatcher-Signale (`signals.py`) für die
   Entity-Aktualisierung.

3. **HTTP** (`http.py`):
   - `GET /api/chronotope/calendar.ics?token=…` - ICS-Export (RFC 5545:
     CRLF, 75-Oktett-Folding, Escaping). Einmalige Events in UTC;
     wiederkehrende mit `DTSTART;TZID=<HA-Zeitzone>` + generiertem
     VTIMEZONE (Observance-Liste via Offset-Scan), damit lokale Uhrzeiten
     über DST-Grenzen stabil bleiben. Filter als Query-Parameter
     (`category`, `lat/lon/radius`, `start/end`, `weekday`, `time_from/to`,
     `text`, `favorites`) oder `profile=<id-oder-Name>`.
   - `POST /api/chronotope/events` - REST-Ingest für Scraper (einzelnes
     Objekt, Liste oder `{"events": […]}`; Dedupe per Default an,
     `?dedupe=0` aus). Beide Endpoints sind unauthenticated, aber durch das
     bei Setup generierte Token geschützt (Query-Param `token` oder
     `Authorization: Bearer`; persistiert in `.storage/chronotope`).
   - `feeds/views.py`: `GET /api/chronotope/layers/{id}/data` (HA-Auth,
     `requires_auth = True`; optional `bbox`, `zoom`; GeoJSON-Profil aus
     Spec 5.3 mit `meta`; ETag/304, gzip, `Cache-Control: no-cache`) und
     `GET /api/chronotope/layers/{id}/legend` (WMS-GetLegendGraphic-Proxy,
     1 MB Cap).

4. **Feed-Schicht** (`feeds/`, Spec `docs/spec-geo-layers.md`): der
   einzige Ort mit externen Requests der Integration (I2), alles opt-in.
   - `catalog.py` - HA-freier Layerkatalog (`LayerSpec`, `Budget`,
     `LicenseInfo`), Presets, Basiskarten, `KEY_OPTIONS` (Schlüssel-
     Optionen im Config-Entry), `validate_params` gegen ein JSON-
     serialisierbares `params_schema`.
   - `policy.py` - HA-freie Politeness-Zustandsmaschine (`FeedPolicy`):
     Mindestintervall, bedingte Requests (ETag/Last-Modified),
     exponentieller Backoff bis 1 h, Circuit-Breaker nach 5 Fehlern,
     `blocked` bei 301/401/403/404/429 (Retry-After oder 6 h), Budget-
     Überschreitung = `error` mit letztem Stand; Persistenz via
     `to_dict/from_dict` durch den Manager (`.storage/chronotope_feeds`).
   - `base.py` - `FeedProvider`: Polling-Loop, `fetch_url` mit User-Agent,
     20-s-Timeout, Streaming-Bytebudget, kein Redirect-Following,
     Abrufe/Stunde-Budget, Platten-Cache `<config>/chronotope_cache/
     <layer_id>.json.gz`, `snapshot()` für die View, Events-Klasse schreibt
     in den Store und räumt per Retention.
   - `__init__.py` - `FeedManager` (in `hass.data[DOMAIN]["feeds"]`):
     Provider je aktivem Layer, Statusaggregation für WS/Sensor,
     `async_preview`, Schlüsselzugriff (`key()`), Heimatmittelpunkt.
   - `providers/` - eine Datei je Quelle (adsb_lol mit OpenSky-Rückfall,
     opensky, celestrak, usgs, ll2, eonet, ucdp (CSV + API), swpc (Grid +
     Kp), onionoo, overpass (Kachelwarteschlange, Tageslimit), natural_earth,
     telegeography, radio_browser, aisstream (Websocket, `AisLimiter`),
     firms, gfw, unhcr/ioda (Choroplethen über `countries`), generic
     (`geojson_url`)). Raster-Layer haben keinen Provider: der Browser
     lädt Kacheln direkt (I10).
   - `feeds_parse.py` (Paketwurzel, HA-frei) - reine Parser
     `bytes|str -> dict` je Quelle, `make_feature`, Profil-Validator
     `validate_feature_collection`, Grid-Normalisierung, Overpass-Kachelung,
     UCDP-Versionsermittlung, `AisLimiter`, `choropleth_join`.
   Tracks sind flüchtig (I3): nie in SQLite, nie als Entity. Sensoren
   nur als feste Aggregatmenge (`sensor.py`: aircraft_nearby,
   vessels_nearby, kp_index, aurora_probability_home; existieren nur,
   solange der Layer läuft).

5. **HA-Schicht**:
   - `calendar.py` - eine Kalender-Entity pro Profil + „Alle Events";
     Occurrences wiederkehrender Events werden zu konkreten Terminen,
     unscharfe Events tragen „~" + schedule_text
   - `sensor.py` - pro Profil „nächstes Event" (Timestamp + Attribute) und
     „Events heute"; global ein Statistik-Sensor (Quellen-Health in den
     Attributen). Entities entstehen/verschwinden mit den Profilen
     (`entity.py`), aktualisieren per Dispatcher + 15-min-Poll.
   - `services.py` - `add_event`, `delete_event`, `query` (Response),
     `lookup_place`, `digest` (Text-Digest, optional notify-Versand und
     Frei-/Belegt-Abgleich via `calendar.get_events`), `purge`, `backup`,
     `import_ics`, `import_geojson`, `import_gpx`, `match_visits`
     (rückwirkender Besuchsabgleich, siehe unten), `extract_event`
     (experimentell, via `conversation.process`)
   - `nearby.py` - Näheerkennung: `person.*`-Listener feuert
     `chronotope_nearby` (Cooldown 2 h pro Person+Event, 50-m-Bewegungs-
     schwelle) und schreibt die Besuchshistorie. Optionen (Radius, an/aus)
     im Options-Flow, Entry lädt bei Änderung neu.
   - `geoloc.py` - opt-in (Options-Flow): spiegelt `geo_location.*`-Entities
     (Erdbeben-/GDACS-/GeoJSON-Feeds) als Events mit stabiler ID
     `geoloc:<entity_id>`, Kategorie `geo:<source>` und rollierendem
     Ende (+1 h je Feed-Refresh); verschwindet die Entity, wird das Event
     geschlossen. `chronotope.purge` räumt sie später ab. Allow-Liste der
     Quellen (`geoloc_sources`); leer = alle außer `blitzortung` (Blitze
     fluten sonst den Store und laufen über die Geo-Feed-Ebene im Panel).
   - `config_flow.py` - Options in zwei Schritten: `init` (Näheerkennung,
     geoloc-Brücke + Allow-Liste, Layer-Gesamtschalter, Standard-
     Mittelpunkt) und `api_keys` (maskierte Felder; Werte nur in
     `entry.options`, nie in WS/HTTP/Log).
   - `chronotope.match_visits` - rückwirkender Besuchsabgleich: liest die
     Positionshistorie der Personen aus dem Recorder
     (`history.get_significant_states`, lazy importiert) und matcht sie
     gegen vergangene Event-Occurrences (Radius-Parameter). Reicht nur so
     weit zurück wie die Recorder-Retention (`purge_keep_days`, Default 10).

6. **Custom Panel** (`frontend/`-Quellcode → Bundles in
   `custom_components/chronotope/frontend/chronotope-panel.js` und
   `chronotope-card.js`): Lit 3, alle Abhängigkeiten (Lit, Leaflet,
   leaflet.markercluster inkl. CSS, satellite.js) via esbuild vendored,
   kein CDN. Beide Bundles teilen sich die Komponenten; `define.js`
   registriert Custom Elements nur einmal, damit Panel und Karte auf einer
   Seite koexistieren. Leaflet-Karte mit OSM-Tiles
   (Darkmode: CSS-Invert-Filter), UI ausschließlich über HA-Theme-Variablen.
   Punkt-Events clustern; `geometry` (GeoJSON) rendert als `L.geoJSON`;
   HA-Zonen (inkl. Zuhause), Personen (`person.*`, live mit Foto/Initial)
   und Geo-Feeds (`geo_location.*`, Rauten-Marker mit Quelle/Distanz) als
   zuschaltbare Layer aus `hass.states` - HA-Areas/Bereiche haben keine
   Koordinaten und sind darum nicht darstellbar. Filter-UI: Profile (speichern/laden/
   löschen), Textsuche, nur-Favoriten, Kategorie-Chips, Radius-Slider mit
   Kartenklick-Center, Zeitfenster mit Tages-Slider (clientseitig),
   Wochentage ganztags/Uhrzeitbereich, Zonen-Toggle, ICS-Button
   (profilbasiert, wenn Profil gewählt), Statistik-Block. Ergebnisliste
   distanzsortiert mit Favoriten-Stern, Ausblenden, „besucht"-Badge,
   Quelle und Edit-Button. Der komplette Filter-/Layer-Zustand inkl.
   gewähltem Profil wird pro Browser in `localStorage` persistiert
   (`chronotope-panel-state-v1` - Version bei inkompatiblen Änderungen
   am Filter-Shape hochzählen); „Ansicht zurücksetzen" stellt die
   Defaults wieder her. Event-Editor als Overlay: alle Felder,
   Punkt per Kartenklick, Linien/Flächen per Klick-Aufzeichnung mit
   Vorschau, Routing-Link (OSM) im Popup. Unscharfe Events erscheinen
   gestrichelt und zeigen `schedule_text` statt konkreter Termine.

   **Layer im Frontend** (`frontend/src/layers/`): `registry.js` (Katalog,
   Konfigurationen, Polling je Layer über `hass.fetchWithAuth`, Pause bei
   `document.hidden`, bbox-Refetch mit 500-ms-Debounce), `canvas-base.js`
   + `render-points.js` (Canvas-Punkte mit Kursrotation, Klick-Hit-Test),
   `render-grid.js` (Gitter zellweise in projizierten Koordinaten),
   `render-geojson.js` (Linien/Flächen, Choroplethen), `render-raster.js`
   (XYZ/WMTS/WMS, `{Time}`-Auflösung), `satellites.js` (OMM → satrec →
   Position, Bodenspur ±45 min), `interpolate.js` (Anzeige ein Intervall
   hinter Echtzeit, lineare Interpolation, Dead Reckoning bis 2 Intervalle,
   Trail 60 s), `attribution.js` (Credits aller aktiven Quellen, I5),
   `popup.js` (Popups als DOM, I6). `layer-panel.js` ist die Layer-Leiste
   (Schalter, Frischepunkt, Deckkraft, Parameter, NC-Badge, Presets,
   generische Layer mit Testabruf vor dem Speichern). `card.js` ist der
   Einstiegspunkt der Lovelace-Karte `custom:chronotope-map-card`.
   Z-Reihenfolge über Leaflet-Panes: Basiskarte, Raster, Grid, Flächen,
   Events, Feature-Punkte, Tracks, Geo-Feeds, Zonen/Personen. Der Dark-
   Mode-Invert-Filter gilt nur für die Basiskarte (`no-invert` bei
   Luftbildern). Panelzustand `chronotope-panel-state-v2` (Filter,
   Profil, Basiskarte, Layer-Leiste), Migration aus v1; Deep-Link-Parameter
   (`layers, lat, lon, z, profile, base`) überschreiben den Zustand ohne
   ihn zu persistieren. Profile tragen optional `filters.layers: [ids]`.

## Event-Schema

```
id               TEXT  Primärschlüssel (UUID-Hex, wenn nicht übergeben)
title            TEXT  Pflicht
category         TEXT  freies Textfeld
lat, lon         REAL  Punktkoordinate (Basis für Radius-Filter & Distanz)
start_time       TEXT  ISO 8601, tz-aware (wird auf UTC normalisiert)
end_time         TEXT  ISO 8601, tz-aware (wird auf UTC normalisiert)
recurrence       TEXT  RRULE (RFC 5545), optional
source_url       TEXT
source_name      TEXT
confidence       TEXT  verified | scraped | inferred
scraped_at       TEXT  ISO 8601
raw_description  TEXT
geometry         TEXT  optionales GeoJSON (Geometry oder Feature) für
                       Lines/Shapes im Panel; lat/lon bleibt der kanonische
                       Punkt für Filterung und Sortierung
address          TEXT  optionale Adresse; speist/nutzt den places-Cache
time_precision   TEXT  exact (Default) | approximate - markiert unscharfe
                       Zeitangaben („ca. 2x im Monat")
schedule_text    TEXT  Original-Wortlaut der Zeitangabe für die Anzeige
favorite         INT   Nutzer-Flag (überlebt Scraper-Re-Saves und Dedupe)
hidden           INT   Nutzer-Flag; ausgeblendete Events filtert die Query
```

**Unscharfe Termine:** Das Matching läuft immer über die vorhandene
RRULE-Maschinerie - die Quelle legt eine Best-Effort-RRULE ab
(„Di+Do um 18 oder 20 Uhr" → `FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20`,
„~2x im Monat mittwochs" → `FREQ=WEEKLY;BYDAY=WE`), Filter und Karte
funktionieren dadurch unverändert (Recall vor Präzision).
`time_precision: approximate` + `schedule_text` sorgen dafür, dass UI,
Kalender-Entities und ICS-Export die Unschärfe ausweisen.

## Entwicklung

- **Frontend bauen:** `cd frontend && npm ci && npm run build`
  - schreibt die Bundles nach
  `custom_components/chronotope/frontend/chronotope-panel.js` und
  `chronotope-card.js`. Beide sind committed (vendored) und werden von
  der CI gegen den Quellcode geprüft. Nach Änderungen an `frontend/src/`
  immer neu bauen und beide Bundles mitcommitten.
- **Tests:** `python3 -m unittest discover -s tests` - bewusst ohne
  `homeassistant`-Abhängigkeit; getestet werden `store.py`, `ics.py`,
  `importers.py`, `feeds_parse.py`, `feeds/policy.py` und
  `feeds/catalog.py`. Die Tests laden Module via `tests/helpers.py`
  (importlib, auch Unterpfade wie `feeds/policy`), damit `calendar.py`
  nicht das Stdlib-Modul verschattet. Fixtures sind synthetisch (I4).
- **HA-Laufzeittests (optional, nicht in der CI):** `tests_ha/` fährt die
  Integration in einer echten HA-Testinstanz hoch (Layer speichern,
  Provider gegen gemockte Quellen laufen lassen, Daten-View, Sensor,
  Auth). Voraussetzung: `pip install pytest-homeassistant-custom-component
  home-assistant-frontend==<Version aus HA-Manifest>`, dann
  `python -m pytest tests_ha`.
- **Quellen prüfen:** `python3 scripts/probe_sources.py` (nur Stdlib,
  nicht in der CI) ruft jeden Endpunkt einmal auf; Ausgabe gehört in den
  PR-Text, wenn ein Provider angefasst wird.
- **Installation:** Repo via HACS (Custom Repository) oder
  `custom_components/chronotope` nach `<config>/custom_components/`,
  dann Integration „Chronotope" über die UI hinzufügen (Config Flow,
  Single Instance; Optionen: Näheerkennung an/aus + Radius,
  geo_location-Ingest an/aus).

## Konventionen

- `store.py`, `ics.py`, `importers.py`, `feeds_parse.py`, `feeds/policy.py`
  und `feeds/catalog.py` importieren kein Home Assistant - nur Stdlib und
  `dateutil` - und machen keine Netzwerkaufrufe (I1). HA-spezifisches
  lebt in `__init__.py`, `http.py`, `websocket_api.py`, `layers_ws.py`,
  `services.py`, `calendar.py`, `sensor.py`, `nearby.py`, `geoloc.py`,
  `entity.py`, `signals.py`, `config_flow.py` und `feeds/{__init__,base,
  views}.py` plus `feeds/providers/`.
- Zeiten intern immer UTC-ISO-8601 (`+00:00`); Wochentag-/Uhrzeit-Filter
  und RRULE-Expansion werden in der HA-Zeitzone ausgewertet.
- Kein CDN, keine externen Requests im Frontend außer Basiskarten- und
  Raster-Kacheln (I10; Daten-Layer kommen nur über die eigenen HA-Views);
  der Kern macht kein Geocoding (places-Cache statt externer Lookups).
  Externe Requests im Backend nur nutzerinitiiert (`import_*` mit URL)
  oder in `feeds/` für Layer, die der Nutzer eingeschaltet hat (I2).
- Fremde Strings sind nie Markup (I6): Popups und Tooltips als DOM-Knoten
  mit `textContent`; kein `bindTooltip(string)`/`bindPopup(string)` mit
  Fremdtext, keine Interpolation in `divIcon.html`.
- API-Schlüssel liegen nur in `entry.options`, werden nie über WS/HTTP
  ausgegeben und nie geloggt; der Katalog liefert nur `key_set: bool`.
- Neue Provider: Parser HA-frei in `feeds_parse.py` mit Test und
  synthetischem Fixture, `LayerSpec` im Katalog (Attribution, Lizenz,
  Budget, Intervall), Provider in `feeds/providers/`, i18n-Titel
  `layer.<id>` in en + de, README-Lizenztabelle nachziehen.
- Schreibpfade feuern immer `notify_event_change`/`notify_profiles_changed`
  (`signals.py`), sonst veralten Kalender/Sensoren.
- **Sprachen (HACS-Standard):** Alles Nutzer-Sichtbare ist Englisch als
  Default - README, `services.yaml`, Entity-Namen, Digest-Texte,
  LLM-Prompt. Deutsch kommt über Lokalisierung: Config-/Options-Flow via
  `translations/de.json`, das Panel via `frontend/src/i18n.js` (folgt der
  Profilsprache, `setLanguage()` im Panel), der Digest via
  `hass.config.language`. Neue UI-Strings immer in beiden Wörterbüchern
  (en + de) anlegen; `CLAUDE.md` selbst bleibt Deutsch (internes
  Engineering-Dokument).
