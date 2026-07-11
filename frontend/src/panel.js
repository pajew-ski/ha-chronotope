import { LitElement, html, css } from "lit";
import "./map-view.js";
import "./filter-bar.js";
import "./event-list.js";
import {
  queryEvents,
  fetchCategories,
  fetchIcsUrl,
  buildWsFilters,
  listProfiles,
  saveProfile,
  deleteProfile,
} from "./api.js";

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

const QUERY_DEBOUNCE_MS = 250;

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
      flex: 1 1 50%;
      border-inline-end: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .content.narrow chronotope-map-view {
      flex: 1 1 50%;
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
    this._filters = {
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
      showZones: true,
    };
    this._initialized = false;
  }

  willUpdate(changed) {
    if (changed.has("hass") && this.hass && !this._initialized) {
      this._initialized = true;
      this._filters = {
        ...this._filters,
        center: {
          lat: this.hass.config.latitude,
          lon: this.hass.config.longitude,
        },
      };
      this._loadCategories();
      this._loadProfiles();
      this._runQuery();
    }
  }

  render() {
    const dark = Boolean(this.hass?.themes?.darkMode);
    return html`
      <header>
        <h1>Chronotope</h1>
        <span class="count">
          ${this._events.length} ${this._events.length === 1 ? "Event" : "Events"}
        </span>
      </header>
      <chronotope-filter-bar
        .state=${this._filters}
        .categories=${this._categories}
        .icsCopied=${this._icsCopied}
        .profiles=${this._profiles}
        .selectedProfileId=${this._selectedProfileId}
        @filters-changed=${this._onFiltersChanged}
        @ics-requested=${this._onIcsRequested}
        @profile-selected=${this._onProfileSelected}
        @profile-save=${this._onProfileSave}
        @profile-delete=${this._onProfileDelete}
      ></chronotope-filter-bar>
      ${this._error ? html`<div class="error">${this._error}</div>` : ""}
      <div class="content ${this.narrow ? "narrow" : ""}">
        <chronotope-event-list
          .events=${this._events}
          .selectedId=${this._selectedId}
          .locale=${this.hass?.locale?.language}
          @event-selected=${this._onEventSelected}
        ></chronotope-event-list>
        <chronotope-map-view
          .events=${this._events}
          .center=${this._filters.center}
          .radiusKm=${this._filters.radiusKm}
          .radiusEnabled=${this._filters.radiusEnabled}
          .zones=${this._filters.showZones ? this._haZones() : []}
          .selectedId=${this._selectedId}
          .dark=${dark}
          @center-changed=${this._onCenterChanged}
          @event-selected=${this._onEventSelected}
        ></chronotope-map-view>
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
        name: "Zuhause",
        lat: this.hass.config.latitude,
        lon: this.hass.config.longitude,
        radius: 100,
        passive: false,
        home: true,
      });
    }
    return zones;
  }

  _onFiltersChanged(ev) {
    this._filters = { ...this._filters, ...ev.detail };
    this._icsCopied = false;
    // showZones is a pure display toggle, no re-query needed.
    const queryKeys = Object.keys(ev.detail).filter((key) => key !== "showZones");
    if (queryKeys.length) this._scheduleQuery();
  }

  _onCenterChanged(ev) {
    this._filters = { ...this._filters, center: ev.detail };
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

  _onProfileSelected(ev) {
    this._selectedProfileId = ev.detail.id;
    const profile = this._profiles.find((p) => p.id === ev.detail.id);
    if (profile) this._applyProfileFilters(profile.filters || {});
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
    };
    this._scheduleQuery();
  }

  async _onProfileSave(ev) {
    try {
      const result = await saveProfile(this.hass, {
        id: ev.detail.id,
        name: ev.detail.name,
        filters: buildWsFilters(this._filters),
      });
      await this._loadProfiles();
      this._selectedProfileId = result.profile.id;
      this._error = null;
    } catch (err) {
      this._error = `Profil speichern fehlgeschlagen: ${err.message || err.code || err}`;
    }
  }

  async _onProfileDelete(ev) {
    try {
      await deleteProfile(this.hass, ev.detail.id);
      if (this._selectedProfileId === ev.detail.id) this._selectedProfileId = "";
      await this._loadProfiles();
    } catch (err) {
      this._error = `Profil löschen fehlgeschlagen: ${err.message || err.code || err}`;
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
      this._error = `Abfrage fehlgeschlagen: ${err.message || err.code || err}`;
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
      this._error = `ICS-URL konnte nicht kopiert werden: ${err.message || err.code || err}`;
    }
  }
}

customElements.define("chronotope-panel", ChronotopePanel);
