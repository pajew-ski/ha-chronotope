# ha-chronotope

## Projekt

Domänenoffene Geo-Zeit-Event-Engine als Home-Assistant-Custom-Integration,
ausgebaut zur Personal-Intelligence-Anwendung: Events sind Objekte mit Ort,
Zeitspanne und Kategorie aus beliebigen Quellen (Scraper, REST-Ingest,
Importer, manuelle Eingabe, LLM-Extraktion). Kern und Schema bleiben
domänenneutral — die Engine weiß nicht, ob ein Event ein Flohmarkt, eine
Straßensperrung oder eine Sternschnuppennacht ist. Das Persönliche
(Profile, Kalender, Sensoren, Digest, Näheerkennung, Besuchshistorie)
lebt in der HA-Schicht.

## Architektur

Alle Teile unter `custom_components/chronotope/`:

1. **Store** (`store.py`): SQLite-Datenbank (`<config>/chronotope.db`).
   Bewusst frei von Home-Assistant-Imports, damit sie ohne HA testbar ist.
   Die HA-Schicht ruft alle Operationen über `hass.async_add_executor_job`
   auf. Tabellen:
   - `events` — das Event-Schema unten
   - `places` — Adress-Geo-Cache (normalisierter Adress-Key → Lat/Lon):
     Event mit Adresse *und* Koordinaten füllt den Cache, Event mit Adresse
     *ohne* Koordinaten bekommt sie beim Speichern automatisch — Geocoding
     selbst bleibt Sache der Quelle (kein externer Request im Kern)
   - `profiles` — benannte Filterprofile (JSON-Payload im WS-Filterformat);
     speisen Panel, Kalender-Entities, Sensoren, Digest und ICS-Abos
   - `visits` — Besuchshistorie (Event × Person, first/last_seen), gefüllt
     von der Näheerkennung; hängt als `visits` an Query-Ergebnissen

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
   Ort — Adress-Key, sonst ≤300 m, sonst beide ortlos — wird in das
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
   Schreiboperationen feuern `chronotope_event_added|updated|deleted` auf
   dem HA-Bus plus interne Dispatcher-Signale (`signals.py`) für die
   Entity-Aktualisierung.

3. **HTTP** (`http.py`):
   - `GET /api/chronotope/calendar.ics?token=…` — ICS-Export (RFC 5545:
     CRLF, 75-Oktett-Folding, Escaping). Einmalige Events in UTC;
     wiederkehrende mit `DTSTART;TZID=<HA-Zeitzone>` + generiertem
     VTIMEZONE (Observance-Liste via Offset-Scan), damit lokale Uhrzeiten
     über DST-Grenzen stabil bleiben. Filter als Query-Parameter
     (`category`, `lat/lon/radius`, `start/end`, `weekday`, `time_from/to`,
     `text`, `favorites`) oder `profile=<id-oder-Name>`.
   - `POST /api/chronotope/events` — REST-Ingest für Scraper (einzelnes
     Objekt, Liste oder `{"events": […]}`; Dedupe per Default an,
     `?dedupe=0` aus). Beide Endpoints sind unauthenticated, aber durch das
     bei Setup generierte Token geschützt (Query-Param `token` oder
     `Authorization: Bearer`; persistiert in `.storage/chronotope`).

4. **HA-Schicht**:
   - `calendar.py` — eine Kalender-Entity pro Profil + „Alle Events";
     Occurrences wiederkehrender Events werden zu konkreten Terminen,
     unscharfe Events tragen „~" + schedule_text
   - `sensor.py` — pro Profil „nächstes Event" (Timestamp + Attribute) und
     „Events heute"; global ein Statistik-Sensor (Quellen-Health in den
     Attributen). Entities entstehen/verschwinden mit den Profilen
     (`entity.py`), aktualisieren per Dispatcher + 15-min-Poll.
   - `services.py` — `add_event`, `delete_event`, `query` (Response),
     `lookup_place`, `digest` (Text-Digest, optional notify-Versand und
     Frei-/Belegt-Abgleich via `calendar.get_events`), `purge`, `backup`,
     `import_ics`, `import_geojson`, `import_gpx`, `match_visits`
     (rückwirkender Besuchsabgleich, siehe unten), `extract_event`
     (experimentell, via `conversation.process`)
   - `nearby.py` — Näheerkennung: `person.*`-Listener feuert
     `chronotope_nearby` (Cooldown 2 h pro Person+Event, 50-m-Bewegungs-
     schwelle) und schreibt die Besuchshistorie. Optionen (Radius, an/aus)
     im Options-Flow, Entry lädt bei Änderung neu.
   - `geoloc.py` — opt-in (Options-Flow): spiegelt `geo_location.*`-Entities
     (Erdbeben-/GDACS-/GeoJSON-Feeds) als Events mit stabiler ID
     `geoloc:<entity_id>`, Kategorie `geo:<source>` und rollierendem
     Ende (+1 h je Feed-Refresh); verschwindet die Entity, wird das Event
     geschlossen. `chronotope.purge` räumt sie später ab.
   - `chronotope.match_visits` — rückwirkender Besuchsabgleich: liest die
     Positionshistorie der Personen aus dem Recorder
     (`history.get_significant_states`, lazy importiert) und matcht sie
     gegen vergangene Event-Occurrences (Radius-Parameter). Reicht nur so
     weit zurück wie die Recorder-Retention (`purge_keep_days`, Default 10).

