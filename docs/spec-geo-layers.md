# Spezifikation: Geo-Layer für Chronotope

Status: umgesetzt (M0 bis M3 in einem Zug, siehe Abschnitt 13). Ablageort im Repo: `docs/spec-geo-layers.md`.
Leser: Coding Agent (Claude Code) und Reviewer. Sprache wie `CLAUDE.md` (Deutsch, internes Engineering-Dokument); alles Nutzer-Sichtbare bleibt Englisch mit deutscher Lokalisierung.

Diese Datei ist die Quelle, gegen die gebaut wird. Widerspricht ein Issue oder ein Prompt dieser Datei, gilt diese Datei, und der Widerspruch wird im Pull Request benannt.

**Stand der Umsetzung:** Alle Meilensteine sind gebaut. Abschnitt 13 listet die Abweichungen von dieser Spezifikation, die beim Bau entstanden sind; Abschnitt 12 die offenen Punkte mit dem, was beim Bau ermittelt werden konnte. Die Endpunkt-Probes aus Abschnitt 0.5 konnten in der Build-Umgebung nicht laufen (Egress-Policy blockt alle Quell-Hosts außer GitHub). `scripts/probe_sources.py` ist vorhanden; seine Ausgabe fehlt noch im PR und ist vor dem Merge nachzuholen. Endpunkte, die dadurch unverifiziert blieben, sind in 8.x mit „unverifiziert“ markiert.

---

## 0. Arbeitsweise

1. **Vor jeder Änderung `CLAUDE.md` lesen.** Die dortigen Konventionen gelten weiter, soweit Abschnitt 3 sie nicht ausdrücklich erweitert.
2. **Ein Meilenstein, ein Branch, ein Pull Request** (Abschnitt 10). Kein Vorgriff auf spätere Meilensteine. *(Abweichung beim Erstbau: alle Meilensteine in einem Branch auf ausdrückliche Anweisung; siehe 13.1.)*
3. **Nach Änderungen an `frontend/src/` das Bundle neu bauen und mitcommitten.** Die CI prüft den Diff; das gilt auch für jedes neue Bundle (Kartenkarte).
4. **`python3 -m unittest discover -s tests` muss grün sein**, dazu hassfest und die HACS-Validierung.
5. **Endpunkte werden vor der Implementierung live geprüft**, nicht angenommen.
   - Dafür entsteht `scripts/probe_sources.py`: nur Stdlib, nicht in der CI.
   - Das Skript ruft jeden im Meilenstein berührten Endpunkt einmal auf und gibt Status, Content-Type, Größe und ein Schema-Sample aus.
   - Die Ausgabe steht im PR-Text.
   - Weicht ein Endpunkt von Abschnitt 8 ab, gilt der gemessene Stand, und die Abweichung wird in dieser Datei korrigiert, im selben PR.
6. **Im selben PR nachziehen:** `CLAUDE.md` (Architektur, Konventionen), `README.md` (Abschnitt „Layers & data sources“ mit Lizenztabelle), `services.yaml` und `strings.json` bzw. `translations/*`, sofern berührt.
7. **Offene Punkte**, die im Meilenstein nicht entscheidbar sind, stehen im PR-Text unter „Offen“ und in Abschnitt 12 dieser Datei. Sie werden nicht still gelöst.

---

## 1. Ziel und Nicht-Ziele

### Ziel

Chronotope zeigt über Events hinaus **geografische Datenebenen (Layer)** aus öffentlichen Quellen auf seiner Karte:

- bewegte Objekte: Flugzeuge, Satelliten, später Schiffe;
- Ereignisse: Erdbeben, Raketenstarts, Naturereignisse, Konflikte;
- statische Objekte: Infrastruktur, Regionen, Seekabel, Tor-Relays;
- Rasterflächen: Niederschlagsradar, Warnungen, Nachtlichter, Aurora-Oval, Brandherde.

**Motivation:** Nutzer betten solche Dienste heute als iframe-Karten in Dashboards ein. Ein iframe liefert Pixel ohne Daten: nicht filterbar, nicht mit Events kombinierbar, nicht automatisierbar. Chronotope soll diese Einbettungen durch native, kombinierbare Layer ersetzen, im Panel und als Lovelace-Karte.

### Nicht-Ziele

- Kein 3D-Globus und kein Renderer-Wechsel. Leaflet bleibt; die Layer liefern renderer-neutrales GeoJSON, damit ein späterer Wechsel nur den Adapter betrifft.
- Kein Wissensgraph, kein RDF-Export, kein Peering.
- Kein Supervisor-Add-on. Alles läuft in der Integration und funktioniert auf jeder HA-Installationsart.
- Keine Personensuche, keine Gesichtserkennung, kein Tracking von Individuen, keine Kamera-Feeds (CCTV).
- Kein Nachbau fremder Oberflächen (Cockpit, HUD, Shader).

---

## 2. Begriffe

| Begriff | Bedeutung |
|---|---|
| **Provider** | Code, der eine externe Quelle abfragt und normalisiert. Eingebaut (Python) oder generisch (URL-Template). |
| **Layer** | Eine darstellbare Ebene. Ein Provider kann mehrere Layer liefern (z. B. CelesTrak je Gruppe). |
| **Layerklasse** | `tracks` (bewegt, flüchtig), `events` (Ort und Zeit, im Store), `features` (statisch oder langsam, flüchtig gecacht), `raster` (Kacheln oder WMS, vom Browser geladen), `grid` (Rasterwerte als JSON, clientseitig eingefärbt). |
| **Katalog** | Liste aller eingebauten Layer mit Metadaten (Abschnitt 5.1), im Code. |
| **Layer-Konfiguration** | Nutzerseitige Aktivierung und Parameter je Layer, im Store (Abschnitt 5.2). |
| **Frische** | Zustand je Layer: `fresh`, `stale`, `error`, `disabled`, `blocked`. |

---

## 3. Invarianten

Jede Invariante ist im Review prüfbar. Verstöße sind Blocker.

- **I1 Kern ohne Netz.** `store.py`, `ics.py`, `importers.py` und das neue `feeds_parse.py` importieren kein Home Assistant und machen keine Netzwerkaufrufe. Parser sind reine Funktionen `bytes|str -> dict`.
- **I2 Netz nur in der Feed-Schicht.** Externe Requests der Integration entstehen ausschließlich in `custom_components/chronotope/feeds/`.
  - Jede Quelle ist opt-in und standardmäßig aus.
  - Die bestehende Regel „externe Requests nur nutzerinitiiert“ gilt für alles außerhalb dieses Pakets unverändert.
- **I3 Tracks sind flüchtig.** Bewegte Objekte werden weder in SQLite geschrieben noch als HA-Entities angelegt. Sie leben im Speicher der Feed-Schicht. HA-Entities entstehen nur als feste, kleine Menge von Aggregat-Sensoren.
- **I4 Keine Fremddaten im Repo.** Datensätze werden zur Laufzeit geholt und auf Platte gecacht (`<config>/chronotope_cache/`), nie committet. Test-Fixtures sind synthetisch.
- **I5 Attribution ist sichtbar**, sobald ein Layer aktiv ist, im Leaflet-Attribution-Control, mit Link. Nicht-kommerzielle Lizenzen tragen im Layerkatalog einen sichtbaren Hinweis.
- **I6 Externe Strings sind nie Markup.**
  - Popups und Tooltips werden als DOM-Knoten mit `textContent` gebaut.
  - `bindTooltip(string)` und `bindPopup(string)` mit Fremdtext sind verboten, ebenso Template-Interpolation in `innerHTML`/`html`-Strings von Leaflet `divIcon`.
  - Gilt rückwirkend für die bestehenden Geo-Feed-Tooltips und das Personenbild (Abschnitt 7.9).
