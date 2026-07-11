# ha-chronotope

Domänenoffene Geo-Zeit-Event-Engine als Home-Assistant-Custom-Integration —
ausgebaut zur Personal-Intelligence-Anwendung: Sie sammelt Events mit Ort,
Zeit und Kategorie aus beliebigen Quellen, filtert sie nach deinen Profilen
und bringt sie dorthin, wo du sie brauchst: Karte, Kalender, Sensoren,
Benachrichtigungen und Kalender-Abos.

## Features

### Kern
- **SQLite-Store** für Events mit Titel, Kategorie, Koordinate, Adresse,
  Zeitspanne, RRULE-Wiederholung, Quelle, Konfidenz, GeoJSON-Geometrie
  (Linien/Flächen) und Nutzer-Flags (Favorit/ausgeblendet).
- **Kombinierbare Filter**: Kategorie, Radius (Haversine), Zeitfenster,
  Wochentag/Uhrzeit-Maske (in HA-Zeitzone, DST-fest), Textsuche, Favoriten.
- **Unscharfe Termine**: „mittwochs 18 Uhr, ca. 2× im Monat" oder „Di+Do um
  18 oder 20 Uhr" als Best-Effort-RRULE (`FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20`)
  mit `time_precision: approximate` + `schedule_text` — gefiltert wie exakte
  Events, aber überall als ungefähr gekennzeichnet.
- **Adress-Geo-Cache**: einmal geocodete Adressen werden wiederverwendet;
  Events mit Adresse ohne Koordinaten bekommen sie automatisch.
- **Dedupe**: gleiche Events aus mehreren Quellen werden gemerged
  (Titel + Zeit ±12 h + Ort ≤300 m bzw. gleiche Adresse); Favoriten überleben.
