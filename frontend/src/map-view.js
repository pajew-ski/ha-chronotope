import { LitElement, html, css, unsafeCSS } from "lit";
// Order matters: the cluster plugin must mutate Leaflet's exports before
// we snapshot them. Default import keeps the live CJS exports object.
import L from "leaflet";
import "leaflet.markercluster";
import leafletCss from "leaflet/dist/leaflet.css";
import clusterCss from "leaflet.markercluster/dist/MarkerCluster.css";
import clusterDefaultCss from "leaflet.markercluster/dist/MarkerCluster.Default.css";

/**
 * Leaflet map inside shadow DOM. Renders events as clustered circle markers
 * or GeoJSON layers, HA zones, the radius filter circle and geometry-capture
 * previews for the editor. Emits:
 *  - "map-click"       {lat, lon} on any map click (panel decides meaning)
 *  - "event-selected"  {id} when a marker/shape is clicked
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
      :host([dark]) .leaflet-tile-pane {
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
      .zone-home-icon {
        background: none;
        border: none;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
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
      .geo-feed-icon {
        background: var(--info-color, #2196f3);
        border: 1px solid var(--card-background-color, #fff);
        transform: rotate(45deg);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
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
    this._markersById = new Map();
    this._didInitialFit = false;
    this._zonesSignature = "";
    this._personsSignature = "";
    this._geoSignature = "";
  }

  render() {
    return html`<div id="map"></div>`;
  }

  firstUpdated() {
    const initial = this.center ? [this.center.lat, this.center.lon] : [52.52, 13.405];
    this._map = L.map(this.renderRoot.getElementById("map"), {
      center: initial,
      zoom: 12,
      zoomControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this._map);
    this._zoneLayer = L.layerGroup().addTo(this._map);
    this._geoFeedLayer = L.layerGroup().addTo(this._map);
    this._personLayer = L.layerGroup().addTo(this._map);
    this._shapeLayer = L.featureGroup().addTo(this._map);
    this._clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 40,
      showCoverageOnHover: false,
    }).addTo(this._map);
    this._radiusLayer = L.layerGroup().addTo(this._map);
    this._captureLayer = L.layerGroup().addTo(this._map);
    this._map.on("click", (ev) => {
      this.dispatchEvent(
        new CustomEvent("map-click", {
          detail: { lat: ev.latlng.lat, lon: ev.latlng.lng },
        })
      );
    });
    this._resizeObserver = new ResizeObserver(() => this._map.invalidateSize());
    this._resizeObserver.observe(this);
    this._renderEvents();
    this._renderRadius();
    this._renderZones();
    this._renderPersons();
    this._renderGeoMarkers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._map?.remove();
    this._map = undefined;
  }

  updated(changed) {
    if (!this._map) return;
    if (changed.has("events")) this._renderEvents();
    if (changed.has("center") || changed.has("radiusKm") || changed.has("radiusEnabled")) {
      this._renderRadius();
    }
    if (changed.has("zones")) this._renderZones();
    if (changed.has("persons")) this._renderPersons();
    if (changed.has("geoMarkers")) this._renderGeoMarkers();
    if (changed.has("capture")) this._renderCapture();
    if (changed.has("selectedId") && this.selectedId) {
      this._focusEvent(this.selectedId);
    }
  }

  _accentColor() {
    return getComputedStyle(this).getPropertyValue("--primary-color").trim() || "#03a9f4";
  }

  _renderEvents() {
    this._clusterGroup.clearLayers();
    this._shapeLayer.clearLayers();
    this._markersById.clear();
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

    if (!this._didInitialFit && this._markersById.size > 0) {
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
    title.textContent = `${event.favorite ? "★ " : ""}${event.title}`;
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
    if (event.lat != null && event.lon != null) {
      const nav = document.createElement("div");
      nav.className = "popup-meta";
      const link = document.createElement("a");
      link.href = `https://www.openstreetmap.org/directions?to=${event.lat}%2C${event.lon}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "🧭 Route (OSM)";
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
    const color =
      getComputedStyle(this).getPropertyValue("--accent-color").trim() || "#ff9800";
    for (const zone of this.zones || []) {
      L.circle([zone.lat, zone.lon], {
        radius: zone.radius,
        color,
        weight: 1.5,
        dashArray: zone.passive ? "2 6" : "4 4",
        fillColor: color,
        fillOpacity: 0.06,
      })
        .bindTooltip(zone.name)
        .addTo(this._zoneLayer);
      if (zone.home) {
        L.marker([zone.lat, zone.lon], {
          icon: L.divIcon({
            className: "zone-home-icon",
            html: "🏠",
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
      const content = person.picture
        ? `<img src="${person.picture}" alt="" />`
        : `<span class="initial">${(person.name || "?")[0].toUpperCase()}</span>`;
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
        .bindTooltip(`${person.name} (${person.state})`)
        .addTo(this._personLayer);
    }
  }

  _renderGeoMarkers() {
    if (!this._map) return;
    const signature = JSON.stringify(this.geoMarkers || []);
    if (signature === this._geoSignature) return;
    this._geoSignature = signature;
    this._geoFeedLayer.clearLayers();
    for (const marker of this.geoMarkers || []) {
      L.marker([marker.lat, marker.lon], {
        icon: L.divIcon({
          className: "geo-feed-icon",
          html: "",
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        }),
        keyboard: false,
      })
        .bindTooltip(
          `${marker.name} — ${marker.source}` +
            (marker.distance && marker.distance !== "unknown"
              ? ` (${marker.distance} ${marker.unit})`
              : "")
        )
        .addTo(this._geoFeedLayer);
    }
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
}

customElements.define("chronotope-map-view", ChronotopeMapView);