- **I7 Höflichkeit gegenüber Quellen** (Abschnitt 6.5).
  - Mindestintervall je Quelle, bedingte Requests, wo möglich.
  - Stopp bei unerwarteten Nicht-200-Antworten.
  - Der Zeitpunkt des letzten Abrufversuchs wird persistiert, damit ein Neustart das Intervall nicht umgeht.
- **I8 Budgets.** Jeder Provider hat Obergrenzen für Antwortgröße, Feature-Zahl und Abrufe pro Stunde. Überschreitung setzt den Layer auf `error` und liefert den letzten guten Stand weiter.
- **I9 Authentifizierte Datenwege.** Neue HTTP-Views verlangen HA-Authentifizierung (`requires_auth = True`). Der Panel ruft sie mit dem HA-Token. Token-geschützte, unauthentifizierte Views bleiben auf ICS und Ingest beschränkt.
- **I10 Panel lädt keine Fremd-JSON direkt.**
  - Daten-Layer (`tracks`, `events`, `features`, `grid`) kommen ausschließlich über die eigenen HA-Views.
  - Nur `raster`-Kacheln und WMS-Bilder lädt der Browser direkt vom Anbieter, wie heute die OSM-Kacheln. Das legt die IP des Betrachters gegenüber dem Anbieter offen und wird in der README genannt.
- **I11 Degradation statt Ausfall.** Fällt eine Quelle aus, zeigen alle anderen Layer weiter an. Ein Layer mit Fehler zeigt seinen letzten guten Stand mit `stale`-Markierung.
- **I12 Schreibpfade feuern Signale.** Provider, die Events speichern, rufen `notify_event_change` (bestehende Regel aus `CLAUDE.md`).

---

## 4. Architektur

```
custom_components/chronotope/
  feeds/
    __init__.py        Aufbau und Abbau aller aktiven Provider je Config-Entry (FeedManager)
    base.py            FeedProvider-Basisklasse: Loop, Budget, Politeness, Cache, Frische
    policy.py          Backoff, Circuit-Breaker, persistierte Abrufzeitpunkte (HA-frei; Persistenz im Manager)
    catalog.py         eingebauter Layerkatalog (Abschnitt 5.1), Presets, Basiskarten (HA-frei)
    providers/
      adsb_lol.py      tracks: Flugzeuge regional (mit OpenSky-Rückfall), Militär global
      opensky.py       tracks: Flugzeuge, Rückfallquelle
      celestrak.py     tracks: Bahnelemente (OMM), Propagation im Browser
      ll2.py           events: Raketenstarts
      usgs.py          events: Erdbeben
      eonet.py         events: Naturereignisse
      ucdp.py          events: Konflikte (Candidate-CSV, API mit Token)
      swpc.py          grid: Aurora-Oval, Sensor: Kp
      onionoo.py       features: Tor-Relays
      overpass.py      features: Rechenzentren, Talsperren (bbox-begrenzt)
      natural_earth.py features: Regionen, Ländergrenzen
      telegeography.py features: Seekabel
      radio_browser.py features: Radiosender
      aisstream.py     tracks: Schiffe (Schlüssel, M3)
      firms.py         events: Brandherde (Schlüssel, M3)
      gfw.py           events: Fischerei-Ereignisse (Schlüssel, M3)
      choropleth.py    Basis für Choroplethen über countries (M3)
      unhcr.py         features: Fluchtbewegungen als Choroplethe (M3)
      ioda.py          features: Internetausfälle als Choroplethe (M3)
      generic.py       features: geojson_url
    views.py           HTTP-Views für Layerdaten und Legenden
  feeds_parse.py       HA-freie Parser je Provider (I1)
  layers_ws.py         WebSocket-Befehle für Layer
frontend/src/
  layers/
    registry.js        Katalog, Aktivierung, Polling je Layer, Frische
    canvas-base.js     Canvas-Layer-Basis
    render-points.js   Canvas-Punkte mit optionaler Kursrotation
    render-geojson.js  Linien und Flächen, Choroplethen
    render-raster.js   XYZ, WMTS, WMS
    render-grid.js     Rasterwerte als eingefärbtes Canvas
    satellites.js      OMM -> Position via satellite.js, Bodenspur
    interpolate.js     verzögertes Rendern und Interpolation für Flugzeuge
    attribution.js     Credits aktiver Layer
    popup.js           Popups als DOM (I6)
  layer-panel.js       UI: Layerliste, Schalter, Frische, Lizenzhinweis
  card.js              Einstiegspunkt der Lovelace-Karte
  define.js            Custom Elements nur einmal registrieren (Panel + Karte)
```

**Datenfluss:**
1. Provider-Coordinator ruft die Quelle ab.
2. `feeds_parse` normalisiert in das GeoJSON-Profil (5.3).
3. Je nach Klasse:
   - `tracks`/`features`/`grid`: Speicher-Cache plus Platten-Cache.
   - `events`: `store.save_event(dedupe=False)` (stabile IDs, Upsert) plus `notify_event_change`.
4. Der Panel pollt `GET /api/chronotope/layers/{id}/data` im Layer-Intervall und rendert.

**Warum im Coordinator und nicht im Browser:** Budgets und Politeness gelten je Installation statt je Tab, Schlüssel verlassen den Server nicht, Caches überleben Neustarts.

**Erweiterbarkeit:** Ein späterer Umzug einzelner Provider in einen externen Dienst ändert nur die Datenquelle hinter `views.py`, nicht den Panel-Vertrag.

---

## 5. Datenmodell

### 5.1 Katalogeintrag (Code, `feeds/catalog.py`)

```python
LayerSpec(
    id="flights_regional",          # stabil, [a-z0-9_]
    provider="adsb_lol",
    klass="tracks",                 # tracks|events|features|raster|grid
    title_key="layer.flights_regional",   # i18n-Schlüssel im Panel
    default_enabled=False,
    min_interval_s=10,              # Untergrenze, vom Nutzer nicht unterschreitbar
    default_interval_s=15,
    params_schema={...},            # JSON-serialisierbare Beschreibung (number|enum|latlon|bbox|const), siehe 13.3
    requires_key=None,              # oder "aisstream", "firms", "gfw", "ucdp"
    attribution=("adsb.lol contributors (ODbL 1.0)", "https://adsb.lol"),
    license=LicenseInfo(id="ODbL-1.0", url="https://opendatacommons.org/licenses/odbl/1-0/",
                        noncommercial=False, notes=None),
    budget=Budget(max_bytes=5_000_000, max_features=5_000, max_calls_per_hour=400),
    retention_days=None,            # nur events: Aufbewahrung in Tagen
    style={"icon": "aircraft", "rotate_by": "track"},
)
```

Generische Layer (`raster` und `features` per URL) haben keinen Eintrag im Katalog, sondern entstehen aus der Layer-Konfiguration (5.2) mit `provider` in `xyz | wmts | wms | geojson_url`.

### 5.2 Layer-Konfiguration (Store, neue Tabelle `layers`)

Gleiche Bauart wie `profiles`: `id TEXT PRIMARY KEY, payload TEXT (JSON), updated_at TEXT`. Migration über den bestehenden Mechanismus (`CREATE TABLE IF NOT EXISTS` beim Öffnen).

Payload:
- **Eingebaut:** `{ "layer_id": "flights_regional", "enabled": true, "interval_s": 15, "params": {...}, "opacity": 1.0 }`
- **Generisch:** `{ "id": "custom_<hex>", "provider": "wms", "title": "...", "enabled": true, "url": "...", "params": {"layers": "...", "format": "image/png", "transparent": true}, "attribution": {"text": "...", "url": "..."}, "license_note": "...", "opacity": 0.7, "min_zoom": 0, "max_zoom": 18 }`

**Validierung generischer Layer:**
- URL-Schema nur `https`.
- `xyz`/`wmts` verlangen `{z}`, `{x}`, `{y}` oder `{TileMatrix}` usw.
- `geojson_url` wird serverseitig geholt (I10) und unterliegt einem Budget von 10 MB und 50 000 Features.
- `attribution.text` ist Pflicht.

