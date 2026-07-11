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
    zones: { attribute: false },
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
      .zone-home-icon {
        background: none;
        border: none;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
      }
    `,
  ];

  constructor() {
    super();
    this.events = [];
    this.radiusKm = 10;
    this.radiusEnabled = false;
    this.zones = [];
    this.dark = false;
    this._markersById = new Map();
    this._didInitialFit = false;
    this._zonesSignature = "";
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
    this._renderZones();
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

  _markerStyle(accent, event) {
    return {
      radius: 9,
      color: accent,
      weight: 2,
      fillColor: accent,
      fillOpacity: 0.35,
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
    return div;
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
