import { LitElement, html, css, nothing } from "lit";
import { t } from "./i18n.js";

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
 * Create/edit form as an overlay panel. The map stays interactive for
 * geometry capture: "capture-request" asks the panel to route map clicks
 * here, the panel then calls setCoords()/setGeometry() with the result.
 * Emits "editor-save" {event}, "editor-delete" {id}, "editor-cancel".
 */
class ChronotopeEventEditor extends LitElement {
  static properties = {
    event: { attribute: false },
    categories: { attribute: false },
    captureMode: { attribute: false },
    _draft: { state: true },
    _error: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(380px, 90vw);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-inline-start: 1px solid var(--divider-color, #e0e0e0);
      box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
      overflow-y: auto;
      z-index: 1200;
      font-size: 14px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px;
    }
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }
    input,
    select,
    textarea {
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 6px;
      font: inherit;
      color-scheme: light dark;
    }
    textarea {
      min-height: 60px;
      resize: vertical;
    }
    .row {
      display: flex;
      gap: 8px;
    }
    .row > label {
      flex: 1;
    }
    .buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: transparent;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.danger {
      border-color: var(--error-color, #f44336);
      color: var(--error-color, #f44336);
    }
    button[aria-pressed="true"] {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .error {
      color: var(--error-color, #f44336);
      font-size: 13px;
    }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
  `;

  willUpdate(changed) {
    if (changed.has("event")) {
      const ev = this.event || {};
      this._draft = {
        id: ev.id,
        title: ev.title || "",
        category: ev.category || "",
        start: isoToLocalInput(ev.start_time),
        end: isoToLocalInput(ev.end_time),
        address: ev.address || "",
        lat: ev.lat ?? "",
        lon: ev.lon ?? "",
        recurrence: ev.recurrence || "",
        time_precision: ev.time_precision || "exact",
        schedule_text: ev.schedule_text || "",
        source_name: ev.source_name || "",
        source_url: ev.source_url || "",
        raw_description: ev.raw_description || "",
        geometry: ev.geometry || "",
        favorite: Boolean(ev.favorite),
      };
      this._error = null;
    }
  }

  /** Called by the panel when a map click arrives in "point" capture mode. */
  setCoords(lat, lon) {
    this._draft = {
      ...this._draft,
      lat: Number(lat.toFixed(6)),
      lon: Number(lon.toFixed(6)),
    };
  }

  /** Called by the panel when a line/polygon capture is finished. */
  setGeometry(geojson) {
    this._draft = { ...this._draft, geometry: JSON.stringify(geojson) };
  }

  render() {
    const d = this._draft || {};
    return html`
      <form @submit=${this._save}>
        <h2>${d.id ? t("editor.edit") : t("editor.new")}</h2>
        ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
        <label>
          ${t("editor.title")}
          <input required .value=${d.title} @input=${this._set("title")} />
        </label>
        <label>
          ${t("editor.category")}
          <input list="categories" .value=${d.category} @input=${this._set("category")} />
          <datalist id="categories">
            ${(this.categories || []).map((c) => html`<option value=${c}></option>`)}
          </datalist>
        </label>
        <div class="row">
          <label>
            ${t("editor.start")}
            <input type="datetime-local" required .value=${d.start} @input=${this._set("start")} />
          </label>
          <label>
            ${t("editor.end")}
            <input type="datetime-local" required .value=${d.end} @input=${this._set("end")} />
          </label>
        </div>
        <label>
          ${t("editor.address")}
          <input
            .value=${d.address}
            placeholder=${t("editor.address.placeholder")}
            @input=${this._set("address")}
          />
        </label>
        <div class="row">
          <label>
            Lat
            <input type="number" step="any" .value=${String(d.lat)} @input=${this._set("lat")} />
          </label>
          <label>
            Lon
            <input type="number" step="any" .value=${String(d.lon)} @input=${this._set("lon")} />
          </label>
        </div>
        <div class="buttons">
          <button
            type="button"
            aria-pressed=${this.captureMode === "point" ? "true" : "false"}
            @click=${() => this._requestCapture("point")}
          >
            ${t("editor.pickPoint")}
          </button>
        </div>
        <label>
          ${t("editor.rrule")}
          <input
            .value=${d.recurrence}
            placeholder="FREQ=WEEKLY;BYDAY=SA"
            @input=${this._set("recurrence")}
          />
        </label>
        <div class="row">
          <label>
            ${t("editor.precision")}
            <select .value=${d.time_precision} @change=${this._set("time_precision")}>
              <option value="exact">${t("editor.precision.exact")}</option>
              <option value="approximate">${t("editor.precision.approximate")}</option>
            </select>
          </label>
          <label>
            ${t("editor.scheduleText")}
            <input
              .value=${d.schedule_text}
              placeholder=${t("editor.scheduleText.placeholder")}
              @input=${this._set("schedule_text")}
            />
          </label>
        </div>
        <label>
          ${t("editor.geometry")}
          <textarea .value=${d.geometry} @input=${this._set("geometry")}></textarea>
        </label>
        <div class="buttons">
          <button
            type="button"
            aria-pressed=${this.captureMode === "line" ? "true" : "false"}
            @click=${() => this._requestCapture("line")}
          >
            ${t("editor.drawLine")}
          </button>
          <button
            type="button"
            aria-pressed=${this.captureMode === "polygon" ? "true" : "false"}
            @click=${() => this._requestCapture("polygon")}
          >
            ${t("editor.drawPolygon")}
          </button>
          ${this.captureMode === "line" || this.captureMode === "polygon"
            ? html`<button type="button" class="primary" @click=${this._finishCapture}>
                ${t("editor.applyDrawing")}
              </button>`
            : nothing}
        </div>
        ${this.captureMode
          ? html`<div class="hint">
              ${this.captureMode === "point"
                ? t("editor.captureHint.point")
                : t("editor.captureHint.points")}
            </div>`
          : nothing}
        <div class="row">
          <label>
            ${t("editor.source")}
            <input .value=${d.source_name} @input=${this._set("source_name")} />
          </label>
          <label>
            ${t("editor.sourceUrl")}
            <input .value=${d.source_url} @input=${this._set("source_url")} />
          </label>
        </div>
        <label>
          ${t("editor.description")}
          <textarea .value=${d.raw_description} @input=${this._set("raw_description")}></textarea>
        </label>
        <label style="flex-direction: row; align-items: center; gap: 8px;">
          <input
            type="checkbox"
            .checked=${d.favorite}
            @change=${(ev) => (this._draft = { ...this._draft, favorite: ev.target.checked })}
          />
          ${t("editor.favorite")}
        </label>
        <div class="buttons">
          <button type="submit" class="primary">${t("editor.save")}</button>
          <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("editor-cancel"))}>
            ${t("editor.cancel")}
          </button>
          ${d.id
            ? html`<button
                type="button"
                class="danger"
                @click=${() =>
                  this.dispatchEvent(
                    new CustomEvent("editor-delete", { detail: { id: d.id } })
                  )}
              >
                ${t("editor.delete")}
              </button>`
            : nothing}
        </div>
      </form>
    `;
  }

  _set(field) {
    return (ev) => {
      this._draft = { ...this._draft, [field]: ev.target.value };
    };
  }

  _requestCapture(mode) {
    const next = this.captureMode === mode ? null : mode;
    this.dispatchEvent(new CustomEvent("capture-request", { detail: { mode: next } }));
  }

  _finishCapture() {
    this.dispatchEvent(new CustomEvent("capture-finish"));
  }

  _save(ev) {
    ev.preventDefault();
    const d = this._draft;
    if (!d.start || !d.end) {
      this._error = t("editor.error.times");
      return;
    }
    let geometry = null;
    if (d.geometry && d.geometry.trim()) {
      try {
        geometry = JSON.parse(d.geometry);
      } catch (err) {
        this._error = t("editor.error.geometry");
        return;
      }
    }
    const hasLat = d.lat !== "" && d.lat != null;
    const hasLon = d.lon !== "" && d.lon != null;
    if (hasLat !== hasLon) {
      this._error = t("editor.error.coords");
      return;
    }
    const event = {
      id: d.id || undefined,
      title: d.title,
      category: d.category,
      start_time: new Date(d.start).toISOString(),
      end_time: new Date(d.end).toISOString(),
      address: d.address || null,
      lat: hasLat ? Number(d.lat) : null,
      lon: hasLon ? Number(d.lon) : null,
      recurrence: d.recurrence || null,
      time_precision: d.time_precision,
      schedule_text: d.schedule_text || null,
      source_name: d.source_name || null,
      source_url: d.source_url || null,
      raw_description: d.raw_description || null,
      geometry,
      favorite: d.favorite,
    };
    this.dispatchEvent(new CustomEvent("editor-save", { detail: { event } }));
  }
}

customElements.define("chronotope-event-editor", ChronotopeEventEditor);
