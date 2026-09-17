import { LitElement, html, css, unsafeCSS } from "lit";
// Order matters: the cluster plugin must mutate Leaflet's exports before
// we snapshot them. Default import keeps the live CJS exports object.
import L from "leaflet";
import "leaflet.markercluster";
import leafletCss from "leaflet/dist/leaflet.css";
import { t } from "./i18n.js";
import { HOME_ICON_SVG } from "./icons.js";
import { define } from "./define.js";
import clusterCss from "leaflet.markercluster/dist/MarkerCluster.css";
import clusterDefaultCss from "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { CanvasPointLayer } from "./layers/render-points.js";
import { GridCanvasLayer } from "./layers/render-grid.js";
import { createGeoJsonLayer } from "./layers/render-geojson.js";
import { createRasterLayer } from "./layers/render-raster.js";
import { AttributionManager } from "./layers/attribution.js";
import { TrackInterpolator } from "./layers/interpolate.js";
import { SatelliteTracker } from "./layers/satellites.js";
import { buildFeaturePopup } from "./layers/popup.js";

// Z order from the bottom (spec 7.2): base map, raster, grid, feature
// shapes, events, feature points, tracks, geo feeds, zones/persons, popups.
const PANES = {
  "chronotope-raster": 250,
  "chronotope-grid": 300,
  "chronotope-shapes": 350,
  "chronotope-points": 450,
  "chronotope-tracks": 500,
  "chronotope-geofeeds": 550,
};
const TRACK_FRAME_MS = 100;
const SAT_TICK_MS = 1000;
const DEFAULT_BASEMAPS = {
  osm: {
    type: "xyz",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    max_zoom: 19,
    attribution: { text: "© OpenStreetMap contributors", url: "https://www.openstreetmap.org/copyright" },
    invert_dark: true,
  },
};

/**
 * Leaflet map inside shadow DOM. Renders events as clustered circle markers
 * or GeoJSON layers, HA zones, the radius filter circle, geometry-capture
 * previews for the editor and the geo data layers of the registry. Emits:
 *  - "map-click"        {lat, lon} on any map click (panel decides meaning)
 *  - "event-selected"   {id} when a marker/shape is clicked
 *  - "viewport-changed" {bbox, zoom, center} after move/zoom (debounced)
 */
class ChronotopeMapView extends LitElement {
  static properties = {
    events: { attribute: false },
    center: { attribute: false },
    radiusKm: { attribute: false },
    radiusEnabled: { attribute: false },
    zones: { attribute: false },
    persons: { attribute: false },
    geoMarkers: { attribute: false },
    capture: { attribute: false },
    selectedId: { attribute: false },
    dark: { type: Boolean, reflect: true },
    basemap: { attribute: false },
    basemaps: { attribute: false },
    registry: { attribute: false },
    layerVersion: { attribute: false },
    initialView: { attribute: false },
    showEvents: { attribute: false },
  };

  static styles = [
    css`
      ${unsafeCSS(leafletCss)}
    `,
    css`
      ${unsafeCSS(clusterCss)}
    `,
    css`
      ${unsafeCSS(clusterDefaultCss)}
    `,
    css`
      :host {
        display: block;
        position: relative;
      }
      #map {
        position: absolute;
        inset: 0;
        background: var(--card-background-color, #fafafa);
      }
      /* Dark mode inverts only the base map tiles, never data rasters (7.5). */
      :host([dark]:not([no-invert])) .leaflet-tile-pane {
        filter: brightness(0.6) invert(1) contrast(3.2) hue-rotate(200deg)
          saturate(0.35) brightness(0.75);
      }
      :host([dark]) #map {
        background: #1c1c1c;
      }
      .leaflet-control-attribution,
      .leaflet-control-zoom a {
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #212121);
      }
      .leaflet-control-attribution a {
        color: var(--primary-color, #03a9f4);
      }
      .leaflet-control-zoom a {
        border-color: var(--divider-color, #e0e0e0);
      }
      .leaflet-popup-content-wrapper,
      .leaflet-popup-tip {
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #212121);
      }
      .popup-title {
        font-weight: 600;
      }
      .popup-meta {
        color: var(--secondary-text-color, #727272);
        font-size: 0.85em;
      }
      .popup-meta a {
        color: var(--primary-color, #03a9f4);
        text-decoration: none;
      }
      .popup-detail {
        font-size: 0.8em;
        border-collapse: collapse;
        margin-top: 4px;
      }
      .popup-detail td {
        padding: 0 6px 0 0;
        vertical-align: top;
      }
      .popup-detail td:first-child {
        color: var(--secondary-text-color, #727272);
      }
      .zone-home-icon {
        background: none;
        border: none;
      }
      .zone-home-icon svg {
        width: 100%;
        height: 100%;
        fill: var(--accent-color, #ff9800);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }
      .person-icon {
        border-radius: 50%;
        border: 2px solid var(--primary-color, #03a9f4);
        background: var(--card-background-color, #fff);
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
      }
      .person-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .person-icon .initial {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 24px;
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-color, #03a9f4);
      }
      .chronotope-canvas {
        position: absolute;
        left: 0;
        top: 0;
      }
      :host([data-capturing]) #map {
        cursor: crosshair;
      }
    `,
  ];

