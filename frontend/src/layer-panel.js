import { LitElement, html, css, nothing } from "lit";
import { define } from "./define.js";
import { t } from "./i18n.js";

const GROUP_ORDER = ["tracks", "events", "features", "grid", "raster", "custom"];

/**
 * Layer list with switches, freshness, opacity, parameters, NC badge and
 * the "add layer" form (spec 7.1). Talks to the panel through events:
 *  - "layer-toggle"  {id, enabled}
 *  - "layer-save"    {layer}           (params/opacity/interval or generic)
 *  - "layer-delete"  {id}
 *  - "layer-preview" {layer, resolve}  (panel runs the test request)
 *  - "basemap-changed" {basemap}
 */
class ChronotopeLayerPanel extends LitElement {
  static properties = {
    catalog: { attribute: false },
    configs: { attribute: false },
    freshness: { attribute: false },
    version: { attribute: false },
    layersEnabled: { attribute: false },
    basemap: { attribute: false },
    mapCenter: { attribute: false },
    homeCenter: { attribute: false },
    narrow: { type: Boolean, reflect: true },
    _open: { state: true },
    _adding: { state: true },
    _form: { state: true },
    _test: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      font-size: 13px;
      color: var(--primary-text-color, #212121);
    }
    .group-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color, #727272);
      margin: 10px 0 4px;
    }
    .layer {
      display: grid;
      grid-template-columns: auto 10px 1fr auto;
      align-items: center;
      gap: 6px 8px;
      padding: 3px 0;
    }
    .layer .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .layer.off .title {
      color: var(--secondary-text-color, #727272);
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--disabled-text-color, #9e9e9e);
    }
    .dot.fresh { background: #43a047; }
    .dot.stale { background: #fbc02d; }
    .dot.error, .dot.blocked { background: #e53935; }
    .badge {
      font-size: 10px;
      border: 1px solid var(--warning-color, #ff9800);
      color: var(--warning-color, #ff9800);
      border-radius: 3px;
      padding: 0 4px;
      margin-inline-start: 4px;
      cursor: help;
    }
    .tools {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    button.icon {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color, #727272);
      font: inherit;
      padding: 0 4px;
    }
    button.icon:hover { color: var(--primary-color, #03a9f4); }
    .details {
      grid-column: 3 / span 2;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 10px;
      align-items: center;
      padding: 4px 0 6px;
      font-size: 12px;
    }
    .details label {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    input[type="range"] {
      width: 110px;
      accent-color: var(--primary-color, #03a9f4);
    }
    input[type="checkbox"] { accent-color: var(--primary-color, #03a9f4); }
    input[type="text"], input[type="number"], input[type="url"], select {
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 3px 6px;
      font: inherit;
      font-size: 12px;
      max-width: 100%;
      color-scheme: light dark;
    }
    .hint {
      color: var(--secondary-text-color, #727272);
      font-size: 11px;
    }
    .warn {
      color: var(--error-color, #f44336);
      font-size: 11px;
    }
    .btn {
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: transparent;
      border-radius: 4px;
      padding: 3px 10px;
      cursor: pointer;
      font: inherit;
      font-size: 12px;
    }
    .btn[disabled] { opacity: 0.5; cursor: default; }
    form.add {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 10px;
      margin-top: 6px;
      max-width: 560px;
    }
    :host([narrow]) form.add { grid-template-columns: 1fr; }
    form.add label {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
    form.add .full { grid-column: 1 / -1; }
    .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  `;

  constructor() {
    super();
    this.catalog = { layers: [], presets: [], basemaps: {} };
    this.configs = [];
    this.freshness = () => "disabled";
    this.layersEnabled = false;
    this.basemap = "osm";
    this._open = new Set();
    this._adding = false;
    this._form = null;
    this._test = null;
  }

  // ------------------------------------------------------------ helpers

  _configFor(id) {
    return (this.configs || []).find((c) => c.id === id) || null;
  }

  _groups() {
    const groups = new Map();
    for (const spec of this.catalog?.layers || []) {
      const key = spec.klass;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ id: spec.id, spec, config: this._configFor(spec.id) });
    }
    const custom = (this.configs || []).filter((c) => !c.layer_id);
    if (custom.length) groups.set("custom", custom.map((c) => ({ id: c.id, spec: null, config: c })));
    return GROUP_ORDER.filter((k) => groups.has(k)).map((k) => [k, groups.get(k)]);
  }

  _title(entry) {
    if (entry.spec) return t(entry.spec.title_key);
    return entry.config?.title || entry.id;
  }

  _status(entry) {
    const status = entry.config?.status || {};
    const freshness = entry.config?.enabled ? this.freshness(entry.id) || status.freshness : "disabled";
    return { ...status, freshness };
  }

  _statusTitle(entry) {
    const status = this._status(entry);
    const parts = [t(`layers.freshness.${status.freshness || "disabled"}`)];
    if (status.last_success) parts.push(`${t("layers.lastSuccess")}: ${new Date(status.last_success).toLocaleString()}`);
    if (status.last_error) parts.push(`${t("layers.lastError")}: ${status.last_error}`);
    if (status.count != null) parts.push(`${status.count} ${t("layers.count")}`);
    return parts.join("\n");
  }

  // ------------------------------------------------------------- render

  render() {
    if (!this.layersEnabled) {
      return html`<div class="hint">${t("layers.disabled")}</div>${this._renderBasemap()}`;
    }
    return html`
      ${this._renderBasemap()}
      ${this._groups().map(
        ([group, entries]) => html`
          <div class="group-title">${t(`layers.group.${group}`)}</div>
          ${entries.map((entry) => this._renderLayer(entry, group))}
        `
      )}
      <div class="group-title">${t("layers.add")}</div>
      ${this._adding ? this._renderAddForm() : this._renderAddButtons()}
    `;
  }

  _renderBasemap() {
    const basemaps = Object.keys(this.catalog?.basemaps || { osm: {} });
    return html`
      <div class="row" style="margin-top:4px">
        <span class="hint">${t("basemap.label")}</span>
        <select
          .value=${this.basemap}
          @change=${(ev) => this.dispatchEvent(new CustomEvent("basemap-changed", { detail: { basemap: ev.target.value } }))}
        >
          ${basemaps.map((key) => html`<option value=${key} ?selected=${key === this.basemap}>${t(`basemap.${key}`)}</option>`)}
        </select>
      </div>
    `;
  }

  _renderLayer(entry, group) {
    const spec = entry.spec;
    const config = entry.config;
    const enabled = Boolean(config?.enabled);
    const missingKey = config?.missing_key || (spec?.requires_key && spec.key_set === false ? spec.requires_key : null);
    const status = this._status(entry);
    const open = this._open.has(entry.id);
    const nc = spec?.license?.noncommercial;
    return html`
      <div class="layer ${enabled ? "" : "off"}">
        <input
          type="checkbox"
          .checked=${enabled}
          ?disabled=${Boolean(missingKey)}
          title=${missingKey ? t("layers.keyMissing") : ""}
          @change=${(ev) => this.dispatchEvent(new CustomEvent("layer-toggle", { detail: { id: entry.id, enabled: ev.target.checked, spec } }))}
        />
        <span class="dot ${status.freshness || "disabled"}" title=${this._statusTitle(entry)}></span>
        <span class="title" title=${this._statusTitle(entry)}>
          ${this._title(entry)}
          ${nc ? html`<span class="badge" title=${t("layers.nc.title")}>${t("layers.nc")}</span>` : nothing}
        </span>
        <span class="tools">
          ${status.count != null && enabled ? html`<span class="hint">${status.count}</span>` : nothing}
          <button class="icon" title=${t("layers.params")} @click=${() => this._toggleOpen(entry.id)}>⚙</button>
        </span>
        ${open ? this._renderDetails(entry, group, missingKey) : nothing}
      </div>
    `;
  }

  _renderDetails(entry, group, missingKey) {
    const spec = entry.spec;
    const config = entry.config || {};
    const params = config.params || {};
    const schema = spec?.params_schema || {};
    const showOpacity = group === "raster" || group === "grid" || group === "custom" || spec?.klass === "features";
    const fields = [];
    for (const [name, rule] of Object.entries(schema)) {
      if (rule.type === "const") continue;
      if (rule.type === "number") {
        fields.push(html`<label>${t(`layers.params.${name}`)}
          <input type="number" min=${rule.min ?? ""} max=${rule.max ?? ""} .value=${String(params[name] ?? rule.default ?? "")}
            @change=${(ev) => this._setParam(entry, name, ev.target.value === "" ? null : Number(ev.target.value))} /></label>`);
      } else if (rule.type === "enum") {
        fields.push(html`<label>${t(`layers.params.${name}`)}
          <select .value=${String(params[name] ?? rule.default)} @change=${(ev) => this._setParam(entry, name, ev.target.value)}>
            ${rule.values.map((v) => html`<option value=${v} ?selected=${String(params[name] ?? rule.default) === v}>${v}</option>`)}
          </select></label>`);
      } else if (rule.type === "latlon") {
        const center = params[name];
        fields.push(html`<span class="hint">${t("layers.params.center")}: ${center ? `${center.lat.toFixed(3)}, ${center.lon.toFixed(3)}` : t("layers.params.useHome")}</span>
          <button class="btn" @click=${() => this._setParam(entry, name, this.mapCenter ? { lat: this.mapCenter.lat, lon: this.mapCenter.lon } : null)}>${t("layers.params.useMapCenter")}</button>
          <button class="btn" @click=${() => this._setParam(entry, name, null)}>${t("layers.params.useHome")}</button>`);
      }
    }
    const status = this._status(entry);
    return html`
      <div class="details">
        ${missingKey ? html`<span class="warn">${t("layers.keyMissing")}</span>` : nothing}
        ${spec?.klass === "events" ? html`<span class="hint">${t("layers.eventsHint")}</span>` : nothing}
        ${spec?.id === "satellites_active" ? html`<span class="warn">${t("layers.warning.active")}</span>` : nothing}
        ${spec?.license ? html`<span class="hint">${spec.license.id}${spec.license.notes ? ` · ${spec.license.notes}` : ""}</span>` : nothing}
        ${config.license_note ? html`<span class="hint">${config.license_note}</span>` : nothing}
        ${status.last_error ? html`<span class="warn">${status.last_error}</span>` : nothing}
        ${fields}
        ${spec && spec.klass !== "raster" ? html`<label>${t("layers.params.interval")}
          <input type="number" min=${spec.min_interval_s} .value=${String(config.interval_s ?? spec.default_interval_s)}
            @change=${(ev) => this._save(entry, { interval_s: Math.max(spec.min_interval_s, Number(ev.target.value) || spec.default_interval_s) })} /></label>` : nothing}
        ${showOpacity ? html`<label>${t("layers.opacity")}
          <input type="range" min="0.1" max="1" step="0.05" .value=${String(config.opacity ?? 1)}
            @change=${(ev) => this._save(entry, { opacity: Number(ev.target.value) })} /></label>` : nothing}
        ${!spec ? html`<button class="btn" @click=${() => this._delete(entry.id)}>${t("layers.delete")}</button>` : nothing}
      </div>
    `;
  }

  _renderAddButtons() {
    const presets = this.catalog?.presets || [];
    return html`
      <div class="row">
        <select @change=${(ev) => this._startFromPreset(ev.target.value)}>
          <option value="">${t("layers.add.presetPick")}</option>
          ${presets.map((p) => html`<option value=${p.preset_id}>${p.title}</option>`)}
        </select>
        <button class="btn" @click=${() => this._startCustom()}>${t("layers.add.custom")}</button>
      </div>
    `;
  }

  _renderAddForm() {
    const f = this._form;
    const test = this._test;
    return html`
      <form class="add" @submit=${(ev) => ev.preventDefault()}>
        <label>${t("layers.add.provider")}
          <select .value=${f.provider} @change=${(ev) => this._patchForm({ provider: ev.target.value })}>
            ${(this.catalog?.generic_providers || ["xyz", "wmts", "wms", "geojson_url"]).map((p) => html`<option value=${p} ?selected=${p === f.provider}>${p}</option>`)}
          </select></label>
        <label>${t("layers.add.title")}<input type="text" .value=${f.title} @input=${(ev) => this._patchForm({ title: ev.target.value })} /></label>
        <label class="full">${t("layers.add.url")}<input type="url" .value=${f.url} @input=${(ev) => this._patchForm({ url: ev.target.value })} /></label>
        ${f.provider === "wms" ? html`<label>${t("layers.add.wmsLayers")}<input type="text" .value=${f.wmsLayers} @input=${(ev) => this._patchForm({ wmsLayers: ev.target.value })} /></label>` : nothing}
        <label>${t("layers.add.attribution")}<input type="text" .value=${f.attributionText} @input=${(ev) => this._patchForm({ attributionText: ev.target.value })} /></label>
        <label>${t("layers.add.attributionUrl")}<input type="url" .value=${f.attributionUrl} @input=${(ev) => this._patchForm({ attributionUrl: ev.target.value })} /></label>
        <label class="full">${t("layers.add.license")}<input type="text" .value=${f.licenseNote} @input=${(ev) => this._patchForm({ licenseNote: ev.target.value })} /></label>
        <label>${t("layers.opacity")}<input type="range" min="0.1" max="1" step="0.05" .value=${String(f.opacity)} @change=${(ev) => this._patchForm({ opacity: Number(ev.target.value) })} /></label>
        <div class="row full">
          <button class="btn" @click=${() => this._runTest()}>${t("layers.add.test")}</button>
          <button class="btn" ?disabled=${!test?.ok} @click=${() => this._saveNew()}>${t("layers.add.save")}</button>
          <button class="btn" @click=${() => { this._adding = false; this._test = null; }}>${t("layers.add.cancel")}</button>
        </div>
        <div class="full">
          ${test === "pending" ? html`<span class="hint">${t("layers.add.testing")}</span>` : nothing}
          ${test && test !== "pending" && test.ok ? html`<span class="hint">${t("layers.add.testOk", { info: test.count != null ? `${test.count} features` : `${test.status} ${test.content_type || ""}` })}</span>` : nothing}
          ${test && test !== "pending" && !test.ok ? html`<span class="warn">${t("layers.add.testFailed", { msg: test.error })}</span>` : nothing}
          ${!test ? html`<span class="hint">${t("layers.add.needTest")}</span>` : nothing}
        </div>
      </form>
    `;
  }

  // ------------------------------------------------------------ actions

  _toggleOpen(id) {
    const open = new Set(this._open);
    if (open.has(id)) open.delete(id);
    else open.add(id);
    this._open = open;
  }

  _setParam(entry, name, value) {
    const params = { ...(entry.config?.params || {}) };
    if (value === null || value === undefined) delete params[name];
    else params[name] = value;
    this._save(entry, { params });
  }

  _save(entry, patch) {
    const base = entry.config
      ? { ...entry.config }
      : { layer_id: entry.spec.id, enabled: false, params: {}, interval_s: entry.spec.default_interval_s };
    delete base.status;
    delete base.missing_key;
    delete base.updated_at;
    this.dispatchEvent(new CustomEvent("layer-save", { detail: { layer: { ...base, ...patch } } }));
  }

  _delete(id) {
    if (!window.confirm(t("layers.delete.confirm"))) return;
    this.dispatchEvent(new CustomEvent("layer-delete", { detail: { id } }));
  }

  _emptyForm() {
    return { provider: "xyz", title: "", url: "", wmsLayers: "", attributionText: "", attributionUrl: "", licenseNote: "", opacity: 0.8, params: {} };
  }

  _startCustom() {
    this._form = this._emptyForm();
    this._test = null;
    this._adding = true;
  }

  _startFromPreset(presetId) {
    const preset = (this.catalog?.presets || []).find((p) => p.preset_id === presetId);
    if (!preset) return;
    this._form = {
      ...this._emptyForm(),
      provider: preset.provider,
      title: preset.title,
      url: preset.url,
      wmsLayers: preset.params?.layers || "",
      attributionText: preset.attribution?.text || "",
      attributionUrl: preset.attribution?.url || "",
      licenseNote: preset.license_note || "",
      opacity: preset.opacity ?? 0.8,
      params: { ...(preset.params || {}) },
      max_zoom: preset.max_zoom,
    };
    this._test = null;
    this._adding = true;
  }

  _patchForm(patch) {
    this._form = { ...this._form, ...patch };
    this._test = null;
  }

  _layerFromForm() {
    const f = this._form;
    const params = { ...(f.params || {}) };
    if (f.provider === "wms") params.layers = f.wmsLayers;
    const layer = {
      provider: f.provider,
      title: f.title,
      url: f.url,
      params,
      attribution: { text: f.attributionText, url: f.attributionUrl || null },
      license_note: f.licenseNote || null,
      opacity: f.opacity,
      enabled: true,
    };
    if (f.max_zoom) layer.max_zoom = f.max_zoom;
    return layer;
  }

  _runTest() {
    this._test = "pending";
    const layer = this._layerFromForm();
    this.dispatchEvent(
      new CustomEvent("layer-preview", {
        detail: {
          layer,
          resolve: (result) => {
            this._test = result || { ok: false, error: "no result" };
          },
        },
      })
    );
  }

  _saveNew() {
    if (!this._test || this._test === "pending" || !this._test.ok) return;
    const layer = this._test.config ? { ...this._test.config, enabled: true } : this._layerFromForm();
    this.dispatchEvent(new CustomEvent("layer-save", { detail: { layer } }));
    this._adding = false;
    this._test = null;
  }
}

define("chronotope-layer-panel", ChronotopeLayerPanel);