5. **Custom Panel** (`frontend/`-Quellcode → Bundle in
   `custom_components/chronotope/frontend/chronotope-panel.js`):
   Lit 3, alle Abhängigkeiten (Lit, Leaflet, leaflet.markercluster inkl.
   CSS) via esbuild vendored, kein CDN. Leaflet-Karte mit OSM-Tiles
   (Darkmode: CSS-Invert-Filter), UI ausschließlich über HA-Theme-Variablen.
   Punkt-Events clustern; `geometry` (GeoJSON) rendert als `L.geoJSON`;
   HA-Zonen (inkl. Zuhause), Personen (`person.*`, live mit Foto/Initial)
   und Geo-Feeds (`geo_location.*`, Rauten-Marker mit Quelle/Distanz) als
   zuschaltbare Layer aus `hass.states` — HA-Areas/Bereiche haben keine
   Koordinaten und sind darum nicht darstellbar. Filter-UI: Profile (speichern/laden/
   löschen), Textsuche, nur-Favoriten, Kategorie-Chips, Radius-Slider mit
   Kartenklick-Center, Zeitfenster mit Tages-Slider (clientseitig),
   Wochentage ganztags/Uhrzeitbereich, Zonen-Toggle, ICS-Button
   (profilbasiert, wenn Profil gewählt), Statistik-Block. Ergebnisliste
   distanzsortiert mit Favoriten-Stern, Ausblenden, „besucht"-Badge,
   Quelle und Edit-Button. Event-Editor als Overlay: alle Felder,
   Punkt per Kartenklick, Linien/Flächen per Klick-Aufzeichnung mit
   Vorschau, Routing-Link (OSM) im Popup. Unscharfe Events erscheinen
   gestrichelt und zeigen `schedule_text` statt konkreter Termine.

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
time_precision   TEXT  exact (Default) | approximate — markiert unscharfe
                       Zeitangaben („ca. 2x im Monat")
schedule_text    TEXT  Original-Wortlaut der Zeitangabe für die Anzeige
favorite         INT   Nutzer-Flag (überlebt Scraper-Re-Saves und Dedupe)
hidden           INT   Nutzer-Flag; ausgeblendete Events filtert die Query
```

**Unscharfe Termine:** Das Matching läuft immer über die vorhandene
RRULE-Maschinerie — die Quelle legt eine Best-Effort-RRULE ab
(„Di+Do um 18 oder 20 Uhr" → `FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20`,
„~2x im Monat mittwochs" → `FREQ=WEEKLY;BYDAY=WE`), Filter und Karte
funktionieren dadurch unverändert (Recall vor Präzision).
`time_precision: approximate` + `schedule_text` sorgen dafür, dass UI,
Kalender-Entities und ICS-Export die Unschärfe ausweisen.

## Entwicklung

- **Frontend bauen:** `cd frontend && npm ci && npm run build`
  — schreibt das Bundle nach
  `custom_components/chronotope/frontend/chronotope-panel.js`.
  Das Bundle ist committed (vendored). Nach Änderungen an `frontend/src/`
  immer neu bauen und das Bundle mitcommitten.
- **Tests:** `python3 -m unittest discover -s tests` — bewusst ohne
  `homeassistant`-Abhängigkeit; getestet werden `store.py`, `ics.py`
  und `importers.py`. Die Tests laden Module via `tests/helpers.py`
  (importlib), damit `calendar.py` nicht das Stdlib-Modul verschattet.
- **Installation:** Repo via HACS (Custom Repository) oder
  `custom_components/chronotope` nach `<config>/custom_components/`,
  dann Integration „Chronotope" über die UI hinzufügen (Config Flow,
  Single Instance; Optionen: Näheerkennung an/aus + Radius,
  geo_location-Ingest an/aus).

## Konventionen

- `store.py`, `ics.py` und `importers.py` importieren kein Home Assistant —
  nur Stdlib und `dateutil`. HA-spezifisches lebt in `__init__.py`,
  `http.py`, `websocket_api.py`, `services.py`, `calendar.py`, `sensor.py`,
  `nearby.py`, `geoloc.py`, `entity.py`, `signals.py`, `config_flow.py`.
- Zeiten intern immer UTC-ISO-8601 (`+00:00`); Wochentag-/Uhrzeit-Filter
  und RRULE-Expansion werden in der HA-Zeitzone ausgewertet.
- Kein CDN, keine externen Requests im Frontend außer OSM-Tiles; der Kern
  macht kein Geocoding (places-Cache statt externer Lookups). Externe
  Requests im Backend nur nutzerinitiiert (`import_*` mit URL).
- Schreibpfade feuern immer `notify_event_change`/`notify_profiles_changed`
  (`signals.py`), sonst veralten Kalender/Sensoren.
- **Sprachen (HACS-Standard):** Alles Nutzer-Sichtbare ist Englisch als
  Default — README, `services.yaml`, Entity-Namen, Digest-Texte,
  LLM-Prompt. Deutsch kommt über Lokalisierung: Config-/Options-Flow via
  `translations/de.json`, das Panel via `frontend/src/i18n.js` (folgt der
  Profilsprache, `setLanguage()` im Panel), der Digest via
  `hass.config.language`. Neue UI-Strings immer in beiden Wörterbüchern
  (en + de) anlegen; `CLAUDE.md` selbst bleibt Deutsch (internes
  Engineering-Dokument).
