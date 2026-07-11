import { LitElement, html, css, nothing } from "lit";
import { t } from "./i18n.js";

/**
 * Filter controls. Receives the panel's filter state and the available
 * categories; emits "filters-changed" with a partial state patch and
 * "ics-requested" for the export button.
 */
class ChronotopeFilterBar extends LitElement {
  static properties = {
    state: { attribute: false },
    categories: { attribute: false },
    icsCopied: { attribute: false },
    profiles: { attribute: false },
    selectedProfileId: { attribute: false },
    stats: { attribute: false },
    _profileName: { state: true },
  };

  constructor() {
    super();
    this.profiles = [];
    this.selectedProfileId = "";
    this._profileName = "";
  }

  static styles = css`
    :host {
      display: block;
      background: var(--card-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      padding: 8px 16px 12px;
      font-size: 14px;
    }
    .groups {
      display: flex;
      flex-wrap: wrap;
      gap: 16px 24px;
      align-items: flex-start;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color, #727272);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 14px;
      padding: 3px 12px;
      cursor: pointer;
      background: transparent;
      color: var(--primary-text-color, #212121);
      font: inherit;
      line-height: 1.4;
    }
    .chip[aria-pressed="true"] {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    input[type="datetime-local"],
    input[type="time"],
    input[type="text"],
    select {
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 4px 6px;
      font: inherit;
      color-scheme: light dark;
    }
    input[type="range"] {
      width: 140px;
      accent-color: var(--primary-color, #03a9f4);
    }
    input[type="checkbox"] {
      accent-color: var(--primary-color, #03a9f4);
    }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
    .ics-button {
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: transparent;
      border-radius: 4px;
      padding: 5px 12px;
      cursor: pointer;
      font: inherit;
      white-space: nowrap;
    }
    .ics-button:hover {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
    }
    details.stats {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }
    details.stats summary {
      cursor: pointer;
    }
    details.stats table {
      border-collapse: collapse;
      margin-top: 4px;
    }
    details.stats td {
      padding: 1px 8px 1px 0;
    }
  `;

  updated(changed) {
    if (changed.has("selectedProfileId")) {
      const profile = (this.profiles || []).find((p) => p.id === this.selectedProfileId);
      this._profileName = profile ? profile.name : "";
    }
  }