**Presets:** `feeds/catalog.py` enthält eine Liste vorkonfigurierter generischer Layer (Abschnitt 8.4). Sie werden auf Knopfdruck als Konfiguration angelegt. Presets sind URL-Templates, keine Daten.

Schlüssel liegen nicht im Store, sondern in den Optionen des Config-Entry (Abschnitt 6.3).

### 5.3 GeoJSON-Profil der Datenantwort

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "adsb:3c6444",
      "geometry": { "type": "Point", "coordinates": [12.1, 49.0, 10972] },
      "properties": {
        "label": "DLH4AB",
        "kind": "aircraft",
        "ts": "2026-09-17T12:00:05Z",
        "track": 273.0,
        "speed_ms": 231.5,
        "alt_m": 10972,
        "detail": { "icao24": "3c6444", "type": "A20N", "squawk": "1000" }
      }
    }
  ],
  "meta": {
    "layer_id": "flights_regional",
    "fetched_at": "2026-09-17T12:00:07Z",
    "source_time": "2026-09-17T12:00:05Z",
    "freshness": "fresh",
    "stale_since": null,
    "attribution": { "text": "...", "url": "..." },
    "truncated": false,
    "count": 1
  }
}
```

**Koordinaten** folgen RFC 7946: Länge, Breite, optional Höhe in Metern.

**`properties`:**
- `label`, `kind`, `ts` sind Pflicht.
- Alles Quellspezifische liegt unter `detail`; der Panel zeigt `detail` als Schlüssel-Wert-Tabelle, nur als Text (I6).

**Sonderfälle:**
- **`grid`-Layer** antworten statt mit `features` mit `{"grid": {"lon0":0,"lat0":-90,"dlon":1,"dlat":1,"nx":360,"ny":181,"values":[...]}, "meta": {...}}`.
- **CelesTrak** antwortet mit `{"omm": [...], "meta": {...}}`, weil die Position im Browser entsteht (7.3).

Zusätzlich liefert `meta` in der Umsetzung `klass`, `license`, `interval_s`, `style`, `last_error` sowie providerspezifische Felder (`group`, `kp`, `fallback`, `zoom_in`, `pending`, `unknown_codes`, `vmax`, `dropped_*`).

### 5.4 Abbildung auf Events (Klasse `events`)

| Event-Feld | Belegung |
|---|---|
| `id` | `feed:<provider>:<externe_id>` (stabil, damit Upsert statt Dublette) |
| `title` | Bezeichnung der Quelle |
| `category` | fachlich und stabil: `earthquake`, `launch`, `natural:<eonet-kategorie>`, `conflict`, `fishing`, `fire` |
| `lat`, `lon` | Punkt; Flächen zusätzlich in `geometry` |
| `start_time`, `end_time` | Ereigniszeit; ohne Ende gilt `start + default_duration` je Provider (Erdbeben 1 h, Start 2 h bzw. Fensterende, Naturereignis bis `closed` oder rollierend wie `geoloc.py`, Brandherd 12 h) |
| `source_name` | Provider-Name, z. B. `USGS` |
| `source_url` | Detailseite der Quelle |
| `confidence` | `scraped` |
| `scraped_at` | Abrufzeit |
| `raw_description` | kurzer Klartext (Magnitude, Rakete, Todesopfer ...), kein Markup |

**Aufbewahrung:** Ein Provider mit `retention` räumt nach jedem Lauf seine eigenen Events älter als die Aufbewahrung ab. Er löscht dabei nur Einträge mit seinem ID-Präfix und nie Events mit `favorite = 1`.

---

## 6. Schnittstellen

### 6.1 WebSocket

| Befehl | Zweck |
|---|---|
| `chronotope/layers/catalog` | eingebaute Layer mit Metadaten, Presets, Basiskarten, `requires_key` und ob der Schlüssel gesetzt ist (bool, nie der Wert), `layers_enabled`, `home_center` |
| `chronotope/layers/list` | Konfigurationen aller Layer inkl. Frische und `missing_key` |
| `chronotope/layers/save` | eingebauten Layer aktivieren/parametrisieren oder generischen anlegen/ändern |
| `chronotope/layers/delete` | generischen Layer entfernen |
| `chronotope/layers/status` | Frische aller aktiven Layer (für periodische Anzeige) |
| `chronotope/layers/preview` | Validierung plus ein Testabruf für generische Layer (7.1) |

Speichern oder Löschen startet bzw. stoppt den zugehörigen Coordinator ohne Neuladen des Entry.

### 6.2 HTTP (authentifiziert, I9)

- **`GET /api/chronotope/layers/{id}/data`**
  - Optional `bbox=minLon,minLat,maxLon,maxLat` und `zoom=`.
  - Für `features` mit großem Bestand (Overpass, Onionoo, Radio) filtert der Server nach `bbox`. Für `tracks` gilt der konfigurierte Radius.
  - Antwort nach 5.3.
  - Kompression, `ETag` und `Cache-Control: no-cache`; `If-None-Match` wird mit 304 beantwortet.
- **`GET /api/chronotope/layers/{id}/legend`**: für WMS-Layer ein Proxy auf `GetLegendGraphic` (1 MB Cap).

### 6.3 Options-Flow

**Bestehende Seite** um drei Einträge erweitert:
- Gesamtschalter „Enable data layers“ (Standard aus).
- Standardmittelpunkt für regionale Layer (Standard: HA-Heimatkoordinaten, nur gespeichert, wenn geändert).
- Allow-Liste für die `geoloc`-Brücke (7.10), kommagetrennt.

**Zweiter Schritt „API keys“** mit optionalen, maskierten Feldern:
- AISStream
- NASA FIRMS MAP_KEY
- Global Fishing Watch
- UCDP
- OpenSky client_id:client_secret
- Launch Library Token

Werte liegen in `entry.options`, werden nie über WS oder HTTP ausgegeben und nie geloggt.

### 6.4 Sensoren (feste Menge, I3)

- **`sensor.chronotope_statistics` erweitert:** Attribut `layers` mit `{layer_id: {freshness, last_success, last_error, count}}`.
- **Neu, nur wenn der jeweilige Layer aktiv ist:**
  - `sensor.chronotope_aircraft_nearby`: Anzahl im Radius. Attribute `nearest_label`, `nearest_distance_km`, `nearest_alt_m`.
  - `sensor.chronotope_kp_index`: aus SWPC.
  - `sensor.chronotope_aurora_probability_at_home`: Gitterwert am Mittelpunkt.
  - `sensor.chronotope_vessels_nearby`: M3.
- Keine Entity je Objekt.

### 6.5 Politeness und Fehlerbehandlung (`feeds/policy.py`)

- **User-Agent:** `ha-chronotope/<version> (+https://github.com/pajew-ski/ha-chronotope)`.
- **Bedingte Requests:** `If-Modified-Since`/`If-None-Match`, wo die Quelle sie unterstützt (Onionoo verlangt es ausdrücklich).
- **Persistenz:** `last_attempt`, `last_success`, `etag`, `last_modified`, `blocked_until` je Provider über `homeassistant.helpers.storage.Store` (`.storage/chronotope_feeds`, geschrieben vom Manager). Beim Start wird vor dem ersten Abruf gegen `min_interval_s` geprüft.
- **Timeout** 20 s, Antwortgröße gegen das Budget prüfen (Streaming mit Abbruch).
- **Backoff** exponentiell (60 s · 2^n) bis 1 h bei 5xx und Timeout.
- **Circuit-Breaker:** nach 5 Fehlschlägen in Folge Zustand `error`, dann ein Versuch pro Stunde.
- **Blocker-Codes** (401, 403, 404, 3xx ohne erlaubten Redirect, 429): Zustand `blocked`, keine automatische Wiederholung vor Ablauf von `Retry-After` bzw. 6 h, Log-Warnung einmal je Übergang.
  - Ausnahme CelesTrak: ein 403 mit Hinweis „data has not updated“ ist der normale Fall und gilt als Erfolg ohne neue Daten (8.1).
- **Platten-Cache:** Letzter guter Stand je Layer in `<config>/chronotope_cache/<layer_id>.json.gz`, beim Start geladen.

---

## 7. Frontend

### 7.1 Layer-Panel

- **Abschnitt „Layers“ in der Filterleiste**, einklappbar, gruppiert nach Klasse.
  - Je Layer: Schalter, Titel, Frischepunkt (grün/gelb/rot/grau) mit Tooltip (letzter Erfolg, Fehler), Deckkraft-Regler für `raster`/`grid`/`features`, Zahnrad für Parameter.
  - Nicht-kommerzielle Lizenz: Badge „NC“ mit Erklärung.
  - Fehlender Schlüssel: Schalter deaktiviert mit Hinweis auf den Options-Flow.
- **„Add layer“:**
  - Presets auswählen (8.4) oder generischen Layer anlegen (Typ, URL, Parameter, Attribution Pflicht).
  - Dazu eine Vorschau mit einer Testkachel bzw. einem Testabruf über den Server; Speichern erst nach erfolgreichem Test.
- **Zustand:** Layerzustand gehört zum Panelzustand.
  - `STORAGE_KEY` ist `chronotope-panel-state-v2`, mit Migration aus v1 (Basiskarte, Zustand der Layer-Leiste).
  - Profile bekommen ein optionales Feld `filters.layers: [ids]`; beim Anwenden eines Profils werden dessen Layer aktiviert, andere bleiben unverändert.

### 7.2 Rendering

- **Canvas statt DOM:** Eigene Canvas-Layer je Datenlayer (`canvas-base.js`); Punkte als Canvas-Symbol mit Rotation für `rotate_by`; Linien/Flächen über einen gemeinsamen `L.canvas()`-Renderer.
- **Kein Clustering** für `tracks`. Für `features` gilt Canvas-Rendering plus serverseitige bbox-Filterung statt Clustering (Messung: Canvas trägt zehntausende Punkte, siehe 13.6).
- **Z-Reihenfolge von unten:** Basiskarte, `raster`, `grid`, `features`-Flächen, Events, `features`-Punkte, `tracks`, Geo-Feeds, Zonen/Personen, Auswahl.
- **Popups** als DOM (I6): Titel, Quelle mit Link, Zeit, `detail`-Tabelle.
- **Nachladen:** Polling je Layer mit dessen Intervall, pausiert bei `document.hidden` und wenn der Layer aus ist. Beim Kartenverschieben für bbox-Layer mit 500 ms Debounce.

### 7.3 Satelliten (`satellites.js`)

- **Bibliothek:** `satellite.js` 6.0.2 (MIT) als Abhängigkeit, vendored per esbuild; `json2satrec` verarbeitet OMM direkt (Katalognummern ab 100000 brauchen kein TLE). Version 7.x bringt WASM-/Node-Abhängigkeiten mit, die esbuild im Browser-Bundle nicht auflösen kann; daher der Pin auf 6.0.x.
- **Takt:** Propagation einmal pro Sekunde für sichtbare Objekte, sonst alle 10 s.
- **Darstellung:** Punkte nach Gruppe eingefärbt; Klick zeigt Bodenspur ±45 min und Höhe.
- **Grenzen:** höchstens 3000 Objekte gleichzeitig (Budget); die Gruppe `active` ist nur mit Warnung wählbar.

### 7.4 Flugzeuge (`interpolate.js`)

- **Verzögert rendern:** Darstellung um ein Abfrageintervall hinter der Echtzeit, lineare Interpolation zwischen zwei bekannten Positionen.
- **Dead Reckoning** aus `track` und `speed_ms` bis zu 2 Intervalle, danach Objekt ausblenden.
- **Trail:** kurzer Schweif der letzten 60 s, nur für das ausgewählte Objekt.
- **Herkunft:** Eigenimplementierung; keine Übernahme aus God's Eye View (`THIRD_PARTY_NOTICES.md`).

### 7.5 Raster und WMS

- **Bibliotheken:** `L.tileLayer` für XYZ/WMTS-REST, `L.tileLayer.wms` für WMS, jeweils ohne `crossOrigin`.
- **Zeitparameter** (GIBS `{Time}`) werden je Preset berechnet (heute UTC, bei Kachelfehler einmal gestern; `yearly-latest` für Black Marble).
- **Dunkelmodus:** Der bestehende CSS-Invert-Filter gilt nur für die Basiskarte, nicht für Daten-Raster; Luftbilder (`invert_dark: false`) werden nie invertiert.

### 7.6 Basiskarten-Umschalter

Umschalter für die Basiskarte:
- OSM (Standard, bestehend)
- BKG TopPlusOpen (WMS, Layer `web`, unverifiziert)
- Esri World Imagery

Jeweils mit Pflicht-Attribution. Die Auswahl gehört zum Panelzustand.

### 7.7 Attribution

`attribution.js` pflegt das Leaflet-Attribution-Control: Basiskarte plus alle aktiven Layer, jeweils als Link. Ab fünf Einträgen einklappbar („+N weitere Quellen“), aber immer vorhanden (I5).

### 7.8 Deep-Link und Lovelace-Karte

**Deep-Link:** Panel-URL-Parameter `?layers=a,b&lat=..&lon=..&z=..&profile=..&base=..`. Sie überschreiben beim Laden den gespeicherten Zustand, ohne ihn dauerhaft zu ersetzen (bei vorhandenen Parametern wird nicht persistiert).

**Lovelace-Karte `custom:chronotope-map-card`:**
- Eigener esbuild-Einstiegspunkt `custom_components/chronotope/frontend/chronotope-card.js`.
- Registriert über `frontend.add_extra_js_url` mit Cache-Buster wie beim Panel.
- Die CI prüft auch dieses Bundle.

Konfiguration:

```yaml
type: custom:chronotope-map-card
layers: [flights_regional, satellites_visual]
center: [lat, lon]        # optional, Standard HA-Heimat
zoom: 8                   # optional
base: osm                 # osm | topplus | esri_imagery
profile: <id-oder-name>   # optional, zeigt Events des Profils
show_events: true
show_layer_toggle: true   # kompakter Umschalter in der Karte
height: 100%              # auch in Panel-Views
```

**Verhalten:**
- Die Karte nutzt `chronotope-map-view` und die Layer-Registry, ohne Filterleiste. Sie zeigt nur Layer, die im Panel aktiviert sind, und startet keine Provider.
- Ein Editor (`getConfigElement`) ist nicht enthalten; YAML genügt.
- In einer Panel-View füllt die Karte die Fläche (`height: 100%`).

### 7.9 Sicherheitskorrekturen im Bestand (M0)

- **`_renderGeoMarkers`:** Canvas-Layer, Popup als DOM-Knoten statt String, weil Feed-Namen Fremdtext sind.
- **`_renderPersons`:** `entity_picture` nicht in `html`-String interpolieren; `img`-Element per DOM erzeugen, `src` setzen. Zonen-Tooltips ebenfalls als DOM.

### 7.10 `geoloc`-Brücke

- **Neue Option:** Allow-Liste der Quellen (`source`-Attribut), Standard „alle außer `blitzortung`“. Blitzeinschläge fluten sonst den Store.
- **Blitze** sind Aufgabe der bestehenden Geo-Feed-Ebene im Panel, die `geo_location.*` direkt aus `hass.states` liest. Diese Ebene läuft auf dem Canvas-Renderer (7.2), damit viele Einschläge flüssig bleiben.

### 7.11 Lokalisierung

Jeder neue String hat Einträge in `frontend/src/i18n.js` (en und de) bzw. `translations/*.json`.

---

## 8. Quellenkatalog

Legende Meilenstein: M1 schlüssellos, GEV-Parität; M2 schlüssellos, erweitert; M3 Schlüssel oder aufwändig.
„Unverifiziert“ heißt: in der Build-Umgebung nicht per `probe_sources.py` prüfbar (Egress-Policy); aus Dokumentation implementiert.

### 8.1 Bewegte Objekte (`tracks`)

| Layer-ID | Quelle | Endpunkt | Auth | Lizenz / Bedingungen | Intervall | M |
|---|---|---|---|---|---|---|
| `flights_regional` | adsb.lol | `https://api.adsb.lol/v2/lat/{lat}/lon/{lon}/dist/{nm}` (nm ≤ 250), unverifiziert | keine (ob inzwischen Schlüssel nötig: offen, 12.1) | ODbL 1.0, Attribution | 15 s (min 10) | M1 |
| `flights_military` | adsb.lol | `https://api.adsb.lol/v2/mil`, unverifiziert | keine | ODbL 1.0 | 60 s (min 30) | M1 |
| `flights_opensky` | OpenSky Network | `https://opensky-network.org/api/states/all?lamin=&lomin=&lamax=&lomax=` | anonym oder OAuth-Client (`api_key_opensky` = `client_id:client_secret`, Token-Endpunkt Keycloak) | nicht kommerziell; operativer Einsatz kann eine Vereinbarung verlangen; Zitation Schäfer et al. 2014 | 60 s anonym | M1, nur Rückfall |
| `satellites_<gruppe>` | CelesTrak | `https://celestrak.org/NORAD/elements/gp.php?GROUP=<gruppe>&FORMAT=json` | keine | US-Regierungsdaten, Zitation „CelesTrak, T.S. Kelso“ | einmal je 2 h je Gruppe | M1 |
| `vessels` | AISStream | `wss://stream.aisstream.io/v0/stream`, Abo mit `APIKey`, `BoundingBoxes`, `FilterMessageTypes: [PositionReport]` | Schlüssel | Beta ohne formale Nutzungsbedingungen, Attribution „AISStream.io“ | Stream, Ausgabe im Panel alle 10 s | M3 |

**adsb.lol, Normalisierung:** `hex` → `detail.icao24`, `flight` → `label` (getrimmt, Fallback `hex`), `lat`/`lon`, `alt_baro` in ft → m (Wert `ground` → 0 und `detail.on_ground=true`), `track`, `gs` in kn → m/s, `t` → `detail.type`, `seen_pos` und `now` (ms) für `ts`, `dbFlags & 1` → `detail.military`.

**OpenSky** nur, wenn adsb.lol `blocked` (Blocker-Code) oder dreimal in Folge fehlgeschlagen ist; dann für die Dauer von `Retry-After`, sonst 6 h bzw. 1 h, mit Intervall ≥ 60 s. **Nie beide gleichzeitig abfragen:** ein Zyklus fragt adsb.lol und wendet sich nur nach dessen Scheitern an OpenSky; der eigenständige Layer `flights_opensky` bleibt untätig, solange `flights_regional` läuft.

**CelesTrak:**
- **Gruppen:** Standard `stations` und `visual`; wählbar `starlink`, `gps-ops`, `weather`, `active` (Warnung, auf 3000 gekappt).
- **Mindestabstand:** Persistierter Abrufzeitpunkt, kein Abruf unter 2 h, auch nicht nach Neustart.
- **Bekannter 403-Fall:** Ein 403, dessen Body sagt, dass die Daten nicht aktualisiert wurden („not updated“, „already downloaded“), ist Erfolg ohne neue Daten.
- **Jede andere Nicht-200-Antwort:** Zustand `blocked`, 6 h Pause, Warnung.
- **Keine Redirects folgen**; Domain ist `celestrak.org`.

**AISStream (M3):**
- **Abo:** Websocket mit bbox aus dem Layerradius, hartes Limit 2000 Schiffe und 50 Nachrichten/s; Überschuss wird verworfen und gezählt (`meta.dropped_rate`, `meta.dropped_capacity`).
- **Verbindung:** Reconnect mit Policy-Backoff. Die Verbindung besteht nur, solange der Layer aktiv ist; `async_stop` schließt sie.
- **Abdeckung** in Binnengewässern ist vor produktivem Einsatz zu messen und in der README zu nennen (12.11).

### 8.2 Ereignisse (`events`)

| Layer-ID | Quelle | Endpunkt | Auth | Lizenz / Bedingungen | Intervall | Aufbewahrung | M |
|---|---|---|---|---|---|---|---|
| `earthquakes` | USGS | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/{magnitude}_{period}.geojson` (Parameter `magnitude`: `significant`, `4.5`, `2.5`, `all`; `period`: `hour`/`day`/`week`) | keine | US Public Domain, Hinweis „Data courtesy of the U.S. Geological Survey“ | 5 min | 7 Tage | M1 |
| `launches` | The Space Devs, Launch Library 2 | `https://ll.thespacedevs.com/2.3.0/launches/upcoming/` und `/launches/previous/` (`?limit=50&mode=normal`), unverifiziert | keine, optional Token (`Authorization: Token`) | freie Nutzung; nicht ohne Mehrwert weiterleiten; Attribution erwünscht; anonym 15 Aufrufe je Stunde | 30 min (min 15), beide Endpunkte abwechselnd | 30 Tage nach Start | M1 |
| `natural_events` | NASA EONET v3 | `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&days=60` (JSON mit Geometrieliste; der Parser versteht auch die GeoJSON-Variante), unverifiziert | keine | NASA, gemeinfrei | 30 min | bis geschlossen plus 7 Tage; verschwundene Events werden geschlossen | M2 |
| `conflicts` | UCDP Candidate | monatliche CSV unter `https://ucdp.uu.se/downloads/candidateged/` (aktuelle Datei per Downloadseite, Muster `GEDEvent_v<jj>_<0>_<m>.csv`), unverifiziert | keine | CC BY 4.0 (zu prüfen), Zitation laut Codebook | täglich prüfen, neu laden nur bei neuer Version | 90 Tage ab Ereignisdatum | M2 |
| `conflicts_api` | UCDP API | `https://ucdpapi.pcr.uu.se/api/gedevents/<version>` (Param `version`, Default `25.1`) mit Header `x-ucdp-access-token`, unverifiziert | Token | wie oben | täglich | 90 Tage | M3 |
| `fires` | NASA FIRMS | `https://firms.modaps.eosdis.nasa.gov/api/area/csv/{MAP_KEY}/VIIRS_SNPP_NRT/{w},{s},{e},{n}/1`, unverifiziert | Schlüssel | gemeinfrei, Danksagung laut FIRMS | 30 min | 48 h | M3 |
| `fishing` | Global Fishing Watch | `https://gateway.api.globalfishingwatch.org/v3/events?datasets[0]=public-global-fishing-events:latest&start-date&end-date&limit&offset`, bbox-Filter serverseitig in Chronotope, unverifiziert | Token (Bearer) | GFW-Nutzungsbedingungen (zu prüfen) | 6 h | 30 Tage | M3 |
| `disasters_gdacs` | GDACS | über die HA-Core-Integration `gdacs` und die `geoloc`-Brücke | keine | laut Integration | laut Integration | laut Brücke | Doku |
| `lightning` | Blitzortung | nur über die HACS-Integration `blitzortung` (`geo_location.lightning_strike_*`), Darstellung über die Geo-Feed-Ebene | keine | Blitzortung verbietet Drittanwendungen die Direktverbindung; **Chronotope ruft Blitzortung nie selbst ab** | laut Integration | nicht gespeichert (7.10) | Doku, M0 |

**Kategorien:**
- `earthquake`: `raw_description` „M{mag} {place}, depth {km} km“, `source_url` = `properties.url`.
- `launch`: Position aus `pad.latitude/longitude` (String oder Zahl), Titel = Mission, `raw_description` = Rakete, Anbieter, Status, Ort. `end_time` = max(`net` + 2 h, `window_end`).
- `natural:<kategorie>`: Geometrie, deren letzter Punkt `lat`/`lon` bestimmt (Polygone über den Ringschwerpunkt). Die komplette Punktfolge steht als `LineString` in `geometry`, wenn mehr als ein Punkt vorliegt.
- `conflict`: Position aus `latitude`/`longitude`; `raw_description` = Konflikttyp, Akteure, Schätzung der Todesopfer (best), Ort. Zeit aus `date_start`/`date_end` (Ende plus ein Tag, Tagesgenauigkeit).

### 8.3 Statische und langsame Objekte (`features`)

| Layer-ID | Quelle | Endpunkt | Auth | Lizenz / Bedingungen | Aktualisierung | M |
|---|---|---|---|---|---|---|
| `datacenters` | OpenStreetMap über Overpass | `https://overpass-api.de/api/interpreter` (POST), Abfrage `nwr["telecom"="data_center"](bbox)` und `nwr["building"="data_center"](bbox)`, `out center tags` | keine | ODbL 1.0, „© OpenStreetMap contributors“; Overpass-Nutzungsregeln | bbox-Kachelcache, 7 Tage | M2 |
| `dams` | OpenStreetMap über Overpass | `nwr["waterway"="dam"](bbox)`, `out center tags` | keine | ODbL 1.0 | bbox-Kachelcache, 7 Tage | M2 |
| `regions` | Natural Earth | `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_1_states_provinces.geojson` (Tag v5.1.2 als Pin) | keine | Public Domain, Hinweis „Made with Natural Earth“ | einmalig (Jahresintervall), Cache | M2 |
| `countries` | Natural Earth | `.../v5.1.2/geojson/ne_110m_admin_0_countries.geojson` (verifiziert: 200, 839 kB) | keine | Public Domain | einmalig | M3 (Basis für Choroplethen) |
| `submarine_cables` | TeleGeography | `https://www.submarinecablemap.com/api/v3/cable/cable-geo.json` und `.../landing-point/landing-point-geo.json`, unverifiziert | keine | CC BY-NC-SA 3.0, **nicht kommerziell**, Badge „NC“, nur zur Laufzeit geholt | 30 Tage | M2 |
| `tor_relays` | Tor Project, Onionoo | `https://onionoo.torproject.org/details?type=relay&running=true&fields=nickname,fingerprint,latitude,longitude,flags,observed_bandwidth,country` | keine | Tor-Metrics-Daten (Lizenz: 12.9); `If-Modified-Since` Pflicht (bedingte Requests aktiv) | 1 h | M2 |
| `radio_stations` | Radio Browser | Serverliste über `https://all.api.radio-browser.info/json/servers`, dann zufälliger Server `/json/stations/search?has_geo_info=true&hidebroken=true&limit=50000&order=votes&reverse=true`, unverifiziert | keine | PDDL 1.0 für Verzeichnisdaten | 24 h | M2 |
| `refugees` | UNHCR Refugee Data Finder API | `https://api.unhcr.org/population/v1/population/?limit=1000&page&year&coo_all=true&coa_all=true`, Summe refugees + asylum_seekers je Asyl- oder Herkunftsland (Param `mode`), Choroplethe über `countries`, unverifiziert | keine | UNHCR-Nutzungsbedingungen (zu prüfen) | 30 Tage | M3 |
| `internet_outages` | IODA (Georgia Tech) | `https://api.ioda.inetintel.cc.gatech.edu/v2/outages/summary?from&until&entityType=country`, Score `scores.overall`, Choroplethe, unverifiziert | keine | IODA-Bedingungen (zu prüfen) | 15 min | M3 |
| `custom_geojson` | Nutzer-URL | generisch `geojson_url` | – | vom Nutzer angegeben, Pflichtfeld | vom Nutzer, min 15 min | M2 |

**Overpass:**
- **Abfragegröße:** Kacheln auf Zoom 8 (etwa 1,4° × 1° in Mitteleuropa, nie über 2° × 2°). Unter Zoom 8 wird nichts abgefragt; `meta.zoom_in = true`, der Panel zeigt „Zoom in to load“.
- **Cache:** je Kachel auf Zoom 8, 7 Tage, im Platten-Cache.
- **Last:** höchstens 1 Abfrage gleichzeitig (Warteschlange, 2 s Abstand), 10 000 je Tag hart begrenzt (persistierter Tageszähler), höchstens 64 Kacheln je Anfrage.

**Choroplethen (UNHCR, IODA):** Join über `ISO_A3_EH`/`ISO_A3`/`ADM0_A3` bzw. `ISO_A2_EH`/`ISO_A2` der Natural-Earth-Länder (`-99` = unbekannt). Unbekannte Codes werden gezählt und in `meta.unknown_codes` gemeldet, nie still verworfen. Läuft der `countries`-Layer, werden dessen Daten verwendet; sonst holt der Choroplethen-Provider die Länderdatei selbst.

### 8.4 Raster und Gitter (`raster`, `grid`) als Presets oder eingebaute Layer

| Layer-ID | Quelle | Endpunkt | Auth | Lizenz / Bedingungen | M |
|---|---|---|---|---|---|
| `base_topplus` (Basiskarte `topplus`) | BKG TopPlusOpen | WMS `https://sgx.geodatenzentrum.de/wms_topplus_open`, Layer `web` (unverifiziert, 12.7) | keine | dl-de/by-2-0, Quellvermerk „© GeoBasis-DE / BKG“ | M2 |
| `base_esri_imagery` (Basiskarte `esri_imagery`) | Esri World Imagery | `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}` | keine | Esri-Nutzungsbedingungen und Pflicht-Attribution (12.7) | M2 |
| `dwd_radar` | Deutscher Wetterdienst | WMS `https://maps.dwd.de/geoserver/dwd/wms`, Layer `dwd:Niederschlagsradar` (unverifiziert, 12.5) | keine | GeoNutzV, „© DWD“ | M2 |
| `dwd_warnings` | Deutscher Wetterdienst | WMS gleiche Adresse, Layer `dwd:Warnungen_Gemeinden_vereinigt` | keine | GeoNutzV, „© DWD“ | M2 |
| `dwd_wind` | Deutscher Wetterdienst | Preset, Layer `dwd:Wind_10m_Boeen` (Kandidat, unverifiziert) | keine | GeoNutzV | M2, Preset statt eingebaut |
| `night_lights` | NASA GIBS | XYZ `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/{Time}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png`, `{Time}` = 1. Januar des Vorjahres (Jahresprodukt), Level 8 (unverifiziert, 12.6) | keine | NASA, gemeinfrei; Hinweis „NASA GIBS / Black Marble“ | M2 |
| `thermal_anomalies` | NASA GIBS (FIRMS-Darstellung) | WMS `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi`, Layer `VIIRS_SNPP_Thermal_Anomalies_375m_Day`, `TIME` = heute UTC (unverifiziert) | keine | gemeinfrei, FIRMS-Danksagung | M2 |
| `aurora` | NOAA SWPC OVATION | `https://services.swpc.noaa.gov/json/ovation_aurora_latest.json`, Gitter 360 x 181, Werte in Prozent | keine | US-Regierungsdaten, Hinweis „NOAA SWPC“ | M2 (`grid`) |
| `custom_xyz`, `custom_wms`, `custom_wmts` | Nutzer-URL | generisch | – | vom Nutzer, Pflichtfeld | M2 |

**Bewusst nicht aufgenommen:**
- **RainViewer:** Die freie Stufe ist seit Anfang 2026 stark eingeschränkt. Ein Preset mit Hinweis existiert; Nutzer prüfen die Bedingungen selbst.

**SWPC `aurora`:**
- **Datenformat:** `coordinates` ist eine Liste `[lon 0..359, lat -90..90, wert]`.
- **Normalisierung:** Der Server wandelt in das `grid`-Format (5.3) mit Längengraden -180..179 um; Werte außerhalb 0..100 werden verworfen.
- **Darstellung:** Der Browser färbt ab 5 % ein, mit Transparenz, Grün bis Rot, zellweise in Web-Mercator projiziert.

**Sensor `kp_index`:** aus `https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json`, 15 min, nur bei aktivem `aurora`-Layer (Nebenprodukt des Aurora-Providers).

### 8.5 Zielkatalog: typische eingebettete Dienste und ihr Ersatz

| Heute typischerweise eingebettet | Ersatz in Chronotope | M |
|---|---|---|
| Flugradar-Dienste (flightradar24 u. ä.) | `flights_regional`, `flights_military`, `flights_opensky` | M1 |
| Satelliten-Tracker (orbtrack, satellitemap.space, keeptrack) | `satellites_<gruppe>` | M1 |
| Erdbebenkarten | `earthquakes` | M1 |
| Startkalender für Raketen | `launches` | M1 |
| Blitzkarten (blitzortung.org) | HACS-Integration `blitzortung` plus Geo-Feed-Ebene | M0 |
| Wetter- und Windkarten (ventusky, windy) | `dwd_radar`, `dwd_warnings`, `dwd_wind`; animierte Windfelder sind nicht Teil dieser Spezifikation | M2 |
| Lichtverschmutzungskarten | `night_lights` (Nachtlichter, nicht Himmelshelligkeit; in der UI so benannt) | M2 |
| Geoportale mit WMS (geoportal.de u. ä.) | `base_topplus` und `custom_wms` | M2 |
| Konflikt-Tracker | `conflicts`, `conflicts_api` | M2/M3 |
| Weltraumwetter und Polarlicht | `aurora`, Sensor `kp_index` | M2 |
| Tor-Netz-Visualisierungen | `tor_relays` | M2 |
| Naturgefahren-Übersichten | `natural_events`, `disasters_gdacs` | M2 |
| Aggregierte Lagebild-Dashboards | Kombination aus `conflicts`, `natural_events`, `dwd_warnings`, `internet_outages`, `earthquakes` | M2/M3 |
| Schiffsverkehr (marinetraffic u. ä.) | `vessels` | M3 |
| Fischereiaktivität (globalfishingwatch) | `fishing` | M3 |
| Migrations- und Flüchtlingskarten | `refugees` | M3 |
| Wanderkorridore von Meerestieren | `custom_geojson`, wenn der Nutzer eine Datei hat; kein eingebauter Provider | M2 |
| Sternkarten, Teleskop-Viewer, Kryptokurse, Beschleuniger-Viewer | nicht geografisch, außerhalb des Umfangs | – |

---

## 9. Lizenzen und Hinweise im Repo

- **`THIRD_PARTY_NOTICES.md`**: `satellite.js` (MIT); Interpolation ist Eigenimplementierung.
- **README, Abschnitt „Layers & data sources“** (Englisch), mit:
  - Tabelle aus Abschnitt 8: Quelle, Lizenz, Attribution, Schlüssel ja/nein, NC ja/nein;
  - Hinweis, dass Raster-Kacheln direkt vom Anbieter geladen werden (I10);
  - Hinweis, dass Chronotope keine Fremddaten weiterverteilt;
  - Rezept für GDACS, USGS und Blitzortung über HA-Integrationen.
- **Keine Datensätze, Screenshots fremder Karten oder gefetchten Antworten** im Repo (I4).

---

## 10. Meilensteine und Abnahme

Jeder Meilenstein ist ein PR. Abnahme heißt: alle genannten Tests grün, CI grün, Probe-Ausgabe im PR-Text, Handprüfung laut Liste.

### M0: Fundament

**Umfang:**
- `feeds/` mit `base.py`, `policy.py`, `catalog.py`, `views.py`.
- Store-Tabelle `layers`, WS-Befehle (6.1), Options-Flow (6.3).
- Frontend: Layer-Panel, Registry, Canvas-Renderer, Attribution, Panelzustand v2 mit Migration.
- Sicherheitskorrekturen (7.9), `geoloc`-Allow-Liste (7.10).
- Umstellung der Geo-Feed-Ebene auf Canvas.

**Tests (neu):**
- `tests/test_layers_store.py`: CRUD, Migration, Validierung generischer Layer (https-Pflicht, Platzhalter, Attribution Pflicht).
- `tests/test_feed_policy.py`, reine Logik ohne HA, mit Zeitquelle als Parameter:
  - Backoff-Folge.
  - Circuit-Breaker nach 5 Fehlern.
  - `blocked` bei 401/403/404/429 mit `Retry-After`.
  - Kein Abruf vor `min_interval_s` nach simuliertem Neustart.
  - Budget-Überschreitung ergibt `error` bei erhaltenem letzten Stand.
- `tests/test_geojson_profile.py`: Validator für 5.3 (Pflichtfelder, Koordinatenreihenfolge, `meta`).

**Handprüfung:**
- Geo-Feed-Tooltip mit einem Namen `<img src=x onerror=alert(1)>` zeigt den Text, führt nichts aus. *(Im Headless-Chromium-Smoke-Test bestätigt, 13.7.)*
- Panelzustand v1 wird ohne Verlust migriert. *(Bestätigt, 13.7.)*

### M1: Schlüssellose GEV-Parität

**Umfang:**
- Provider `adsb_lol`, `opensky` (Rückfall), `celestrak`, `usgs`, `ll2`.
- Sensor `aircraft_nearby`.
- Satelliten-Rendering (7.3), Interpolation (7.4), Deep-Link, Lovelace-Karte (7.8).
- `scripts/probe_sources.py`, `THIRD_PARTY_NOTICES.md`, README-Abschnitt.

**Tests (neu):**
- `tests/test_feeds_parse_adsb.py`: Einheitenumrechnung ft→m und kn→m/s, `ground`, fehlender Callsign, Budget-Kappung.
- `tests/test_feeds_parse_opensky.py`: Zustandsvektor-Indizes, `null`-Positionen verworfen.
- `tests/test_feeds_parse_celestrak.py`: OMM-Pflichtfelder, 6-stellige Katalognummer, 403-„not updated“ als Erfolg ohne Daten, andere 403 als `blocked`.
- `tests/test_feeds_parse_usgs.py`: Mapping auf Event (5.4), stabile ID, Aufbewahrung ohne Favoriten.
- `tests/test_feeds_parse_ll2.py`: Pad-Koordinaten, fehlende Koordinaten verwerfen, `end_time`, Aufbewahrung.

Alle mit synthetischen Fixtures (I4).

**Handprüfung:**
- Panel zeigt Flugzeuge im Radius mit Kursrotation und flüssiger Bewegung. *(Smoke-Test: Rotation und Dead Reckoning bestätigt; Live-Daten offen.)*
- Satelliten der Gruppe `stations` bewegen sich, die ISS-Bodenspur erscheint nach Klick. *(Smoke-Test mit synthetischem OMM bestätigt.)*
- Erdbeben und Starts erscheinen als Events, auch im Kalender. *(Live offen, Probe fehlt.)*
- Die Kartenkarte funktioniert in einer Panel-View mit `layers: [flights_regional]`. *(Smoke-Test bestätigt.)*
- Die Attribution nennt alle aktiven Quellen. *(Smoke-Test bestätigt.)*
- Nach Neustart erfolgt kein CelesTrak-Abruf innerhalb von 2 h. *(Unit-Test der Policy; Live offen.)*

### M2: Schlüssellose Erweiterung

**Umfang:**
- Provider `eonet`, `ucdp` (CSV), `swpc` (Grid und Kp), `onionoo`, `overpass`, `natural_earth` (Regionen), `telegeography`, `radio_browser`.
- Generische Layer `xyz`/`wms`/`wmts`/`geojson_url` mit Presets (8.4), Basiskarten-Umschalter (7.6), Legenden-Proxy (6.2).

**Tests (neu):**
- Je Provider ein Parser-Test (`tests/test_feeds_parse_m2.py`).
- `tests/test_grid_normalize.py`: Längengrad-Umschlag 0..359 → -180..179, Dimensionen, Werte außerhalb 0..100 verworfen.
- `tests/test_overpass_tiling.py`: bbox-Zerlegung, Zoom-Schwelle, Tageslimit.
- `tests/test_ucdp_version_discovery.py`: Auswahl der neuesten Candidate-Datei aus einer HTML-Liste.

**Handprüfung:**
- DWD-Radar und DWD-Warnungen überlagern die Karte mit Deckkraftregler. *(Live offen.)*
- Nachtlichter und Aurora-Oval sind sichtbar. *(Aurora im Smoke-Test mit synthetischem Grid; Nachtlichter live offen.)*
- Ein `custom_wms` mit falscher URL zeigt einen Fehler in der Vorschau und wird nicht gespeichert. *(Smoke-Test bestätigt.)*
- Das NC-Badge erscheint beim Seekabel-Layer. *(Smoke-Test bestätigt.)*

### M3: Schlüssel und Choroplethen

**Umfang:**
- `aisstream` (Websocket, 8.1), `firms`, `gfw`, `ucdp` API, `unhcr` und `internet_outages` als Choroplethen über `countries`.
- Sensor `vessels_nearby`.

**Tests (neu):**
- Parser je Provider (`tests/test_feeds_parse_m2.py`, `tests/test_choropleth_join.py`).
- `tests/test_ais_limits.py`: Nachrichtendrosselung, Objektgrenze, Verwerfen und Zählen.
- `tests/test_choropleth_join.py`: ISO-Codes der Quelle gegen Natural-Earth-Codes, unbekannte Codes gezählt statt verworfen ohne Meldung.

**Handprüfung:**
- Ohne Schlüssel bleiben die Schalter deaktiviert. *(Smoke-Test bestätigt.)*
- Schlüssel erscheinen in keiner WS- oder HTTP-Antwort und in keinem Log. *(Code-Review: Katalog liefert nur `key_set`; Provider loggen Fehlertexte ohne URL-Parameter. FIRMS trägt den Schlüssel im Pfad; `fetch_url`-Fehlermeldungen enthalten keine URL.)*
- Beim Deaktivieren von `vessels` schließt die Websocket-Verbindung. *(Code: `async_stop` schließt; live offen.)*

---

## 11. Außerhalb des Umfangs

- 3D-Globus, fotorealistische Kacheln (Google, Cesium ion), Shader, HUD, Cockpit-Ansicht, Sprachsteuerung.
- CCTV und öffentliche Kameras, Verkehrssimulation, TomTom, Nahverkehr (GTFS-RT), Leihräder (GBFS).
- Militärische Einrichtungen aus Overpass, Nachrichten-Feeds (Google News, GDELT DOC).
- Animierte Windfelder, historische Wiedergabe (Timeline-Scrubbing), Flugspuren der letzten 24 h.
- Wissensgraph, RDF-Export, Föderation.
- Supervisor-Add-on als Relay. Der Vertrag in 6.2 ist so geschnitten, dass ein späterer Umzug möglich bleibt.

---

## 12. Offene Punkte

Beim Bau zu klären und hier nachzutragen (Stand nach dem Erstbau; keine Live-Probes möglich, siehe Kopf):

1. **adsb.lol:** Ist für die Point- und Mil-Endpunkte inzwischen ein Schlüssel nötig? Unverifiziert. Falls ja, greift der OpenSky-Rückfall automatisch (Blocker-Code 401/403), ein Schlüsselfeld fehlt dann noch im Options-Flow.
2. **OpenSky:** aktuelle anonyme Kreditgrenze und ob ein Abrufintervall von 60 s darin bleibt. Unverifiziert; das Mindestintervall ist 60 s, mit OAuth-Client konfigurierbar.
3. **Launch Library 2:** Pfade `2.3.0/launches/upcoming/` und `/previous/` mit `mode=normal` implementiert; unverifiziert.
4. **EONET, UNHCR, IODA, GFW, FIRMS, TeleGeography, Natural Earth, Radio Browser:** Natural Earth (110m-Länder) ist verifiziert; die übrigen Pfade sind aus der Dokumentation implementiert und unverifiziert. Lizenztexte für UNHCR, IODA, GFW noch zu prüfen.
5. **DWD:** Radar-Layername `dwd:Niederschlagsradar` und Wind-Layer `dwd:Wind_10m_Boeen` sind Kandidaten; per GetCapabilities zu bestätigen.
6. **GIBS:** Black Marble als Jahresprodukt mit `{Time}` = Vorjahr-01-01 und Level 8; Thermal Anomalies als `VIIRS_SNPP_Thermal_Anomalies_375m_Day` in EPSG:3857; beides zu bestätigen.
7. **BKG TopPlusOpen und Esri World Imagery:** Layername `web` und Quellvermerke sind implementiert, Nutzungsbedingungen zu prüfen.
8. **`satellite.js`:** 6.0.2 hat `json2satrec`; 7.x wegen WASM-Abhängigkeiten nicht bündelbar (7.3). Geklärt.
9. **Onionoo:** Lizenz der Relay-Daten (im Katalog als CC0 mit Prüfhinweis).
10. **UCDP Candidate:** Lizenz und Zitationsform (im Katalog als CC BY 4.0 mit Codebook-Hinweis); API-Version-Parameter Default `25.1`.
11. **AISStream:** Abdeckung in Binnengewässern (Messung vor produktivem Einsatz).
12. **HA-Laufzeittest:** Der Backend-Code ist gegen die Modulstruktur geprüft (pyflakes, py_compile); ein Start in einer echten HA-Instanz steht aus.

---

## 13. Abweichungen der Umsetzung von dieser Spezifikation

1. **Ein Branch für alle Meilensteine** (statt ein PR je Meilenstein, 0.2) auf ausdrückliche Anweisung des Auftraggebers („alle Meilensteine auf einmal“). Die Meilensteinstruktur bleibt in Tests und Katalog (`milestone`) sichtbar.
2. **Keine Live-Probes** (0.5): Egress-Policy der Build-Umgebung. `scripts/probe_sources.py` liegt bereit; Ausgabe vor dem Merge nachreichen.
3. **`params_schema`** ist eine JSON-serialisierbare Beschreibung (`number|enum|latlon|bbox|const`) statt eines voluptuous-Schemas, damit `catalog.py` HA-frei und an das Panel übertragbar bleibt; `validate_params` prüft serverseitig.
4. **`feeds/policy.py` ist HA-frei**; die Persistenz über `homeassistant.helpers.storage.Store` liegt im `FeedManager`. Damit bleibt die Policy ohne HA testbar.
5. **`retention`** ist `retention_days: float` statt `timedelta` (Serialisierbarkeit des Katalogs).
6. **Clustering für `features`** entfällt zugunsten von Canvas-Rendering plus bbox-Filterung (7.2 ließ beides zu).
7. **Handprüfungen** liefen als Headless-Chromium-Smoke-Test gegen einen synthetischen `hass` (Panel, Deep-Link, Karte; 20 Prüfungen), nicht in einer laufenden HA-Instanz.
8. **Profile speichern `layers`** innerhalb von `filters` (`filters.layers`), nicht als eigene Spalte; das vermeidet eine Schema-Migration und bleibt für `QueryFilter` unsichtbar.
9. **EONET** nutzt den `/events`-Endpunkt (Geometrieliste je Event) statt `/events/geojson`; der Parser versteht beide Formen.
10. **Opacity-Regler** gibt es zusätzlich für `features`-Layer (Choroplethen, Kabel), nicht nur für `raster`/`grid`.
11. **Kein `getConfigElement`** für die Karte (in 7.8 optional).
12. **Sensor-Namen** folgen HA-Konventionen: `sensor.chronotope_aurora_probability_at_home`, `sensor.chronotope_statistics`.
