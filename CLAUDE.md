# ha-chronotope

## Projekt

Domänenoffene Geo-Zeit-Event-Engine als Home-Assistant-Custom-Integration.
Events sind Objekte mit Ort, Zeitspanne und Kategorie aus beliebigen Quellen
(Scraper, manuelle Eingabe, andere Integrationen). Kern und Schema bleiben
domänenneutral — die Engine weiß nicht, ob ein Event ein Flohmarkt, eine
Straßensperrung oder eine Sternschnuppennacht ist.

## Architektur

Vier Teile, alle unter `custom_components/chronotope/`:

1. **Store** (`store.py`): SQLite-Datenbank (`<config>/chronotope.db`).
   Bewusst frei von Home-Assistant-Imports, damit sie ohne HA testbar ist.
   Die HA-Schicht ruft alle Operationen über `hass.async_add_executor_job`
   auf. Neben `events` gibt es eine `places`-Tabelle als Adress-Geo-Cache
   (normalisierter Adress-Key → Lat/Lon): Ein Event mit Adresse *und*
   Koordinaten füllt den Cache, ein Event mit Adresse *ohne* Koordinaten
   bekommt sie beim Speichern automatisch aus dem Cache — Geocoding selbst
   bleibt Sache der Quelle (kein externer Request im Kern). Schema-Upgrades
   laufen beim Öffnen in-place über `ALTER TABLE` (`_MIGRATED_COLUMNS`).
   Filter:
   - Kategorie (eine oder mehrere, exakter Match)
   - Radius um Lat/Lon-Punkt via Haversine (als SQLite-Funktion registriert)
   - Zeitfenster-Überlappung (`start < window_end AND end > window_start`)
     auf UTC-normalisierten ISO-8601-Strings, dadurch lexikographisch
     vergleichbar
   - Wochentag-/Uhrzeit-Maske (ganztags oder `HH:MM`-Bereich, in der
     HA-Zeitzone ausgewertet)
   - RRULE-Events werden mit `dateutil.rrule` expandiert (Core-Dependency
     von HA, kein eigenes Requirement) und gegen Fenster + Maske geprüft;
     gematchte Vorkommen landen als `occurrences` (UTC) in der Antwort.
     Die Expansion läuft in der Query-Zeitzone (HA-Konfiguration), damit
     BYHOUR/BYDAY lokale Uhrzeit bedeuten und über DST-Wechsel stabil
     bleiben. Einschränkung ICS-Export: dort steht DTSTART in UTC, daher
     interpretieren Kalender-Clients RRULE-Uhrzeiten in UTC und
     wiederkehrende Termine verschieben sich dort über DST-Grenzen um
     eine Stunde (korrekt wäre TZID+VTIMEZONE — bewusst aufgeschoben).

2. **WebSocket-API** (`websocket_api.py`): Befehle
   - `chronotope/events/save` — Upsert, generiert `id`, wenn keine übergeben
   - `chronotope/events/delete` — Löschen per ID
   - `chronotope/events/query` — alle Filter kombinierbar; mit Center wird
     `distance_km` berechnet und danach sortiert, sonst nach Startzeit
   - `chronotope/categories` — distinct Kategorien für die Filter-UI
   - `chronotope/ics_url` — Abo-URL inkl. Token für den ICS-Export
   - `chronotope/places/lookup` — Adress-Geo-Cache-Lookup (für Scraper)

