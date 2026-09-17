/**
 * Popups for layer features are built as DOM nodes (invariant I6): every
 * upstream string goes through textContent, never into markup.
 */
export function buildFeaturePopup(feature, meta, t, extra = {}) {
  const props = feature.properties || {};
  const root = document.createElement("div");
  root.className = "layer-popup";

  const title = document.createElement("div");
  title.className = "popup-title";
  title.textContent = String(props.label ?? feature.id ?? "");
  root.append(title);

  const kind = document.createElement("div");
  kind.className = "popup-meta";
  kind.textContent = [props.kind, props.ts ? new Date(props.ts).toLocaleString() : null]
    .filter(Boolean)
    .join(" · ");
  root.append(kind);

  const summary = [];
  if (props.alt_m != null) summary.push(`${Math.round(props.alt_m)} m`);
  if (props.speed_ms != null) summary.push(`${Math.round(props.speed_ms * 3.6)} km/h`);
  if (props.track != null) summary.push(`${Math.round(props.track)}°`);
  if (props.value != null) summary.push(String(props.value));
  if (summary.length) {
    const line = document.createElement("div");
    line.className = "popup-meta";
    line.textContent = summary.join(" · ");
    root.append(line);
  }

  const detail = props.detail && typeof props.detail === "object" ? props.detail : {};
  const entries = Object.entries(detail).filter(([, v]) => v != null && v !== "");
  if (entries.length) {
    const table = document.createElement("table");
    table.className = "popup-detail";
    for (const [key, value] of entries) {
      const row = document.createElement("tr");
      const k = document.createElement("td");
      k.textContent = key;
      const v = document.createElement("td");
      const text = typeof value === "object" ? JSON.stringify(value) : String(value);
      if (/^https?:\/\//i.test(text) && text.length < 300) {
        const link = document.createElement("a");
        link.href = text;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = text.replace(/^https?:\/\//, "").slice(0, 60);
        v.append(link);
      } else {
        v.textContent = text.length > 200 ? `${text.slice(0, 200)}…` : text;
      }
      row.append(k, v);
      table.append(row);
    }
    root.append(table);
  }

  if (extra.lines) {
    for (const text of extra.lines) {
      const line = document.createElement("div");
      line.className = "popup-meta";
      line.textContent = text;
      root.append(line);
    }
  }

  if (meta?.attribution?.text) {
    const source = document.createElement("div");
    source.className = "popup-meta";
    source.textContent = `${t("layers.source")}: `;
    if (meta.attribution.url) {
      const link = document.createElement("a");
      link.href = meta.attribution.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = meta.attribution.text;
      source.append(link);
    } else {
      source.append(document.createTextNode(meta.attribution.text));
    }
    root.append(source);
  }
  return root;
}

/** Tooltip content from untrusted strings, as a text node container. */
export function textNode(text) {
  const span = document.createElement("span");
  span.textContent = String(text ?? "");
  return span;
}