- **Filterprofile**: benannte Filter-Sets („Sport abends", „Wochenende mit
  Kindern") — sie speisen Panel, Kalender, Sensoren, Digest und ICS-Abos.

### Home-Assistant-Integration
- **Kalender-Entities**: `calendar.chronotope_*` pro Profil + „Alle Events" —
  native HA-Kalenderansicht, Automations-Trigger, Companion-App.
- **Sensoren** pro Profil: nächstes Event (Timestamp + Details als Attribute)
  und Events heute; global ein Statistik-Sensor mit Quellen-Health.
- **Services**: `add_event`, `delete_event`, `query`, `lookup_place`,
  `digest`, `purge`, `backup`, `import_ics`, `import_geojson`, `import_gpx`,
  `extract_event` — alle mit Response-Daten für Skripte/Automationen.
- **Bus-Events**: `chronotope_event_added|updated|deleted`,
  `chronotope_profiles_changed`, `chronotope_nearby`.
- **Näheerkennung**: meldet per `chronotope_nearby`, wenn eine Person im
  Radius eines gerade laufenden Events ist (Optionen: an/aus, Radius) und
  führt daraus automatisch eine **Besuchshistorie** (Geo-Tagebuch).
  `chronotope.match_visits` füllt sie rückwirkend aus der
  Recorder-Positionshistorie (so weit die Retention reicht, Standard 10 Tage).
- **geo_location-Anschluss**: Entities der HA-Geo-Feeds (Erdbeben, GDACS,
  `geo_json_events`, …) erscheinen als Karten-Layer und werden optional
  (Options-Flow) automatisch als Events übernommen — mit rollierendem Ende,
  solange die Meldung aktiv ist.
- **Digest**: „Diese Woche in deiner Nähe" als Text — optional direkt an
  einen notify-Dienst und mit Frei-/Belegt-Abgleich gegen deine Kalender.

### Panel (Karte)
- Lit 3 + Leaflet + Marker-Clustering, alles vendored (kein CDN), Light/Dark
  entlang des HA-Themes, OSM-Tiles.
- GeoJSON-Linien/-Flächen; zuschaltbare Layer für HA-Zonen (inkl. Zuhause),
  Personen (live, mit Foto) und geo_location-Feeds (Hinweis: HA-Areas/
  Bereiche haben keine Koordinaten — geo-fähig sind Zonen).
- Filter-UI mit Profilen, Textsuche, Favoriten, Kategorie-Chips,
  Radius-Slider (Center per Kartenklick), Zeitfenster mit Tages-Slider,
  Wochentagen; Ergebnisliste distanzsortiert mit ★/Ausblenden/„besucht".
- **Event-Editor** im Panel: anlegen, bearbeiten, löschen; Punkt per
  Kartenklick, Linien/Flächen per Klick-Aufzeichnung; Routing-Link (OSM).

### Export & Ingest
- **ICS-Export**: `GET /api/chronotope/calendar.ics?token=…` — gültiges
  RFC-5545-iCalendar, abonnierbar (HA Remote Calendar, Thunderbird, CalDAV).
  Wiederkehrende Events mit TZID+VTIMEZONE (DST-fest). Filter als
  Query-Parameter oder `profile=<Name>`.
- **REST-Ingest**: `POST /api/chronotope/events` für Scraper — ohne
  WebSocket, Token per Query-Param oder `Authorization: Bearer`.
- **Importer**: ICS-Feeds, GeoJSON (Features → Events), GPX (Tracks →
  Strecken-Events).
- **LLM-Extraktion** (experimentell): `chronotope.extract_event` macht aus
  Freitext („Flohmarkt am Boxi, jeden Sonntag 10–16 Uhr") ein strukturiertes
  Event via Conversation-Agent.

## Installation

1. Repo als Custom Repository in HACS hinzufügen **oder**
   `custom_components/chronotope` nach `<config>/custom_components/` kopieren.
2. Home Assistant neu starten.
3. Integration **Chronotope** über *Einstellungen → Geräte & Dienste*
   hinzufügen. Optionen (Zahnrad): Näheerkennung an/aus, Radius.
4. Das Panel **Chronotope** erscheint in der Seitenleiste.

## Rezepte

**Scraper pusht Events (REST):**
```sh
curl -X POST "http://ha.local:8123/api/chronotope/events" \
  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  -d '[{"title": "Flohmarkt Boxhagener Platz", "category": "market",
        "address": "Boxhagener Platz, 10245 Berlin",
        "start_time": "2026-07-12T10:00:00+02:00",
        "end_time": "2026-07-12T16:00:00+02:00",
        "recurrence": "FREQ=WEEKLY;BYDAY=SU",
        "source_name": "example.org", "confidence": "scraped"}]'
```
Die Token-URL liefert der ICS-Button im Panel oder `chronotope/ics_url`.

**Morgen-Digest aufs Handy:**
```yaml
automation:
  - alias: Chronotope Wochenend-Digest
    triggers:
      - trigger: time
        at: "08:00:00"
    conditions:
      - condition: time
        weekday: [sat]
    actions:
      - action: chronotope.digest
        data:
          profile: "Wochenende mit Kindern"
          days: 2
          notify_service: notify.mobile_app_iphone
          check_calendars: [calendar.familie]
```

**„Du stehst neben einem Event":**
```yaml
automation:
  - alias: Chronotope in der Nähe
    triggers:
      - trigger: event
        event_type: chronotope_nearby
    actions:
      - action: notify.mobile_app_iphone
        data:
          title: "In deiner Nähe: {{ trigger.event.data.events[0].title }}"
          message: >-
            {{ trigger.event.data.events[0].category }} –
            {{ trigger.event.data.events[0].address or "auf der Karte" }}
```

**Nachtjob: alte gescrapte Events aufräumen:**
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

## WebSocket-API (für eigene Frontends/Tools)

`chronotope/events/save|delete|flag|query`, `chronotope/categories`,
`chronotope/stats`, `chronotope/profiles/save|delete|list`,
`chronotope/ics_url`, `chronotope/places/lookup` — Filter-Payload:
```js
{ "type": "chronotope/events/query",
  "categories": ["market"], "text": "floh",
  "center": {"lat": 52.52, "lon": 13.405}, "radius_km": 5,
  "start": "2026-07-11T00:00:00+02:00", "end": "2026-07-18T00:00:00+02:00",
  "weekdays": [5, 6], "time_from": "10:00", "time_to": "18:00",
  "favorites_only": false }
```
Antworten enthalten `distance_km` (bei Center), `occurrences` (bei RRULE im
Fenster) und `visits` (Besuchshistorie).

## Entwicklung

```sh
cd frontend && npm ci && npm run build   # Panel-Bundle (committed/vendored)
python3 -m unittest discover -s tests    # Tests ohne HA-Abhängigkeit
```

Architektur-Details: [CLAUDE.md](CLAUDE.md).