3. **Custom Panel** (`frontend/`-Quellcode → Bundle in
   `custom_components/chronotope/frontend/chronotope-panel.js`):
   Lit 3, alle Abhängigkeiten (Lit, Leaflet inkl. CSS) via esbuild vendored,
   kein CDN. Leaflet-Karte mit OpenStreetMap-Tiles; im Darkmode werden die
   Tiles per CSS-Filter invertiert. UI nutzt ausschließlich HA-Theme-Variablen
   (`--card-background-color`, `--primary-text-color`, …) und folgt
   `hass.themes.darkMode`. Events rendern als CircleMarker (Punkt) oder als
   `L.geoJSON`-Layer (Lines/Shapes aus dem optionalen `geometry`-Feld).
   Filter-UI (Kategorie-Chips, Radius-Slider mit setzbarem Center per
   Kartenklick, Zeitfenster, Wochentage ganztags oder mit Uhrzeitbereich)
   speist die WebSocket-Abfrage; Ergebnisliste ist nach Distanz sortiert.
   HA-Zonen (inkl. Zuhause) werden als zuschaltbarer Layer direkt aus
   `hass.states` gerendert (`zone.*` hat Lat/Lon/Radius) — HA-Areas/Bereiche
   haben keine Koordinaten und können deshalb nicht dargestellt werden.
   Events mit `time_precision: approximate` erscheinen gestrichelt und
   zeigen `schedule_text` statt konkreter Termine.

4. **ICS-Export** (`ics.py` + `http.py`): HTTP-Endpoint
   `GET /api/chronotope/calendar.ics?token=<secret>` liefert die gefilterten
   Events als gültiges iCalendar (RFC 5545: CRLF, 75-Oktett-Folding,
   Text-Escaping, UTC-Zeiten, RRULE-Passthrough). Der Endpoint ist
   unauthenticated, aber durch ein bei Setup generiertes Token (persistiert
   in `.storage/chronotope`) geschützt — so ist er von Kalender-Clients
   (HA Remote Calendar, CalDAV-Clients, Thunderbird, …) abonnierbar.
   Filter als Query-Parameter: `category` (mehrfach), `lat`/`lon`/`radius`,
   `start`/`end`, `weekday` (mehrfach, 0=Mo), `time_from`/`time_to`.

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
```

`geometry`, `address`, `time_precision` und `schedule_text` sind
Erweiterungen gegenüber dem Minimalschema. Kern-Logik (Radius, Distanz)
nutzt ausschließlich lat/lon.

**Unscharfe Termine:** Das Matching läuft immer über die vorhandene
RRULE-Maschinerie — die Quelle legt eine Best-Effort-RRULE ab
(„Di+Do um 18 oder 20 Uhr" → `FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20`,
„~2x im Monat mittwochs" → `FREQ=WEEKLY;BYDAY=WE`), Filter und Karte
funktionieren dadurch unverändert (Recall vor Präzision: lieber anzeigen
als verpassen). `time_precision: approximate` + `schedule_text` sorgen
dafür, dass UI und ICS-Export die Unschärfe ausweisen („~ mittwochs
18 Uhr, ca. 2x im Monat") statt exakte Termine vorzutäuschen.

## Entwicklung

- **Frontend bauen:** `cd frontend && npm ci && npm run build`
  — schreibt das Bundle nach
  `custom_components/chronotope/frontend/chronotope-panel.js`.
  Das Bundle ist committed (vendored), damit die Integration ohne
  Build-Schritt installierbar ist. Nach Änderungen an `frontend/src/`
  immer neu bauen und das Bundle mitcommitten.
- **Tests:** `python3 -m unittest discover -s tests` — bewusst ohne
  `homeassistant`-Abhängigkeit; getestet werden `store.py` und `ics.py`.
- **Installation:** Repo via HACS (Custom Repository) oder
  `custom_components/chronotope` nach `<config>/custom_components/` kopieren,
  dann Integration „Chronotope" über die UI hinzufügen (Config Flow,
  Single Instance, keine Optionen).

## Konventionen

- `store.py` und `ics.py` importieren kein Home Assistant — nur Stdlib
  und `dateutil`. HA-spezifisches lebt in `__init__.py`, `http.py`,
  `websocket_api.py`, `config_flow.py`.
- Zeiten intern immer UTC-ISO-8601 (`+00:00`); Wochentag-/Uhrzeit-Filter
  werden in der übergebenen IANA-Zeitzone (HA-Konfiguration) ausgewertet.
- Kein CDN, keine externen Requests im Frontend außer OSM-Tiles.
