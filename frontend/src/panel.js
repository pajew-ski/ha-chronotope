import { LitElement, html, css } from "lit";
import "./map-view.js";
import "./filter-bar.js";
import "./event-list.js";
import "./event-editor.js";
import "./layer-panel.js";
import { LayerRegistry } from "./layers/registry.js";
import { define } from "./define.js";
import {
  queryEvents,
  fetchCategories,
  fetchIcsUrl,
  buildWsFilters,
  listProfiles,
  saveProfile,
  deleteProfile,
  saveEvent,
  deleteEvent,
  flagEvent,
  fetchStats,
} from "./api.js";
import { setLanguage, t } from "./i18n.js";

const QUERY_DEBOUNCE_MS = 250;
// Filter keys that only change the display, not the server query.
const DISPLAY_ONLY_KEYS = new Set([
  "showZones",
  "showPersons",
  "showGeoFeeds",
  "dayFilter",
  "filtersCollapsed",
]);
// Filter/layer state persists per browser; bump the version when the
// filter shape changes incompatibly. v2 adds basemap and layer panel state
// (spec 7.1) and migrates v1 on first load.
const STORAGE_KEY = "chronotope-panel-state-v2";
const LEGACY_STORAGE_KEYS = ["chronotope-panel-state-v1"];
const STATUS_POLL_MS = 30000;

function defaultFilters() {
  return {
    categories: [],
    radiusEnabled: false,
    radiusKm: 10,
    center: null,
    start: "",
    end: "",
    weekdays: [],
    timeMode: "allday",
    timeFrom: "",
    timeTo: "",
    text: "",
    favoritesOnly: false,
    showHidden: false,
    showZones: true,
    showPersons: true,
    showGeoFeeds: true,
    dayFilter: "",
    filtersCollapsed: false,
  };
}

