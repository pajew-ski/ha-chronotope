import { LitElement, html, css, nothing } from "lit";
import { t } from "./i18n.js";
import {
  ICON_EYE,
  ICON_EYE_OFF,
  ICON_PENCIL,
  ICON_REPEAT,
  ICON_STAR,
  ICON_STAR_OUTLINE,
} from "./icons.js";

/**
 * Distance-sorted result list (sorting happens server-side). Emits
 * "event-selected" {id} when an item is clicked.
 */
class ChronotopeEventList extends LitElement {
  static properties = {
    events: { attribute: false },
    selectedId: { attribute: false },
    locale: { attribute: false },
  };

  static styles = css`
    :host {
      display: block;
      overflow-y: auto;
      background: var(--primary-background-color, #fafafa);
    }
    .empty {
      padding: 24px 16px;
      color: var(--secondary-text-color, #727272);
      text-align: center;
    }
    .item {
      display: block;
      width: 100%;
      text-align: left;
      border: none;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      padding: 10px 16px;
      cursor: pointer;
      font: inherit;
    }
    .item[aria-current="true"] {
      border-inline-start: 3px solid var(--primary-color, #03a9f4);
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 8%, var(--card-background-color, #fff));
    }
    .item.is-hidden {
      opacity: 0.55;
    }
    .title-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: baseline;
    }
    .title {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .distance {
      color: var(--primary-color, #03a9f4);
      font-size: 0.85em;
      white-space: nowrap;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      margin-top: 4px;
      font-size: 0.85em;
      color: var(--secondary-text-color, #727272);
    }
    .badge {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      padding: 0 8px;
      font-size: 0.9em;
    }
    .confidence-verified {
      color: var(--success-color, #4caf50);
      border-color: currentColor;
    }
    .confidence-scraped {
      color: var(--warning-color, #ff9800);
      border-color: currentColor;
    }
    .confidence-inferred {
      color: var(--error-color, #f44336);
      border-color: currentColor;
    }
    .source a {
      color: var(--primary-color, #03a9f4);
      text-decoration: none;
    }
    .address {
      margin-top: 2px;
      font-size: 0.85em;
      color: var(--secondary-text-color, #727272);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .fuzzy {
      font-style: italic;
    }
    .icon-btn {
      border: none;
      background: none;
      cursor: pointer;
      padding: 0 2px;
      font: inherit;
      color: var(--secondary-text-color, #727272);
      line-height: 1;
    }
    .icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
      vertical-align: -3px;
    }
    @media (max-width: 870px) {
      .item {
        padding: 12px 16px;
      }
      .icon-btn {
        padding: 6px;
      }
      .icon {
        width: 20px;
        height: 20px;
      }
    }
    .icon-btn.starred {
      color: var(--warning-color, #ff9800);
    }
    .visited {
      color: var(--success-color, #4caf50);
    }
  `;

  render() {
    const events = this.events || [];
    if (events.length === 0) {
      return html`<div class="empty">${t("list.empty")}</div>`;
    }
    return html`${events.map((event) => this._renderItem(event))}`;
  }

  _renderItem(event) {
    const start = event.occurrences?.[0]?.[0] ?? event.start_time;
    const end = event.occurrences?.[0]?.[1] ?? event.end_time;
    return html`
      <button
        class="item ${event.hidden ? "is-hidden" : ""}"
        aria-current=${event.id === this.selectedId ? "true" : "false"}
        @click=${() =>
          this.dispatchEvent(new CustomEvent("event-selected", { detail: { id: event.id } }))}
      >
        <div class="title-row">
          <span class="title">${event.title}</span>
          <span>
            ${event.distance_km != null
              ? html`<span class="distance">${this._formatDistance(event.distance_km)}</span>`
              : nothing}
            <button
              class="icon-btn ${event.favorite ? "starred" : ""}"
              title=${event.favorite ? t("list.favorite.remove") : t("list.favorite.add")}
              @click=${(ev) => this._flag(ev, event, { favorite: !event.favorite })}
            >
              ${event.favorite ? ICON_STAR : ICON_STAR_OUTLINE}
            </button>
            <button
              class="icon-btn"
              title=${t("list.edit")}
              @click=${(ev) => {
                ev.stopPropagation();
                this.dispatchEvent(
                  new CustomEvent("event-edit", { detail: { id: event.id } })
                );
              }}
            >
              ${ICON_PENCIL}
            </button>
            <button
              class="icon-btn"
              title=${event.hidden ? t("list.unhide") : t("list.hide")}
              @click=${(ev) => this._flag(ev, event, { hidden: !event.hidden })}
            >
              ${event.hidden ? ICON_EYE : ICON_EYE_OFF}
            </button>
          </span>
        </div>
        <div class="meta">
          ${this._renderWhen(event, start, end)}
          ${event.recurrence
            ? html`<span title=${event.recurrence}>${ICON_REPEAT}</span>`
            : nothing}
          ${event.hidden ? html`<span class="badge">${t("list.hidden")}</span>` : nothing}
          ${event.category ? html`<span class="badge">${event.category}</span>` : nothing}
          ${event.confidence
            ? html`<span class="badge confidence-${event.confidence}">${event.confidence}</span>`
            : nothing}
          ${event.source_url
            ? html`<span class="source">
                <a href=${event.source_url} target="_blank" rel="noopener noreferrer"
                  @click=${(ev) => ev.stopPropagation()}
                  >${event.source_name || t("list.source")}</a
                >
              </span>`
            : nothing}
          ${event.visits?.length
            ? html`<span
                class="visited"
                title=${event.visits
                  .map((v) => `${v.person_id} (${new Date(v.last_seen).toLocaleDateString()})`)
                  .join(", ")}
                >${t("list.visited")}</span
              >`
            : nothing}
        </div>
        ${event.address ? html`<div class="address">${event.address}</div>` : nothing}
      </button>
    `;
  }

  _flag(ev, event, flags) {
    ev.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("event-flag", { detail: { id: event.id, ...flags } })
    );
  }

  _renderWhen(event, start, end) {
    if (event.time_precision === "approximate") {
      const text = event.schedule_text || this._formatRange(start, end);
      return html`<span class="fuzzy" title=${t("list.fuzzy")}>~ ${text}</span>`;
    }
    return html`<span>${this._formatRange(start, end)}</span>`;
  }

  _formatDistance(km) {
    const formatted = km < 10 ? km.toFixed(1) : Math.round(km).toString();
    return `${formatted.replace(".", ",")} km`;
  }

  _formatRange(startIso, endIso) {
    const locale = this.locale || undefined;
    const start = new Date(startIso);
    const end = new Date(endIso);
    const dateFmt = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const timeFmt = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" });
    const sameDay = start.toDateString() === end.toDateString();
    return sameDay
      ? `${dateFmt.format(start)} – ${timeFmt.format(end)}`
      : `${dateFmt.format(start)} – ${dateFmt.format(end)}`;
  }
}

customElements.define("chronotope-event-list", ChronotopeEventList);
