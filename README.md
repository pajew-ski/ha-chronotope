# ha-chronotope

Domänenoffene Geo-Zeit-Event-Engine als Home-Assistant-Custom-Integration.
Events sind Objekte mit Ort, Zeitspanne und Kategorie aus beliebigen Quellen —
der Kern bleibt domänenneutral.

## Features

- **SQLite-Store** für Events mit Titel, Kategorie, Koordinate, Adresse,
  Zeitspanne, optionaler RRULE-Wiederholung, Quelle, Konfidenz und
  optionalem GeoJSON (Linien/Flächen).
- **Adress-Geo-Cache**: Ein Event mit Adresse und Koordinaten lehrt den
  Cache; künftige Events an derselben Adresse bekommen ihre Koordinaten
  automatisch — Adressen müssen nur einmal geocodiert werden
  (`chronotope/places/lookup` für Scraper).
- **Unscharfe Termine**: „mittwochs 18 Uhr, ca. 2× im Monat" oder „Di+Do
  um 18 oder 20 Uhr" werden als Best-Effort-RRULE gefiltert
  (`FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20`) und mit
  `time_precision: approximate` + `schedule_text` in UI und ICS als
  ungefähr gekennzeichnet (gestrichelte Marker, „~"-Anzeige).
- **WebSocket-API**: Events schreiben, löschen und gefiltert abfragen —
  Kategorie, Radius um einen Punkt (Haversine), Zeitfenster-Überlappung und
  Wochentag-/Uhrzeit-Maske beliebig kombinierbar.
- **Custom Panel** (Lit 3, alles vendored, kein CDN): Leaflet-Karte mit
  OpenStreetMap-Tiles, Light-/Darkmode entlang des HA-Themes, Marker und
  GeoJSON-Layer, Filter-UI, Ergebnisliste nach Distanz sortiert.
  HA-Zonen (inkl. Zuhause) als zuschaltbarer Karten-Layer. Hinweis:
  HA-Areas/Bereiche haben keine Koordinaten — geo-fähig sind nur Zonen.
- **ICS-Export**: `GET /api/chronotope/calendar.ics?token=…` liefert die
  gefilterten Events als RFC-5545-Kalender, abonnierbar von Kalender-Clients
  (z. B. HA Remote Calendar, Thunderbird, CalDAV-Apps). Die Abo-URL inkl.
  Token gibt es per Klick im Panel oder über den WebSocket-Befehl
  `chronotope/ics_url`.

## Installation

1. Repo als Custom Repository in HACS hinzufügen **oder**
   `custom_components/chronotope` nach `<config>/custom_components/` kopieren.
2. Home Assistant neu starten.
3. Integration **Chronotope** über *Einstellungen → Geräte & Dienste*
   hinzufügen (keine Optionen, Single Instance).
4. Das Panel **Chronotope** erscheint in der Seitenleiste.

## WebSocket-API

```js
// Schreiben (Upsert; ohne id wird eine generiert)
{ "type": "chronotope/events/save", "event": {
    "title": "Flohmarkt Boxhagener Platz",
    "category": "market",
    "lat": 52.5104, "lon": 13.4599,
    "start_time": "2026-07-12T10:00:00+02:00",
    "end_time": "2026-07-12T16:00:00+02:00",
    "recurrence": "FREQ=WEEKLY;BYDAY=SU",
    "source_url": "https://example.org", "source_name": "example.org",
    "confidence": "scraped"
} }

// Löschen
{ "type": "chronotope/events/delete", "event_id": "…" }

// Abfragen (alle Filter optional und kombinierbar)
{ "type": "chronotope/events/query",
  "categories": ["market"],
  "center": { "lat": 52.52, "lon": 13.405 }, "radius_km": 5,
  "start": "2026-07-11T00:00:00+02:00", "end": "2026-07-18T00:00:00+02:00",
  "weekdays": [5, 6], "time_from": "10:00", "time_to": "18:00" }

// Kategorien & ICS-Abo-URL
{ "type": "chronotope/categories" }
{ "type": "chronotope/ics_url", "categories": ["market"] }

// Adress-Geo-Cache: bekannte Koordinaten zu einer Adresse abfragen
{ "type": "chronotope/places/lookup", "address": "Boxhagener Platz 1, 10245 Berlin" }

// Unscharfer Termin: „Di+Do um 18 oder 20 Uhr" — Best-Effort-RRULE
// plus Kennzeichnung; Adresse ohne Koordinaten wird aus dem Cache gefüllt
{ "type": "chronotope/events/save", "event": {
    "title": "Lauftreff",
    "category": "sport",
    "address": "Boxhagener Platz 1, 10245 Berlin",
    "start_time": "2026-07-14T18:00:00+02:00",
    "end_time": "2026-07-14T19:30:00+02:00",
    "recurrence": "FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20;BYMINUTE=0",
    "time_precision": "approximate",
    "schedule_text": "jeden Di und Do um 18 oder 20 Uhr"
} }
```

Antworten enthalten `distance_km` (bei Center) und für wiederkehrende Events
die im Fenster gematchten `occurrences`.

## Entwicklung

```sh
# Frontend bauen (Bundle ist committed / vendored)
cd frontend && npm ci && npm run build

# Tests (ohne Home-Assistant-Abhängigkeit)
python3 -m unittest discover -s tests
```

Details zu Architektur und Schema: [CLAUDE.md](CLAUDE.md).
