import L from "leaflet";

/**
 * XYZ / WMTS-REST / WMS layers loaded directly by the browser (I10).
 * Time placeholders ({Time} in the URL, "time" in WMS params) resolve per
 * definition: today, yesterday, or the latest yearly product.
 */
export function resolveTime(mode, offsetDays = 0) {
  const date = new Date(Date.now() - offsetDays * 86400000);
  const iso = date.toISOString().slice(0, 10);
  switch (mode) {
    case "yesterday":
      return new Date(Date.now() - (offsetDays + 1) * 86400000).toISOString().slice(0, 10);
    case "yearly-latest":
      return `${date.getUTCFullYear() - 1}-01-01`;
    case "today":
    default:
      return iso;
  }
}

export function createRasterLayer(def, options = {}) {
  const { opacity = def.opacity ?? 1, pane = "chronotope-raster", attribution = "", onTileError } = options;
  const timeMode = def.time || def.params?.time || null;
  const type = def.type || def.provider;
  if (type === "wms") {
    const params = { ...(def.params || {}) };
    delete params.time;
    const wmsParams = {
      layers: params.layers,
      styles: params.styles || "",
      format: params.format || "image/png",
      transparent: params.transparent !== false,
      version: params.version || "1.3.0",
    };
    if (timeMode) wmsParams.time = resolveTime(timeMode);
    const layer = L.tileLayer.wms(def.url, {
      ...wmsParams,
      opacity,
      pane,
      attribution,
      maxZoom: def.max_zoom ?? 18,
      minZoom: def.min_zoom ?? 0,
      crossOrigin: false,
    });
    if (onTileError) layer.on("tileerror", onTileError);
    return layer;
  }
  let url = def.url;
  let fallbackTime = null;
  if (url.includes("{Time}")) {
    url = url.replace("{Time}", resolveTime(timeMode || "today"));
    fallbackTime = resolveTime(timeMode || "today", 1);
  }
  const layer = L.tileLayer(url, {
    opacity,
    pane,
    attribution,
    maxZoom: def.max_zoom ?? 19,
    minZoom: def.min_zoom ?? 0,
    maxNativeZoom: def.max_native_zoom ?? def.max_zoom ?? 19,
    crossOrigin: false,
  });
  // GIBS: today's product may not exist yet; fall back to yesterday once.
  let switched = false;
  layer.on("tileerror", (ev) => {
    if (fallbackTime && !switched && timeMode !== "yearly-latest") {
      switched = true;
      layer.setUrl(def.url.replace("{Time}", fallbackTime));
    }
    if (onTileError) onTileError(ev);
  });
  return layer;
}
