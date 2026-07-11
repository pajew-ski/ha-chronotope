import { LitElement, html, css, unsafeCSS } from "lit";
import * as L from "leaflet";
import leafletCss from "leaflet/dist/leaflet.css";

/**
 * Leaflet map inside shadow DOM. Renders events as circle markers or
 * GeoJSON layers, plus the radius filter circle. Emits:
 *  - "center-changed"  {lat, lon} on map click (to move the radius center)
 *  - "event-selected"  {id} when a marker/shape is clicked
 */
class ChronotopeMapView extends LitElement {
  static properties = {
    events: { attribute: false },
    center: { attribute: false },
    radiusKm: { attribute: false },
    radiusEnabled: { attribute: false },
    selectedId: { attribute: false },
    dark: { type: Boolean, reflect: true },
  };

  static styles = [
    css`
      ${unsafeCSS(leafletCss)}
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
    `,
  ];

  constructor() {
    super();
    this.events = [];
    this.radiusKm = 10;
    this.radiusEnabled = false;
    this.dark = false;
    this._markersById = new Map();
    this._didInitialFit = false;
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
    this._eventLayer = L.featureGroup().addTo(this._map);
    this._radiusLayer = L.layerGroup().addTo(this._map);
    this._map.on("click", (ev) => {
      this.dispatchEvent(
        new CustomEvent("center-changed", {
          detail: { lat: ev.latlng.lat, lon: ev.latlng.lng },
        })
      );
    });
    this._resizeObserver = new ResizeObserver(() => this._map.invalidateSize());
    this._resizeObserver.observe(this);
    this._renderEvents();
    this._renderRadius();
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
    if (changed.has("selectedId") && this.selectedId) {
      this._focusEvent(this.selectedId);
    }
  }

  _accentColor() {
    return getComputedStyle(this).getPropertyValue("--primary-color").trim() || "#03a9f4";
  }

  _renderEvents() {
    this._eventLayer.clearLayers();
    this._markersById.clear();
    const accent = this._accentColor();

    for (const event of this.events || []) {
      let layer = null;
      if (event.geometry) {
        try {
          layer = L.geoJSON(JSON.parse(event.geometry), {
            style: { color: accent, weight: 3, fillOpacity: 0.2 },
            pointToLayer: (_feature, latlng) =>
              L.circleMarker(latlng, this._markerStyle(accent)),
          });
        } catch (err) {
          console.warn("chronotope: invalid geometry for event", event.id, err);
        }
      }
      if (!layer && event.lat != null && event.lon != null) {
        layer = L.circleMarker([event.lat, event.lon], this._markerStyle(accent));
      }
      if (!layer) continue;

      layer.bindPopup(this._popupHtml(event));
      layer.on("click", () => {
        this.dispatchEvent(new CustomEvent("event-selected", { detail: { id: event.id } }));
      });
      layer.addTo(this._eventLayer);
      this._markersById.set(event.id, layer);
    }

    if (!this._didInitialFit && this._markersById.size > 0) {
      this._didInitialFit = true;
      this._map.fitBounds(this._eventLayer.getBounds().pad(0.2), { maxZoom: 14 });
    }
  }

  _markerStyle(accent) {
    return {
      radius: 9,
      color: accent,
      weight: 2,
      fillColor: accent,
      fillOpacity: 0.35,
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
    meta.textContent = `${event.category || ""} ${new Date(start).toLocaleString()}`.trim();
    div.append(title, meta);
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

  _focusEvent(id) {
    const layer = this._markersById.get(id);
    if (!layer) return;
    if (layer.getLatLng) {
      this._map.panTo(layer.getLatLng());
    } else if (layer.getBounds) {
      this._map.fitBounds(layer.getBounds().pad(0.3), { maxZoom: 15 });
    }
    layer.openPopup();
  }
}

customElements.define("chronotope-map-view", ChronotopeMapView);