function isoToLocalInput(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

/**
 * The Chronotope custom panel. Home Assistant sets the properties
 * `hass`, `narrow`, `route` and `panel` on this element.
 */
class ChronotopePanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { attribute: false },
    route: { attribute: false },
    panel: { attribute: false },
    _events: { state: true },
    _categories: { state: true },
    _filters: { state: true },
    _selectedId: { state: true },
    _icsCopied: { state: true },
    _error: { state: true },
    _profiles: { state: true },
    _selectedProfileId: { state: true },
    _editing: { state: true },
    _capture: { state: true },
    _stats: { state: true },
    _basemap: { state: true },
    _layersCollapsed: { state: true },
    _layerVersion: { state: true },
    _mapCenter: { state: true },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    header {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 56px;
      padding: 0 16px;
      flex: 0 0 auto;
      background: var(--app-header-background-color, var(--primary-color, #03a9f4));
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
    }
    header h1 {
      font-size: 20px;
      font-weight: 400;
      margin: 0;
      flex: 1;
    }
    .count {
      font-size: 14px;
      opacity: 0.85;
    }
    .new-event {
      border: 1px solid currentColor;
      border-radius: 4px;
      background: transparent;
      color: inherit;
      font: inherit;
      font-size: 14px;
      padding: 5px 12px;
      cursor: pointer;
    }
    chronotope-filter-bar {
      flex: 0 0 auto;
    }
    .error {
      flex: 0 0 auto;
      padding: 8px 16px;
      background: var(--error-color, #f44336);
      color: var(--text-primary-color, #fff);
      font-size: 14px;
    }
    .content {
      flex: 1 1 auto;
      display: flex;
      min-height: 0;
      position: relative;
    }
    chronotope-event-list {
      flex: 0 0 340px;
      border-inline-end: 1px solid var(--divider-color, #e0e0e0);
    }
    chronotope-map-view {
      flex: 1 1 auto;
    }
    .content.narrow {
      flex-direction: column-reverse;
    }
    .content.narrow chronotope-event-list {
      flex: 1 1 45%;
      border-inline-end: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .content.narrow chronotope-map-view {
      flex: 1 1 55%;
    }
  `;

  constructor() {
    super();
    this._events = [];
    this._categories = [];
    this._selectedId = null;
    this._icsCopied = false;
    this._error = null;
    this._profiles = [];
    this._selectedProfileId = "";
    this._editing = null;
    this._capture = null;
    this._stats = null;
    this._filters = defaultFilters();
    this._initialized = false;
    this._basemap = "osm";
    this._layersCollapsed = true;
    this._layerVersion = 0;
    this._mapCenter = null;
    this._deepLink = null;
    this._registry = new LayerRegistry({
      hass: null,
      onChange: () => {
        this._layerVersion += 1;
      },
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._statusTimer = setInterval(() => {
      if (!document.hidden && this._registry.layersEnabled) this._registry.refreshStatus().catch(() => {});
    }, STATUS_POLL_MS);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._statusTimer);
    this._registry.stop();
  }

  willUpdate(changed) {
    if (changed.has("hass") && this.hass) {
      setLanguage(this.hass.locale?.language || this.hass.language);
    }
    if (changed.has("hass") && this.hass) this._registry.setHass(this.hass);
    if (changed.has("hass") && this.hass && !this._initialized) {
      this._initialized = true;
      const persisted = this._loadPersistedState();
      this._filters = {
        ...defaultFilters(),
        ...(persisted?.filters || {}),
        center: persisted?.filters?.center || this._homeCenter(),
        // First visit on a phone starts collapsed so the map is visible.
        filtersCollapsed:
          persisted?.filters?.filtersCollapsed ?? Boolean(this.narrow),
      };
      this._selectedProfileId = persisted?.selectedProfileId || "";
      this._basemap = persisted?.basemap || "osm";
      this._layersCollapsed = persisted?.layersCollapsed ?? true;
      // Deep link (7.8): URL parameters win over the stored state for this
      // visit but are not persisted.
      this._deepLink = this._parseDeepLink();
      if (this._deepLink?.base) this._basemap = this._deepLink.base;
      if (this._deepLink?.profile) this._selectedProfileId = this._deepLink.profile;
      this._loadCategories();
      this._loadProfiles();
      this._loadStats();
      this._loadLayers();
      this._runQuery();
    }
  }

  updated(changed) {
    if (!this._initialized) return;
    if (
      changed.has("_filters") ||
      changed.has("_selectedProfileId") ||
      changed.has("_basemap") ||
      changed.has("_layersCollapsed")
    ) {
      this._persistState();
    }
  }

  _persistState() {
    if (this._deepLink) return; // ephemeral view, see _parseDeepLink
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 2,
          filters: this._filters,
          selectedProfileId: this._selectedProfileId,
          basemap: this._basemap,
          layersCollapsed: this._layersCollapsed,
        })
      );
    } catch (err) {
      // Storage full or blocked: the panel still works, just non-sticky.
    }
  }

  _parseDeepLink() {
    let params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (err) {
      return null;
    }
    const keys = ["layers", "lat", "lon", "z", "profile", "base"];
    if (!keys.some((key) => params.has(key))) return null;
    const lat = Number(params.get("lat"));
    const lon = Number(params.get("lon"));
    return {
      layers: (params.get("layers") || "").split(",").map((v) => v.trim()).filter(Boolean),
      center: Number.isFinite(lat) && Number.isFinite(lon) && params.has("lat") ? [lat, lon] : null,
      zoom: params.has("z") ? Number(params.get("z")) : null,
      profile: params.get("profile") || null,
      base: params.get("base") || null,
    };
  }

  _homeCenter() {
    return {
      lat: this.hass.config.latitude,
      lon: this.hass.config.longitude,
    };
  }

  _loadPersistedState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
      // Migration from v1: same filter shape, no basemap/layer state yet.
      for (const legacyKey of LEGACY_STORAGE_KEYS) {
        const legacy = window.localStorage.getItem(legacyKey);
        if (legacy) {
          const parsed = JSON.parse(legacy);
          const migrated = { version: 2, filters: parsed.filters || {}, selectedProfileId: parsed.selectedProfileId || "", basemap: "osm", layersCollapsed: true };
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          window.localStorage.removeItem(legacyKey);
          return migrated;
        }
      }
      return null;
    } catch (err) {
      console.warn("chronotope: persisted panel state unreadable", err);
      return null;
    }
  }

  _onResetView() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      // ignore
    }
    this._filters = { ...defaultFilters(), center: this._homeCenter() };
    this._selectedProfileId = "";
    this._basemap = "osm";
    this._layersCollapsed = true;
    this._icsCopied = false;
    this._error = null;
    this._scheduleQuery();
  }

  // --------------------------------------------------------------- layers

  async _loadLayers() {
    try {
      await this._registry.loadCatalog();
      await this._registry.loadConfigs();
      this._registry.start();
      if (this._deepLink?.layers?.length) {
        for (const id of this._deepLink.layers) {
          if (!this._registry.configFor(id)?.enabled && this._registry.spec(id)) {
            await this._registry.setEnabled(id, true);
          }
        }
      }
    } catch (err) {
      console.error("chronotope: loading layers failed", err);
    }
  }

  async _onLayerToggle(ev) {
    try {
      await this._registry.setEnabled(ev.detail.id, ev.detail.enabled);
      this._error = null;
      if (this._registry.spec(ev.detail.id)?.klass === "events") {
        this._scheduleQuery();
        this._loadCategories();
      }
    } catch (err) {
      this._error = t("error.layers", { msg: err.message || err.code || err });
    }
  }

  async _onLayerSave(ev) {
    try {
      await this._registry.save(ev.detail.layer);
      this._error = null;
    } catch (err) {
      this._error = t("error.layers", { msg: err.message || err.code || err });
    }
  }

  async _onLayerDelete(ev) {
    try {
      await this._registry.remove(ev.detail.id);
    } catch (err) {
      this._error = t("error.layers", { msg: err.message || err.code || err });
    }
  }

  async _onLayerPreview(ev) {
    try {
      ev.detail.resolve(await this._registry.preview(ev.detail.layer));
    } catch (err) {
      ev.detail.resolve({ ok: false, error: err.message || err.code || String(err) });
    }
  }

  _onViewportChanged(ev) {
    this._mapCenter = ev.detail.center;
    this._registry.setViewport(ev.detail.bbox, ev.detail.zoom);
  }

  async _loadStats() {
    try {
      this._stats = await fetchStats(this.hass);
    } catch (err) {
      console.error("chronotope: loading stats failed", err);
    }
  }

  get _displayedEvents() {
    if (!this._filters.dayFilter) return this._events;
    const dayStart = new Date(`${this._filters.dayFilter}T00:00:00`);
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    return this._events.filter((event) => {
      const pairs = event.occurrences || [[event.start_time, event.end_time]];
      return pairs.some(
        ([start, end]) => new Date(start) < dayEnd && new Date(end) > dayStart
      );
    });
  }

  render() {
    const dark = Boolean(this.hass?.themes?.darkMode);
    const events = this._displayedEvents;
    return html`
      <header>
        <h1>Chronotope</h1>
        <span class="count">
          ${t(events.length === 1 ? "panel.count.one" : "panel.count.other", {
            n: events.length,
          })}
        </span>
        <button class="new-event" @click=${this._onNewEvent}>
          ${t("panel.newEvent")}
        </button>
      </header>
      <chronotope-filter-bar
        .state=${this._filters}
        .categories=${this._categories}
        .icsCopied=${this._icsCopied}
        .profiles=${this._profiles}
        .selectedProfileId=${this._selectedProfileId}
        .stats=${this._stats}
        .collapsed=${this._filters.filtersCollapsed}
        .layersCollapsed=${this._layersCollapsed}
        .narrow=${Boolean(this.narrow)}
        @toggle-collapsed=${this._onToggleFilters}
        @toggle-layers=${() => {
          this._layersCollapsed = !this._layersCollapsed;
        }}
        @filters-changed=${this._onFiltersChanged}
        @ics-requested=${this._onIcsRequested}
        @profile-selected=${this._onProfileSelected}
        @profile-save=${this._onProfileSave}
        @profile-delete=${this._onProfileDelete}
        @stats-requested=${this._loadStats}
        @reset-requested=${this._onResetView}
      >
        <chronotope-layer-panel
          slot="layers"
          .catalog=${this._registry.catalog}
          .configs=${this._registry.configs}
          .freshness=${(id) => this._registry.freshness(id)}
          .version=${this._layerVersion}
          .layersEnabled=${Boolean(this._registry.layersEnabled)}
          .basemap=${this._basemap}
          .mapCenter=${this._mapCenter}
          .homeCenter=${this._homeCenter()}
          .narrow=${Boolean(this.narrow)}
          @layer-toggle=${this._onLayerToggle}
          @layer-save=${this._onLayerSave}
          @layer-delete=${this._onLayerDelete}
          @layer-preview=${this._onLayerPreview}
          @basemap-changed=${(ev) => {
            this._basemap = ev.detail.basemap;
          }}
        ></chronotope-layer-panel>
      </chronotope-filter-bar>
      ${this._error ? html`<div class="error">${this._error}</div>` : ""}
      <div class="content ${this.narrow ? "narrow" : ""}">
        <chronotope-event-list
          .events=${events}
          .selectedId=${this._selectedId}
          .locale=${this.hass?.locale?.language}
          @event-selected=${this._onEventSelected}
          @event-flag=${this._onEventFlag}
          @event-edit=${this._onEventEdit}
        ></chronotope-event-list>
        <chronotope-map-view
          .events=${events}
          .center=${this._filters.center}
          .radiusKm=${this._filters.radiusKm}
          .radiusEnabled=${this._filters.radiusEnabled}
          .zones=${this._filters.showZones ? this._haZones() : []}
          .persons=${this._filters.showPersons ? this._haPersons() : []}
          .geoMarkers=${this._filters.showGeoFeeds ? this._haGeoLocations() : []}
          .capture=${this._capture}
          .selectedId=${this._selectedId}
          .dark=${dark}
          .basemap=${this._basemap}
          .basemaps=${this._registry.catalog.basemaps}
          .registry=${this._registry}
          .layerVersion=${this._layerVersion}
          .initialView=${this._deepLink?.center ? { center: this._deepLink.center, zoom: this._deepLink.zoom || 10 } : null}
          @map-click=${this._onMapClick}
          @event-selected=${this._onEventSelected}
          @viewport-changed=${this._onViewportChanged}
        ></chronotope-map-view>
        ${this._editing !== null
          ? html`<chronotope-event-editor
              .event=${this._editing}
              .categories=${this._categories}
              .captureMode=${this._capture?.mode || null}
              .narrow=${Boolean(this.narrow)}
              @editor-save=${this._onEditorSave}
              @editor-delete=${this._onEditorDelete}
              @editor-cancel=${this._onEditorCancel}
              @capture-request=${this._onCaptureRequest}
              @capture-finish=${this._onCaptureFinish}
            ></chronotope-event-editor>`
          : ""}
      </div>
    `;
  }

  /**
   * HA's native geo data: zone entities (incl. home) carry lat/lon/radius.
   * Areas have no coordinates in HA, so zones are what we can render.
   */
  _haZones() {
    const states = this.hass?.states || {};
    const zones = Object.values(states)
      .filter((st) => st.entity_id.startsWith("zone."))
      .map((st) => ({
        id: st.entity_id,
        name: st.attributes.friendly_name || st.entity_id,
        lat: st.attributes.latitude,
        lon: st.attributes.longitude,
        radius: st.attributes.radius ?? 100,
        passive: Boolean(st.attributes.passive),
        home: st.entity_id === "zone.home",
      }))
      .filter((zone) => zone.lat != null && zone.lon != null);
    if (!zones.some((zone) => zone.home) && this.hass?.config?.latitude != null) {
      zones.push({
        id: "home",
        name: t("panel.home"),
        lat: this.hass.config.latitude,
        lon: this.hass.config.longitude,
        radius: 100,
        passive: false,
        home: true,
      });
    }
    return zones;
  }

  /** Live positions of person.* entities (photo or initial as marker). */
  _haPersons() {
    const states = this.hass?.states || {};
    return Object.values(states)
      .filter((st) => st.entity_id.startsWith("person."))
      .map((st) => ({
        id: st.entity_id,
        name: st.attributes.friendly_name || st.entity_id,
        lat: st.attributes.latitude,
        lon: st.attributes.longitude,
        picture: st.attributes.entity_picture || null,
        state: st.state,
      }))
      .filter((person) => person.lat != null && person.lon != null);
  }

  /** geo_location.* entities (earthquake/disaster/GeoJSON feeds). */
  _haGeoLocations() {
    const states = this.hass?.states || {};
    return Object.values(states)
      .filter((st) => st.entity_id.startsWith("geo_location."))
      .map((st) => ({
        id: st.entity_id,
        name: st.attributes.friendly_name || st.entity_id,
        lat: st.attributes.latitude,
        lon: st.attributes.longitude,
        source: st.attributes.source || "geo_location",
        distance: st.state,
        unit: st.attributes.unit_of_measurement || "km",
      }))
      .filter((marker) => marker.lat != null && marker.lon != null);
  }

  _onToggleFilters() {
    this._filters = {
      ...this._filters,
      filtersCollapsed: !this._filters.filtersCollapsed,
    };
  }

  _onFiltersChanged(ev) {
    this._filters = { ...this._filters, ...ev.detail };
    this._icsCopied = false;
    const queryKeys = Object.keys(ev.detail).filter(
      (key) => !DISPLAY_ONLY_KEYS.has(key)
    );
    if (queryKeys.length) this._scheduleQuery();
  }

  _onMapClick(ev) {
    const { lat, lon } = ev.detail;
    if (this._capture?.mode === "point") {
      this._editorElement()?.setCoords(lat, lon);
      this._capture = null;
      return;
    }
    if (this._capture?.mode) {
      this._capture = {
        ...this._capture,
        points: [...this._capture.points, [lat, lon]],
      };
      return;
    }
    this._filters = { ...this._filters, center: { lat, lon } };
    if (this._filters.radiusEnabled) this._scheduleQuery();
  }

  _onEventSelected(ev) {
    this._selectedId = ev.detail.id;
  }

  _scheduleQuery() {
    clearTimeout(this._queryTimer);
    this._queryTimer = setTimeout(() => this._runQuery(), QUERY_DEBOUNCE_MS);
  }

  async _loadCategories() {
    try {
      const result = await fetchCategories(this.hass);
      this._categories = result.categories;
    } catch (err) {
      console.error("chronotope: loading categories failed", err);
    }
  }

  async _loadProfiles() {
    try {
      const result = await listProfiles(this.hass);
      this._profiles = result.profiles;
    } catch (err) {
      console.error("chronotope: loading profiles failed", err);
    }
  }

  async _runQuery() {
    if (!this.hass) return;
    try {
      const result = await queryEvents(this.hass, buildWsFilters(this._filters));
      this._events = result.events;
      this._error = null;
      if (this._selectedId && !this._events.some((ev) => ev.id === this._selectedId)) {
        this._selectedId = null;
      }
    } catch (err) {
      this._error = t("error.query", { msg: err.message || err.code || err });
    }
  }

  // ------------------------------------------------------------- profiles

  _onProfileSelected(ev) {
    this._selectedProfileId = ev.detail.id;
    const profile = this._profiles.find((p) => p.id === ev.detail.id);
    if (profile) {
      this._applyProfileFilters(profile.filters || {});
      this._applyProfileLayers(profile.filters?.layers);
    }
  }

  /** Profiles may carry `layers: [ids]`; applying enables those layers and
   * leaves every other layer untouched (7.1). */
  async _applyProfileLayers(ids) {
    if (!Array.isArray(ids) || !ids.length) return;
    for (const id of ids) {
      if (!this._registry.configFor(id)?.enabled && this._registry.spec(id)) {
        try {
          await this._registry.setEnabled(id, true);
        } catch (err) {
          console.warn("chronotope: enabling layer from profile failed", id, err);
        }
      }
    }
  }

  _applyProfileFilters(f) {
    const center = f.center || this._filters.center;
    this._filters = {
      ...this._filters,
      categories: f.categories || [],
      radiusEnabled: Boolean(f.center && f.radius_km != null),
      radiusKm: f.radius_km != null ? f.radius_km : this._filters.radiusKm,
      center,
      start: isoToLocalInput(f.start),
      end: isoToLocalInput(f.end),
      weekdays: f.weekdays || [],
      timeMode: f.time_from || f.time_to ? "range" : "allday",
      timeFrom: f.time_from || "",
      timeTo: f.time_to || "",
      text: f.text || "",
      favoritesOnly: Boolean(f.favorites_only),
      dayFilter: "",
    };
    this._scheduleQuery();
  }

  async _onProfileSave(ev) {
    try {
      const result = await saveProfile(this.hass, {
        id: ev.detail.id,
        name: ev.detail.name,
        filters: { ...buildWsFilters(this._filters), layers: this._registry.activeIds() },
      });
      await this._loadProfiles();
      this._selectedProfileId = result.profile.id;
      this._error = null;
    } catch (err) {
      this._error = t("error.profileSave", { msg: err.message || err.code || err });
    }
  }

  async _onProfileDelete(ev) {
    try {
      await deleteProfile(this.hass, ev.detail.id);
      if (this._selectedProfileId === ev.detail.id) this._selectedProfileId = "";
      await this._loadProfiles();
    } catch (err) {
      this._error = t("error.profileDelete", { msg: err.message || err.code || err });
    }
  }

  // --------------------------------------------------------------- editor

  _editorElement() {
    return this.renderRoot.querySelector("chronotope-event-editor");
  }

  _onNewEvent() {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    const inTwoHours = new Date(now.getTime() + 2 * 3600000);
    this._editing = {
      start_time: now.toISOString(),
      end_time: inTwoHours.toISOString(),
    };
    this._capture = null;
  }

  _onEventEdit(ev) {
    const event = this._events.find((e) => e.id === ev.detail.id);
    if (event) {
      this._editing = event;
      this._capture = null;
    }
  }

  async _onEditorSave(ev) {
    try {
      await saveEvent(this.hass, ev.detail.event);
      this._editing = null;
      this._capture = null;
      this._error = null;
      await this._runQuery();
      await this._loadCategories();
    } catch (err) {
      this._error = t("error.save", { msg: err.message || err.code || err });
    }
  }

  async _onEditorDelete(ev) {
    try {
      await deleteEvent(this.hass, ev.detail.id);
      this._editing = null;
      this._capture = null;
      await this._runQuery();
    } catch (err) {
      this._error = t("error.delete", { msg: err.message || err.code || err });
    }
  }

  _onEditorCancel() {
    this._editing = null;
    this._capture = null;
  }

  _onCaptureRequest(ev) {
    const mode = ev.detail.mode;
    this._capture = mode ? { mode, points: [] } : null;
  }

  _onCaptureFinish() {
    const capture = this._capture;
    if (!capture) return;
    if (capture.mode === "line" && capture.points.length >= 2) {
      this._editorElement()?.setGeometry({
        type: "LineString",
        coordinates: capture.points.map(([lat, lon]) => [lon, lat]),
      });
    } else if (capture.mode === "polygon" && capture.points.length >= 3) {
      const ring = capture.points.map(([lat, lon]) => [lon, lat]);
      ring.push(ring[0]);
      this._editorElement()?.setGeometry({ type: "Polygon", coordinates: [ring] });
    } else {
      this._error = t("error.capture");
      return;
    }
    this._capture = null;
    this._error = null;
  }

  // ---------------------------------------------------------------- flags

  async _onEventFlag(ev) {
    const { id, ...flags } = ev.detail;
    try {
      await flagEvent(this.hass, id, flags);
      await this._runQuery();
    } catch (err) {
      this._error = t("error.action", { msg: err.message || err.code || err });
    }
  }

  async _onIcsRequested() {
    try {
      // With a profile selected the ICS URL references the profile, so the
      // subscription follows later edits to the profile automatically.
      const payload = this._selectedProfileId
        ? { profile_id: this._selectedProfileId }
        : buildWsFilters(this._filters);
      const result = await fetchIcsUrl(this.hass, payload);
      await navigator.clipboard.writeText(result.url);
      this._icsCopied = true;
      setTimeout(() => {
        this._icsCopied = false;
      }, 3000);
    } catch (err) {
      this._error = t("error.ics", { msg: err.message || err.code || err });
    }
  }
}

define("chronotope-panel", ChronotopePanel);
