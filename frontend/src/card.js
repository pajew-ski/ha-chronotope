import { LitElement, html, css } from "lit";
import "./map-view.js";
import { LayerRegistry } from "./layers/registry.js";
import { define } from "./define.js";
import { queryEvents } from "./api.js";
import { setLanguage, t } from "./i18n.js";

const EVENT_LOOKAHEAD_MS = 7 * 86400000;
const EVENT_POLL_MS = 5 * 60000;

/**
 * Lovelace card `custom:chronotope-map-card` (spec 7.8): the map view with
 * the layer registry and optionally the events of a profile, without the
 * filter bar. Layers must be enabled in the panel; the card only shows them.
 *
 *   type: custom:chronotope-map-card
 *   layers: [flights_regional, satellites_visual]
 *   center: [lat, lon]      # optional, default HA home
 *   zoom: 8                 # optional
 *   base: osm               # osm | topplus | esri_imagery
 *   profile: <id-or-name>   # optional, shows events of the profile
 *   show_events: true
 *   show_layer_toggle: true
 *   height: 400px           # or 100% in panel views
 */
class ChronotopeMapCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _events: { state: true },
    _layerVersion: { state: true },
    _hidden: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    ha-card, .card {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, #fff);
      box-shadow: var(--ha-card-box-shadow, none);
      border: 1px solid var(--divider-color, transparent);
      position: relative;
    }
    chronotope-map-view {
      flex: 1 1 auto;
      min-height: 200px;
    }
    .toggle {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 1000;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 12px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      gap: 2px;
      max-height: 60%;
      overflow: auto;
    }
    .toggle label {
      display: flex;
      gap: 4px;
      align-items: center;
      white-space: nowrap;
    }
    .toggle .off {
      color: var(--secondary-text-color, #727272);
    }
    input[type="checkbox"] {
      accent-color: var(--primary-color, #03a9f4);
    }
  `;

  static getStubConfig() {
    return { layers: [], show_events: true, show_layer_toggle: true, height: "400px" };
  }

  constructor() {
    super();
    this._config = null;
    this._events = [];
    this._layerVersion = 0;
    this._hidden = new Set();
    this._initialized = false;
    this._registry = new LayerRegistry({
      hass: null,
      onChange: () => {
        this._layerVersion += 1;
      },
    });
    // The card renders only the configured layers: activeIds is narrowed.
    this._registry.activeIds = () =>
      this._registry.configs
        .filter((config) => config.enabled && this._wanted(config.id) && !this._hidden.has(config.id))
        .map((config) => config.id);
  }

  setConfig(config) {
    if (!config || typeof config !== "object") throw new Error("chronotope-map-card: config required");
    this._config = {
      layers: Array.isArray(config.layers) ? config.layers : [],
      center: Array.isArray(config.center) && config.center.length === 2 ? config.center : null,
      zoom: config.zoom || 8,
      base: config.base || "osm",
      profile: config.profile || null,
      show_events: config.show_events !== false,
      show_layer_toggle: config.show_layer_toggle !== false,
      height: config.height || "400px",
    };
    this.style.height = this._config.height;
  }

  getCardSize() {
    return 6;
  }

  _wanted(id) {
    return !this._config?.layers?.length || this._config.layers.includes(id);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._initialized) this._registry.start();
    this._eventTimer = setInterval(() => this._loadEvents(), EVENT_POLL_MS);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._registry.stop();
    clearInterval(this._eventTimer);
  }

  willUpdate(changed) {
    if (changed.has("hass") && this.hass) {
      setLanguage(this.hass.locale?.language || this.hass.language);
      this._registry.setHass(this.hass);
      if (!this._initialized && this._config) {
        this._initialized = true;
        this._init();
      }
    }
  }

  async _init() {
    try {
      await this._registry.loadCatalog();
      await this._registry.loadConfigs();
      this._registry.start();
    } catch (err) {
      console.error("chronotope-map-card: loading layers failed", err);
    }
    this._loadEvents();
  }

  async _loadEvents() {
    if (!this.hass || !this._config?.show_events) return;
    try {
      let filters = {};
      if (this._config.profile) {
        const result = await this.hass.callWS({ type: "chronotope/profiles/list" });
        const profile = (result.profiles || []).find(
          (p) => p.id === this._config.profile || p.name === this._config.profile
        );
        if (profile) filters = { ...(profile.filters || {}) };
        delete filters.layers;
      }
      const now = new Date();
      const response = await queryEvents(this.hass, {
        ...filters,
        start: now.toISOString(),
        end: new Date(now.getTime() + EVENT_LOOKAHEAD_MS).toISOString(),
        limit: 500,
      });
      this._events = response.events || [];
    } catch (err) {
      console.warn("chronotope-map-card: loading events failed", err);
    }
  }

  render() {
    if (!this._config) return html``;
    const dark = Boolean(this.hass?.themes?.darkMode);
    const center = this._config.center || [this.hass?.config?.latitude ?? 52.52, this.hass?.config?.longitude ?? 13.405];
    return html`
      <div class="card">
        <chronotope-map-view
          .events=${this._events}
          .center=${{ lat: center[0], lon: center[1] }}
          .zones=${[]}
          .persons=${[]}
          .geoMarkers=${[]}
          .dark=${dark}
          .basemap=${this._config.base}
          .basemaps=${this._registry.catalog.basemaps}
          .registry=${this._registry}
          .layerVersion=${this._layerVersion}
          .initialView=${{ center, zoom: this._config.zoom }}
          .showEvents=${this._config.show_events}
          @viewport-changed=${(ev) => this._registry.setViewport(ev.detail.bbox, ev.detail.zoom)}
        ></chronotope-map-view>
        ${this._config.show_layer_toggle ? this._renderToggle() : ""}
      </div>
    `;
  }

  _renderToggle() {
    const ids = this._config.layers.length
      ? this._config.layers
      : this._registry.configs.filter((c) => c.enabled).map((c) => c.id);
    if (!ids.length) return "";
    return html`
      <div class="toggle">
        ${ids.map((id) => {
          const config = this._registry.configFor(id);
          const spec = this._registry.spec(id);
          const enabled = Boolean(config?.enabled);
          const title = spec ? t(spec.title_key) : config?.title || id;
          return html`
            <label class=${enabled ? "" : "off"} title=${enabled ? "" : t("card.layersDisabled")}>
              <input
                type="checkbox"
                ?disabled=${!enabled}
                .checked=${enabled && !this._hidden.has(id)}
                @change=${(ev) => this._toggle(id, ev.target.checked)}
              />
              ${title}
            </label>
          `;
        })}
      </div>
    `;
  }

  _toggle(id, visible) {
    const hidden = new Set(this._hidden);
    if (visible) hidden.delete(id);
    else hidden.add(id);
    this._hidden = hidden;
    this._layerVersion += 1;
  }
}

define("chronotope-map-card", ChronotopeMapCard);

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "chronotope-map-card")) {
  window.customCards.push({
    type: "chronotope-map-card",
    name: "Chronotope map",
    description: "Chronotope events and geo data layers on a Leaflet map.",
    preview: false,
  });
}