  constructor() {
    super();
    this.events = [];
    this.radiusKm = 10;
    this.radiusEnabled = false;
    this.zones = [];
    this.persons = [];
    this.geoMarkers = [];
    this.capture = null;
    this.dark = false;
    this.basemap = "osm";
    this.basemaps = DEFAULT_BASEMAPS;
    this.registry = null;
    this.layerVersion = 0;
    this.initialView = null;
    this.showEvents = true;
    this._markersById = new Map();
    this._didInitialFit = false;
    this._zonesSignature = "";
    this._personsSignature = "";
    this._geoSignature = "";
    this._layerObjs = new Map(); // layer id -> {def signature, objects}
    this._selectedFeature = null; // {layerId, id}
    this._satTrackers = new Map();
    this._interpolators = new Map();
  }

  render() {
    return html`<div id="map"></div>`;
  }

  firstUpdated() {
    const initial = this.initialView?.center || (this.center ? [this.center.lat, this.center.lon] : [52.52, 13.405]);
    this._map = L.map(this.renderRoot.getElementById("map"), {
      center: initial,
      zoom: this.initialView?.zoom || 12,
      zoomControl: true,
      worldCopyJump: true,
    });
    for (const [name, z] of Object.entries(PANES)) {
      const pane = this._map.createPane(name);
      pane.style.zIndex = String(z);
    }
    this._attribution = new AttributionManager(this._map, t);
    this._canvasRenderer = L.canvas({ pane: "chronotope-shapes", padding: 0.3 });
    this._renderBasemap();
    this._zoneLayer = L.layerGroup().addTo(this._map);
    this._geoFeedLayer = new CanvasPointLayer({ pane: "chronotope-geofeeds", icon: "diamond", color: this._cssVar("--info-color", "#2196f3"), size: 5 });
    this._geoFeedLayer.on("featureclick", (ev) => this._openTextPopup(ev.latlng, ev.feature.properties.label, ev.feature.properties.detail?.text));
    this._geoFeedLayer.addTo(this._map);
    this._personLayer = L.layerGroup().addTo(this._map);
    this._shapeLayer = L.featureGroup().addTo(this._map);
    this._clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 40,
      showCoverageOnHover: false,
    }).addTo(this._map);
    this._radiusLayer = L.layerGroup().addTo(this._map);
    this._captureLayer = L.layerGroup().addTo(this._map);
    this._trailLayer = L.layerGroup().addTo(this._map);
    this._map.on("click", (ev) => {
      if (ev.originalEvent?.defaultPrevented) return;
      this.dispatchEvent(
        new CustomEvent("map-click", {
          detail: { lat: ev.latlng.lat, lon: ev.latlng.lng },
        })
      );
    });
    this._map.on("moveend zoomend", () => this._emitViewport());
    this._resizeObserver = new ResizeObserver(() => this._map.invalidateSize());
    this._resizeObserver.observe(this);
    this._renderEvents();
    this._renderRadius();
    this._renderZones();
    this._renderPersons();
    this._renderGeoMarkers();
    this._renderLayers();
    this._emitViewport();
    this._startAnimation();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    clearInterval(this._trackTimer);
    clearInterval(this._satTimer);
    this._map?.remove();
    this._map = undefined;
  }

  updated(changed) {
    if (!this._map) return;
    if (changed.has("events") || changed.has("showEvents")) this._renderEvents();
    if (changed.has("center") || changed.has("radiusKm") || changed.has("radiusEnabled")) {
      this._renderRadius();
    }
    if (changed.has("zones")) this._renderZones();
    if (changed.has("persons")) this._renderPersons();
    if (changed.has("geoMarkers")) this._renderGeoMarkers();
    if (changed.has("capture")) this._renderCapture();
    if (changed.has("basemap") || changed.has("basemaps") || changed.has("dark")) this._renderBasemap();
    if (changed.has("layerVersion") || changed.has("registry")) this._renderLayers();
    if (changed.has("selectedId") && this.selectedId) {
      this._focusEvent(this.selectedId);
    }
  }

  // ------------------------------------------------------------- public

  setView(lat, lon, zoom) {
    if (this._map) this._map.setView([lat, lon], zoom ?? this._map.getZoom());
  }

  getCenter() {
    if (!this._map) return null;
    const c = this._map.getCenter();
    return { lat: c.lat, lon: c.lng };
  }

  // ------------------------------------------------------------ helpers

  _cssVar(name, fallback) {
    return getComputedStyle(this).getPropertyValue(name).trim() || fallback;
  }

  _accentColor() {
    return this._cssVar("--primary-color", "#03a9f4");
  }

  _emitViewport() {
    clearTimeout(this._viewportTimer);
    this._viewportTimer = setTimeout(() => {
      if (!this._map) return;
      const b = this._map.getBounds();
      const bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].map((v) => v.toFixed(4)).join(",");
      const c = this._map.getCenter();
      this.dispatchEvent(
        new CustomEvent("viewport-changed", {
          detail: { bbox, zoom: this._map.getZoom(), center: { lat: c.lat, lon: c.lng } },
        })
      );
      this._refreshAttribution();
    }, 150);
  }

  _openTextPopup(latlng, title, text) {
    const div = document.createElement("div");
    const head = document.createElement("div");
    head.className = "popup-title";
    head.textContent = String(title ?? "");
    div.append(head);
    if (text) {
      const meta = document.createElement("div");
      meta.className = "popup-meta";
      meta.textContent = String(text);
      div.append(meta);
    }
    L.popup({ maxWidth: 280 }).setLatLng(latlng).setContent(div).openOn(this._map);
  }

  // ------------------------------------------------------------ basemap

  _renderBasemap() {
    const defs = this.basemaps && Object.keys(this.basemaps).length ? this.basemaps : DEFAULT_BASEMAPS;
    const key = defs[this.basemap] ? this.basemap : "osm";
    const def = defs[key] || DEFAULT_BASEMAPS.osm;
    if (def.invert_dark === false) this.setAttribute("no-invert", "");
    else this.removeAttribute("no-invert");
    if (this._basemapKey === key && this._basemapLayer) return;
    if (this._basemapLayer) this._map.removeLayer(this._basemapLayer);
    this._basemapKey = key;
    this._basemapLayer = createRasterLayer({ ...def, opacity: 1 }, { pane: "tilePane", opacity: 1 });
    this._basemapLayer.addTo(this._map);
    this._refreshAttribution();
  }

  _refreshAttribution() {
    if (!this._attribution) return;
    const entries = [];
    const defs = this.basemaps && Object.keys(this.basemaps).length ? this.basemaps : DEFAULT_BASEMAPS;
    const base = defs[this._basemapKey] || DEFAULT_BASEMAPS.osm;
    if (base.attribution) entries.push(base.attribution);
    for (const [id] of this._layerObjs) {
      const def = this.registry?.definition(id);
      const doc = this.registry?.docs.get(id);
      const attribution = doc?.meta?.attribution || def?.attribution;
      if (attribution?.text) entries.push(attribution);
    }
    this._attribution.setEntries(entries);
  }

  // ------------------------------------------------------------- events

  _renderEvents() {
    this._clusterGroup.clearLayers();
    this._shapeLayer.clearLayers();
    this._markersById.clear();
    if (this.showEvents === false) return;
    const accent = this._accentColor();

    for (const event of this.events || []) {
      let layer = null;
      let clustered = false;
      if (event.geometry) {
        try {
          layer = L.geoJSON(JSON.parse(event.geometry), {
            style: this._shapeStyle(accent, event),
            pointToLayer: (_feature, latlng) =>
              L.circleMarker(latlng, this._markerStyle(accent, event)),
          });
        } catch (err) {
          console.warn("chronotope: invalid geometry for event", event.id, err);
        }
      }
      if (!layer && event.lat != null && event.lon != null) {
        layer = L.circleMarker([event.lat, event.lon], this._markerStyle(accent, event));
        clustered = true;
      }
      if (!layer) continue;

      layer.bindPopup(this._popupHtml(event));
      layer.on("click", () => {
        this.dispatchEvent(new CustomEvent("event-selected", { detail: { id: event.id } }));
      });
      (clustered ? this._clusterGroup : this._shapeLayer).addLayer(layer);
      this._markersById.set(event.id, { layer, clustered });
    }

    if (!this._didInitialFit && this._markersById.size > 0 && !this.initialView) {
      this._didInitialFit = true;
      const bounds = this._clusterGroup.getBounds().extend(
        this._shapeLayer.getBounds()
      );
      if (bounds.isValid()) {
        this._map.fitBounds(bounds.pad(0.2), { maxZoom: 14 });
      }
    }
  }

  _markerStyle(accent, event) {
    return {
      radius: 9,
      color: accent,
      weight: 2,
      fillColor: accent,
      fillOpacity: event?.favorite ? 0.75 : 0.35,
      // Fuzzy schedules get a dashed outline.
      dashArray: event?.time_precision === "approximate" ? "3 4" : null,
    };
  }

  _shapeStyle(accent, event) {
    return {
      color: accent,
      weight: 3,
      fillOpacity: 0.2,
      dashArray: event?.time_precision === "approximate" ? "6 6" : null,
    };
  }

  _popupHtml(event) {
    const div = document.createElement("div");
    const title = document.createElement("div");
    title.className = "popup-title";
    title.textContent = event.title;
    const meta = document.createElement("div");
    meta.className = "popup-meta";
    const start = event.occurrences?.[0]?.[0] ?? event.start_time;
    const when =
      event.time_precision === "approximate" && event.schedule_text
        ? `~ ${event.schedule_text}`
        : new Date(start).toLocaleString();
    meta.textContent = `${event.category || ""} ${when}`.trim();
    div.append(title, meta);
    if (event.address) {
      const address = document.createElement("div");
      address.className = "popup-meta";
      address.textContent = event.address;
      div.append(address);
    }
    if (event.raw_description) {
      const description = document.createElement("div");
      description.className = "popup-meta";
      description.textContent = event.raw_description.length > 240 ? `${event.raw_description.slice(0, 240)}…` : event.raw_description;
      div.append(description);
    }
    if (event.source_url) {
      const source = document.createElement("div");
      source.className = "popup-meta";
      const link = document.createElement("a");
      link.href = event.source_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = event.source_name || t("list.source");
      source.append(link);
      div.append(source);
    }
    if (event.lat != null && event.lon != null) {
      const nav = document.createElement("div");
      nav.className = "popup-meta";
      const link = document.createElement("a");
      link.href = `https://www.openstreetmap.org/directions?to=${event.lat}%2C${event.lon}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = t("map.route");
      nav.append(link);
      div.append(nav);
    }
    return div;
  }

  _renderRadius() {
    this._radiusLayer.clearLayers();
    if (!this.radiusEnabled || !this.center) return;
    const accent = this._accentColor();
    L.circle([this.center.lat, this.center.lon], {
      radius: this.radiusKm * 1000,
      color: accent,
      weight: 1.5,
      dashArray: "6 6",
      fillOpacity: 0.05,
    }).addTo(this._radiusLayer);
    L.circleMarker([this.center.lat, this.center.lon], {
      radius: 4,
      color: accent,
      fillColor: accent,
      fillOpacity: 1,
    }).addTo(this._radiusLayer);
  }

  _renderZones() {
    if (!this._map) return;
    const signature = JSON.stringify(this.zones || []);
    if (signature === this._zonesSignature) return;
    this._zonesSignature = signature;
    this._zoneLayer.clearLayers();
    const color = this._cssVar("--accent-color", "#ff9800");
    for (const zone of this.zones || []) {
      const tooltip = document.createElement("span");
      tooltip.textContent = zone.name;
      L.circle([zone.lat, zone.lon], {
        radius: zone.radius,
        color,
        weight: 1.5,
        dashArray: zone.passive ? "2 6" : "4 4",
        fillColor: color,
        fillOpacity: 0.06,
      })
        .bindTooltip(tooltip)
        .addTo(this._zoneLayer);
      if (zone.home) {
        L.marker([zone.lat, zone.lon], {
          icon: L.divIcon({
            className: "zone-home-icon",
            html: HOME_ICON_SVG,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
          interactive: false,
          keyboard: false,
        }).addTo(this._zoneLayer);
      }
    }
  }

  _renderPersons() {
    if (!this._map) return;
    const signature = JSON.stringify(this.persons || []);
    if (signature === this._personsSignature) return;
    this._personsSignature = signature;
    this._personLayer.clearLayers();
    for (const person of this.persons || []) {
      // Built as DOM (I6): entity_picture and names are untrusted strings.
      let content;
      if (person.picture) {
        content = document.createElement("img");
        content.alt = "";
        content.src = String(person.picture);
      } else {
        content = document.createElement("span");
        content.className = "initial";
        content.textContent = (person.name || "?")[0].toUpperCase();
      }
      const tooltip = document.createElement("span");
      tooltip.textContent = `${person.name} (${person.state})`;
      L.marker([person.lat, person.lon], {
        icon: L.divIcon({
          className: "person-icon",
          html: content,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
        keyboard: false,
        zIndexOffset: 1000,
      })
        .bindTooltip(tooltip)
        .addTo(this._personLayer);
    }
  }

  _renderGeoMarkers() {
    if (!this._map) return;
    const signature = JSON.stringify(this.geoMarkers || []);
    if (signature === this._geoSignature) return;
    this._geoSignature = signature;
    // Canvas rendering keeps thousands of lightning strikes fluid (7.10).
    const features = (this.geoMarkers || []).map((marker) => ({
      type: "Feature",
      id: marker.id,
      geometry: { type: "Point", coordinates: [marker.lon, marker.lat] },
      properties: {
        label: marker.name,
        kind: marker.source,
        ts: null,
        detail: {
          text:
            `${marker.source}` +
            (marker.distance && marker.distance !== "unknown" ? ` · ${marker.distance} ${marker.unit}` : ""),
        },
      },
    }));
    this._geoFeedLayer.setFeatures(features);
  }

  _renderCapture() {
    this._captureLayer.clearLayers();
    if (this.capture?.mode) {
      this.setAttribute("data-capturing", "");
    } else {
      this.removeAttribute("data-capturing");
      return;
    }
    const accent = this._accentColor();
    const points = this.capture.points || [];
    for (const [lat, lon] of points) {
      L.circleMarker([lat, lon], {
        radius: 5,
        color: accent,
        fillColor: accent,
        fillOpacity: 0.9,
      }).addTo(this._captureLayer);
    }
    if (points.length >= 2) {
      const latlngs = points.map(([lat, lon]) => [lat, lon]);
      if (this.capture.mode === "polygon" && points.length >= 3) {
        L.polygon(latlngs, { color: accent, weight: 2, dashArray: "4 4", fillOpacity: 0.1 })
          .addTo(this._captureLayer);
      } else {
        L.polyline(latlngs, { color: accent, weight: 2, dashArray: "4 4" })
          .addTo(this._captureLayer);
      }
    }
  }

  _focusEvent(id) {
    const entry = this._markersById.get(id);
    if (!entry) return;
    const { layer, clustered } = entry;
    if (clustered && layer.getLatLng) {
      this._clusterGroup.zoomToShowLayer(layer, () => layer.openPopup());
    } else if (layer.getBounds) {
      this._map.fitBounds(layer.getBounds().pad(0.3), { maxZoom: 15 });
      layer.openPopup();
    } else if (layer.getLatLng) {
      this._map.panTo(layer.getLatLng());
      layer.openPopup();
    }
  }

  // ------------------------------------------------------------- layers

  _renderLayers() {
    if (!this._map) return;
    const registry = this.registry;
    const active = registry ? registry.activeIds() : [];
    const wanted = new Set(active);
    for (const id of [...this._layerObjs.keys()]) {
      if (!wanted.has(id)) this._removeLayer(id);
    }
    for (const id of active) {
      const def = registry.definition(id);
      if (!def) continue;
      const doc = registry.docs.get(id);
      this._renderLayer(def, doc);
    }
    this._refreshAttribution();
  }

  _removeLayer(id) {
    const entry = this._layerObjs.get(id);
    if (!entry) return;
    for (const obj of entry.objects) this._map.removeLayer(obj);
    this._layerObjs.delete(id);
    this._satTrackers.delete(id);
    this._interpolators.delete(id);
    if (this._selectedFeature?.layerId === id) {
      this._selectedFeature = null;
      this._trailLayer.clearLayers();
    }
  }

  _renderLayer(def, doc) {
    const id = def.id;
    const signature = JSON.stringify({ klass: def.klass, raster: def.raster, opacity: def.opacity, url: def.config?.url, params: def.config?.params });
    let entry = this._layerObjs.get(id);
    if (entry && entry.signature !== signature) {
      this._removeLayer(id);
      entry = null;
    }
    switch (def.klass) {
      case "raster":
        if (!entry) {
          const raster = def.raster;
          if (!raster) return;
          const layer = createRasterLayer({ ...raster, provider: raster.provider || raster.type }, {
            opacity: def.opacity,
            pane: "chronotope-raster",
          });
          layer.addTo(this._map);
          this._layerObjs.set(id, { signature, objects: [layer], kind: "raster" });
        }
        return;
      case "grid": {
        if (!entry) {
          const layer = new GridCanvasLayer({ pane: "chronotope-grid", opacity: def.opacity, threshold: def.style?.threshold ?? 5 });
          layer.addTo(this._map);
          entry = { signature, objects: [layer], kind: "grid", docVersion: null };
          this._layerObjs.set(id, entry);
        }
        if (doc?.grid && entry.docVersion !== doc.receivedAt) {
          entry.docVersion = doc.receivedAt;
          entry.objects[0].setGrid(doc.grid);
        }
        return;
      }
      case "features":
        this._renderFeaturesLayer(def, doc, entry, signature);
        return;
      case "tracks":
        this._renderTracksLayer(def, doc, entry, signature);
        return;
      default:
        return;
    }
  }

  _renderFeaturesLayer(def, doc, entry, signature) {
    const id = def.id;
    if (!entry) {
      const points = new CanvasPointLayer({
        pane: "chronotope-points",
        icon: def.style?.icon === "relay" || def.style?.icon === "radio" ? "circle" : "circle",
        color: def.style?.color || "#66bb6a",
        size: 5,
        opacity: def.opacity,
      });
      points.on("featureclick", (ev) => this._onLayerFeatureClick(def, ev.feature, ev.latlng));
      points.addTo(this._map);
      entry = { signature, objects: [points], kind: "features", docVersion: null, shapes: null };
      this._layerObjs.set(id, entry);
    }
    if (!doc || entry.docVersion === doc.receivedAt) return;
    entry.docVersion = doc.receivedAt;
    const features = doc.features || [];
    const pointFeatures = features.filter((f) => f.geometry?.type === "Point");
    const shapeFeatures = features.filter((f) => f.geometry && f.geometry.type !== "Point");
    entry.objects[0].setFeatures(pointFeatures);
    if (entry.shapes) {
      this._map.removeLayer(entry.shapes);
      entry.objects = entry.objects.filter((o) => o !== entry.shapes);
      entry.shapes = null;
    }
    if (shapeFeatures.length) {
      const shapes = createGeoJsonLayer(shapeFeatures, {
        style: def.style,
        renderer: this._canvasRenderer,
        pane: "chronotope-shapes",
        meta: doc.meta,
        t,
        opacity: def.opacity,
      });
      shapes.addTo(this._map);
      entry.shapes = shapes;
      entry.objects.push(shapes);
    }
  }

  _renderTracksLayer(def, doc, entry, signature) {
    const id = def.id;
    const isSatellite = def.style?.propagate === "browser";
    if (!entry) {
      const points = new CanvasPointLayer({
        pane: "chronotope-tracks",
        icon: def.style?.icon || "circle",
        color: def.style?.color || "#42a5f5",
        rotateBy: def.style?.rotate_by || null,
        size: isSatellite ? 4 : 6,
        labels: true,
      });
      points.on("featureclick", (ev) => this._onLayerFeatureClick(def, ev.feature, ev.latlng));
      points.addTo(this._map);
      entry = { signature, objects: [points], kind: isSatellite ? "satellites" : "tracks", docVersion: null };
      this._layerObjs.set(id, entry);
      if (isSatellite) this._satTrackers.set(id, new SatelliteTracker());
      else this._interpolators.set(id, new TrackInterpolator({ intervalMs: def.interval }));
    }
    if (!doc || entry.docVersion === doc.receivedAt) return;
    entry.docVersion = doc.receivedAt;
    if (isSatellite) {
      const tracker = this._satTrackers.get(id);
      tracker.setOmm(doc.omm || [], doc.meta?.group);
      tracker.tick(new Date());
      entry.objects[0].setFeatures(tracker.features(def.style?.color));
    } else {
      const interpolator = this._interpolators.get(id);
      interpolator.setInterval(def.interval);
      interpolator.ingest(doc.features || [], doc.receivedAt);
    }
  }

  _startAnimation() {
    clearInterval(this._trackTimer);
    clearInterval(this._satTimer);
    // Aircraft/vessels: interpolate at 10 fps (7.4).
    this._trackTimer = setInterval(() => {
      if (document.hidden) return;
      const now = Date.now();
      for (const [id, interpolator] of this._interpolators) {
        const entry = this._layerObjs.get(id);
        if (!entry) continue;
        entry.objects[0].setFeatures(interpolator.featuresAt(now));
        if (this._selectedFeature?.layerId === id) this._drawTrail(id, interpolator.trail(this._selectedFeature.id, now));
      }
    }, TRACK_FRAME_MS);
    // Satellites: visible objects every second, all every 10 s (7.3).
    let tick = 0;
    this._satTimer = setInterval(() => {
      if (document.hidden || !this._map) return;
      tick += 1;
      const bounds = this._map.getBounds().pad(0.2);
      const full = tick % 10 === 0;
      for (const [id, tracker] of this._satTrackers) {
        const entry = this._layerObjs.get(id);
        if (!entry) continue;
        tracker.tick(new Date(), full ? null : (_sid, pos) => !pos || bounds.contains([pos.lat, pos.lon]));
        const def = this.registry?.definition(id);
        entry.objects[0].setFeatures(tracker.features(def?.style?.color));
        if (this._selectedFeature?.layerId === id && tick % 30 === 0) this._drawGroundTrack(id, this._selectedFeature.id);
      }
    }, SAT_TICK_MS);
  }

  _onLayerFeatureClick(def, feature, latlng) {
    const doc = this.registry?.docs.get(def.id);
    const extra = { lines: [] };
    if (def.klass === "tracks" && doc?.meta?.fallback) extra.lines.push(t("layers.fallback"));
    const popup = buildFeaturePopup(feature, doc?.meta, t, extra);
    L.popup({ maxWidth: 320 }).setLatLng(latlng).setContent(popup).openOn(this._map);
    this._selectedFeature = { layerId: def.id, id: feature.id };
    for (const [id, entry] of this._layerObjs) {
      if (entry.objects[0]?.setSelected) entry.objects[0].setSelected(id === def.id ? feature.id : null);
    }
    this._trailLayer.clearLayers();
    if (this._satTrackers.has(def.id)) this._drawGroundTrack(def.id, feature.id);
    this.dispatchEvent(new CustomEvent("layer-feature-selected", { detail: { layerId: def.id, feature } }));
  }

  _drawTrail(layerId, points) {
    this._trailLayer.clearLayers();
    if (!points || points.length < 2) return;
    const def = this.registry?.definition(layerId);
    L.polyline(points, { color: def?.style?.color || "#42a5f5", weight: 2, opacity: 0.7, pane: "chronotope-tracks", renderer: this._canvasRenderer }).addTo(this._trailLayer);
  }

  _drawGroundTrack(layerId, featureId) {
    const tracker = this._satTrackers.get(layerId);
    if (!tracker) return;
    this._trailLayer.clearLayers();
    const def = this.registry?.definition(layerId);
    const color = def?.style?.color || "#ffb300";
    for (const segment of tracker.groundTrack(featureId, new Date())) {
      L.polyline(segment, { color, weight: 1.5, opacity: 0.8, dashArray: "4 6" }).addTo(this._trailLayer);
    }
  }
}

define("chronotope-map-view", ChronotopeMapView);
