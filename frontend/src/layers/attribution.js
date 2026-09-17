/**
 * Keeps the Leaflet attribution control in sync with the base map and
 * every active layer (invariant I5). Long lists collapse to the first two
 * entries plus a "+N" toggle, but the credits are always reachable.
 */
export class AttributionManager {
  constructor(map, t) {
    this._map = map;
    this._t = t;
    this._entries = [];
    this._expanded = false;
    this._container = null;
  }

  setEntries(entries) {
    const seen = new Set();
    this._entries = entries.filter((entry) => {
      if (!entry || !entry.text) return false;
      const key = `${entry.text}|${entry.url || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    this._render();
  }

  _render() {
    const control = this._map.attributionControl;
    if (!control) return;
    // Clear the control's own text; we render our own node inside it.
    for (const key of Object.keys(control._attributions || {})) {
      control.removeAttribution(key);
    }
    control.setPrefix(false);
    const container = control.getContainer();
    if (!container) return;
    container.replaceChildren();
    const wrap = document.createElement("span");
    wrap.className = "chronotope-attribution";
    const visible = this._expanded || this._entries.length <= 4 ? this._entries : this._entries.slice(0, 2);
    visible.forEach((entry, index) => {
      if (index > 0) wrap.append(document.createTextNode(" | "));
      if (entry.url) {
        const link = document.createElement("a");
        link.href = entry.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = entry.text;
        wrap.append(link);
      } else {
        wrap.append(document.createTextNode(entry.text));
      }
    });
    if (this._entries.length > 4) {
      wrap.append(document.createTextNode(" "));
      const toggle = document.createElement("a");
      toggle.href = "#";
      toggle.textContent = this._expanded
        ? this._t("layers.attribution.less")
        : `+${this._entries.length - 2} ${this._t("layers.attribution.more")}`;
      toggle.addEventListener("click", (ev) => {
        ev.preventDefault();
        this._expanded = !this._expanded;
        this._render();
      });
      wrap.append(toggle);
    }
    container.append(wrap);
  }
}
