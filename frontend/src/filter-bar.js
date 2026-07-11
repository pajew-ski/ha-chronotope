import { LitElement, html, css, nothing } from "lit";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

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
  };

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
  `;

  render() {
    const s = this.state;
    return html`
      <div class="groups">
        <div class="group">
          <span class="label">Kategorie</span>
          <div class="chips">
            ${(this.categories || []).length === 0
              ? html`<span class="hint">Noch keine Kategorien</span>`
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
          <span class="label">Radius</span>
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
          <span class="hint">Klick auf die Karte setzt das Zentrum</span>
        </div>

        <div class="group">
          <span class="label">Zeitfenster</span>
          <div class="row">
            <input
              type="datetime-local"
              .value=${s.start}
              @change=${(ev) => this._patch({ start: ev.target.value })}
            />
            <span>–</span>
            <input
              type="datetime-local"
              .value=${s.end}
              @change=${(ev) => this._patch({ end: ev.target.value })}
            />
          </div>
        </div>

        <div class="group">
          <span class="label">Wochentage</span>
          <div class="chips">
            ${WEEKDAYS.map(
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
              <option value="allday">Ganztags</option>
              <option value="range">Nach Uhrzeit</option>
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
          <span class="label">Karte</span>
          <label class="row">
            <input
              type="checkbox"
              .checked=${s.showZones}
              @change=${(ev) => this._patch({ showZones: ev.target.checked })}
            />
            HA-Zonen anzeigen
          </label>
        </div>

        <div class="group">
          <span class="label">Export</span>
          <button
            class="ics-button"
            @click=${() => this.dispatchEvent(new CustomEvent("ics-requested"))}
          >
            ${this.icsCopied ? "URL kopiert ✓" : "ICS-Abo-URL kopieren"}
          </button>
        </div>
      </div>
    `;
  }

  _patch(patch) {
    this.dispatchEvent(new CustomEvent("filters-changed", { detail: patch }));
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