  render() {
    const s = this.state;
    return html`
      <div class="groups">
        <div class="group">
          <span class="label">${t("profile.label")}</span>
          <div class="row">
            <select
              .value=${this.selectedProfileId || ""}
              @change=${(ev) =>
                this.dispatchEvent(
                  new CustomEvent("profile-selected", { detail: { id: ev.target.value } })
                )}
            >
              <option value="">${t("profile.none")}</option>
              ${(this.profiles || []).map(
                (profile) => html`
                  <option value=${profile.id} ?selected=${profile.id === this.selectedProfileId}>
                    ${profile.name}
                  </option>
                `
              )}
            </select>
            <input
              type="text"
              placeholder=${t("profile.placeholder")}
              .value=${this._profileName}
              @input=${(ev) => (this._profileName = ev.target.value)}
            />
            <button
              class="ics-button"
              title=${t("profile.save.title")}
              @click=${this._saveProfile}
            >
              ${t("profile.save")}
            </button>
            ${this.selectedProfileId
              ? html`<button
                  class="ics-button"
                  title=${t("profile.delete.title")}
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent("profile-delete", {
                        detail: { id: this.selectedProfileId },
                      })
                    )}
                >
                  ${t("profile.delete")}
                </button>`
              : nothing}
          </div>
        </div>

        <div class="group">
          <span class="label">${t("search.label")}</span>
          <div class="row">
            <input
              type="text"
              placeholder=${t("search.placeholder")}
              .value=${s.text || ""}
              @input=${(ev) => this._patch({ text: ev.target.value })}
            />
            <label class="row" style="gap:4px">
              <input
                type="checkbox"
                .checked=${s.favoritesOnly}
                @change=${(ev) => this._patch({ favoritesOnly: ev.target.checked })}
              />
              ${t("search.favorites")}
            </label>
          </div>
        </div>

        <div class="group">
          <span class="label">${t("category.label")}</span>
          <div class="chips">
            ${(this.categories || []).length === 0
              ? html`<span class="hint">${t("category.none")}</span>`
              : (this.categories || []).map(
                  (cat) => html`
                    <button
                      class="chip"
                      aria-pressed=${s.categories.includes(cat) ? "true" : "false"}
                      @click=${() => this._toggleCategory(cat)}
                    >
                      ${cat}
                    </button>
                  `
                )}
          </div>
        </div>

        <div class="group">
          <span class="label">${t("radius.label")}</span>
          <div class="row">
            <input
              type="checkbox"
              id="radius-enabled"
              .checked=${s.radiusEnabled}
              @change=${(ev) => this._patch({ radiusEnabled: ev.target.checked })}
            />
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              .value=${String(s.radiusKm)}
              ?disabled=${!s.radiusEnabled}
              @input=${(ev) => this._patch({ radiusKm: Number(ev.target.value) })}
            />
            <span>${s.radiusKm} km</span>
          </div>
          <span class="hint">${t("radius.hint")}</span>
        </div>

        <div class="group">
          <span class="label">${t("window.label")}</span>
          <div class="row">
            <input
              type="datetime-local"
              .value=${s.start}
              @change=${(ev) => this._patch({ start: ev.target.value, dayFilter: "" })}
            />
            <span>–</span>
            <input
              type="datetime-local"
              .value=${s.end}
              @change=${(ev) => this._patch({ end: ev.target.value, dayFilter: "" })}
            />
          </div>
          ${this._renderDaySlider(s)}
        </div>

        <div class="group">
          <span class="label">${t("weekdays.label")}</span>
          <div class="chips">
            ${t("weekdays.short").map(
              (name, index) => html`
                <button
                  class="chip"
                  aria-pressed=${s.weekdays.includes(index) ? "true" : "false"}
                  @click=${() => this._toggleWeekday(index)}
                >
                  ${name}
                </button>
              `
            )}
          </div>
          <div class="row">
            <select
              .value=${s.timeMode}
              @change=${(ev) => this._patch({ timeMode: ev.target.value })}
            >
              <option value="allday">${t("time.allday")}</option>
              <option value="range">${t("time.range")}</option>
            </select>
            ${s.timeMode === "range"
              ? html`
                  <input
                    type="time"
                    .value=${s.timeFrom}
                    @change=${(ev) => this._patch({ timeFrom: ev.target.value })}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    .value=${s.timeTo}
                    @change=${(ev) => this._patch({ timeTo: ev.target.value })}
                  />
                `
              : nothing}
          </div>
        </div>

        <div class="group">
          <span class="label">${t("map.label")}</span>
          <label class="row">
            <input
              type="checkbox"
              .checked=${s.showZones}
              @change=${(ev) => this._patch({ showZones: ev.target.checked })}
            />
            ${t("map.zones")}
          </label>
          <label class="row">
            <input
              type="checkbox"
              .checked=${s.showPersons}
              @change=${(ev) => this._patch({ showPersons: ev.target.checked })}
            />
            ${t("map.persons")}
          </label>
          <label class="row">
            <input
              type="checkbox"
              .checked=${s.showGeoFeeds}
              @change=${(ev) => this._patch({ showGeoFeeds: ev.target.checked })}
            />
            ${t("map.geofeeds")}
          </label>
        </div>

        <div class="group">
          <span class="label">${t("export.label")}</span>
          <button
            class="ics-button"
            @click=${() => this.dispatchEvent(new CustomEvent("ics-requested"))}
          >
            ${this.icsCopied ? t("export.copied") : t("export.copy")}
          </button>
          ${this._renderStats()}
        </div>
      </div>
    `;
  }

  _renderStats() {
    const stats = this.stats;
    if (!stats) return nothing;
    return html`
      <details class="stats" @toggle=${(ev) => {
        if (ev.target.open) this.dispatchEvent(new CustomEvent("stats-requested"));
      }}>
        <summary>${t("stats.summary", { n: stats.total_events })}</summary>
        <table>
          <tr><td>${t("stats.places")}</td><td>${stats.places}</td></tr>
          <tr><td>${t("stats.profiles")}</td><td>${stats.profiles}</td></tr>
          ${(stats.sources || []).map(
            (source) => html`
              <tr>
                <td>${source.source}</td>
                <td>
                  ${source.events} ${t("stats.events")}${source.last_scraped
                    ? html`, ${t("stats.last")}
                      ${new Date(source.last_scraped).toLocaleDateString()}`
                    : nothing}
                </td>
              </tr>
            `
          )}
        </table>
      </details>
    `;
  }

  _patch(patch) {
    this.dispatchEvent(new CustomEvent("filters-changed", { detail: patch }));
  }

  /** Day-by-day slider through the selected window (client-side filter). */
  _renderDaySlider(s) {
    if (!s.start || !s.end) return nothing;
    const startDay = new Date(s.start);
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(s.end);
    const dayCount = Math.min(
      Math.ceil((endDay - startDay) / 86400000),
      60
    );
    if (dayCount < 2) return nothing;

    const dayToValue = (dayIso) => {
      if (!dayIso) return 0;
      const date = new Date(`${dayIso}T00:00:00`);
      return Math.round((date - startDay) / 86400000) + 1;
    };
    const valueToDay = (value) => {
      if (!value) return "";
      const date = new Date(startDay.getTime() + (value - 1) * 86400000);
      const pad = (n) => String(n).padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };
    const current = dayToValue(s.dayFilter);
    const label = s.dayFilter
      ? new Date(`${s.dayFilter}T00:00:00`).toLocaleDateString(undefined, {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        })
      : t("window.allDays");
    return html`
      <div class="row">
        <input
          type="range"
          min="0"
          max=${String(dayCount)}
          step="1"
          .value=${String(current)}
          @input=${(ev) => this._patch({ dayFilter: valueToDay(Number(ev.target.value)) })}
        />
        <span>${label}</span>
      </div>
    `;
  }

  _saveProfile() {
    const name = (this._profileName || "").trim();
    if (!name) return;
    const selected = (this.profiles || []).find((p) => p.id === this.selectedProfileId);
    this.dispatchEvent(
      new CustomEvent("profile-save", {
        detail: {
          name,
          // Same name as the selected profile -> update it in place.
          id: selected && selected.name === name ? selected.id : undefined,
        },
      })
    );
  }

  _toggleCategory(cat) {
    const categories = this.state.categories.includes(cat)
      ? this.state.categories.filter((c) => c !== cat)
      : [...this.state.categories, cat];
    this._patch({ categories });
  }

  _toggleWeekday(index) {
    const weekdays = this.state.weekdays.includes(index)
      ? this.state.weekdays.filter((d) => d !== index)
      : [...this.state.weekdays, index];
    this._patch({ weekdays });
  }
}

customElements.define("chronotope-filter-bar", ChronotopeFilterBar);
