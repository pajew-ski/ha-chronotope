/**
 * Layer registry for the panel and the card: catalog, configurations,
 * per-layer polling of the authenticated data view (I9, I10), freshness.
 * Polling pauses while the document is hidden; bbox-filtered layers
 * re-fetch on viewport changes with a 500 ms debounce.
 */
const VIEWPORT_DEBOUNCE_MS = 500;
const MIN_POLL_MS = 5000;
const DATA_CLASSES = new Set(["tracks", "features", "grid"]);

export class LayerRegistry {
  constructor({ hass, onChange }) {
    this.hass = hass;
    this.onChange = onChange || (() => {});
    this.catalog = { layers: [], presets: [], basemaps: {}, generic_providers: [] };
    this.configs = [];
    this.docs = new Map(); // layer id -> last response document
    this.errors = new Map();
    this._timers = new Map();
    this._inflight = new Set();
    this._viewport = null;
    this._viewportTimer = null;
    this._running = false;
    this._onVisibility = () => {
      if (document.hidden) this._pauseAll();
      else this._resumeAll();
    };
  }

  setHass(hass) {
    this.hass = hass;
  }

  // ------------------------------------------------------------- loading

  async loadCatalog() {
    this.catalog = await this.hass.callWS({ type: "chronotope/layers/catalog" });
    this.onChange("catalog");
    return this.catalog;
  }

  async loadConfigs() {
    const result = await this.hass.callWS({ type: "chronotope/layers/list" });
    this.configs = result.layers || [];
    this.layersEnabled = Boolean(result.layers_enabled);
    this._syncPolling();
    this.onChange("configs");
    return this.configs;
  }

  async refreshStatus() {
    const result = await this.hass.callWS({ type: "chronotope/layers/status" });
    for (const config of this.configs) {
      if (result.status?.[config.id]) config.status = result.status[config.id];
    }
    this.onChange("status");
  }

  spec(id) {
    const config = this.configFor(id);
    const layerId = config?.layer_id || id;
    return this.catalog.layers.find((layer) => layer.id === layerId) || null;
  }

  configFor(id) {
    return this.configs.find((config) => config.id === id) || null;
  }

  /** Effective definition for rendering: catalog spec merged with config. */
  definition(id) {
    const config = this.configFor(id);
    const spec = this.spec(id);
    if (!config && !spec) return null;
    const klass = spec?.klass || (config?.provider === "geojson_url" ? "features" : "raster");
    return {
      id,
      klass,
      spec,
      config,
      title: spec ? spec.title_key : config?.title || id,
      provider: spec?.provider || config?.provider,
      style: spec?.style || {},
      raster: spec?.raster || (config && !config.layer_id ? config : null),
      attribution: spec?.attribution || config?.attribution || null,
      license: spec?.license || null,
      opacity: config?.opacity ?? spec?.raster?.opacity ?? 1,
      enabled: Boolean(config?.enabled),
      bboxFiltered: Boolean(spec?.bbox_filtered),
      interval: (config?.interval_s || spec?.default_interval_s || 60) * 1000,
    };
  }

  activeIds() {
    return this.configs.filter((config) => config.enabled).map((config) => config.id);
  }

  // -------------------------------------------------------------- saving

  async save(layer) {
    const result = await this.hass.callWS({ type: "chronotope/layers/save", layer });
    const index = this.configs.findIndex((config) => config.id === result.layer.id);
    if (index >= 0) this.configs[index] = result.layer;
    else this.configs.push(result.layer);
    this._syncPolling();
    this.onChange("configs");
    return result.layer;
  }

  async setEnabled(id, enabled) {
    const existing = this.configFor(id);
    const spec = this.spec(id);
    const layer = existing
      ? { ...existing, enabled }
      : spec
        ? { layer_id: spec.id, enabled, params: {}, interval_s: spec.default_interval_s }
        : null;
    if (!layer) throw new Error(`unknown layer ${id}`);
    delete layer.status;
    delete layer.missing_key;
    delete layer.updated_at;
    if (!enabled) this.docs.delete(id);
    return this.save(layer);
  }

  async remove(id) {
    await this.hass.callWS({ type: "chronotope/layers/delete", layer_id: id });
    this.configs = this.configs.filter((config) => config.id !== id);
    this.docs.delete(id);
    this._syncPolling();
    this.onChange("configs");
  }

  preview(layer) {
    return this.hass.callWS({ type: "chronotope/layers/preview", layer });
  }

  // ------------------------------------------------------------- polling

  start() {
    this._running = true;
    document.addEventListener("visibilitychange", this._onVisibility);
    this._syncPolling();
  }

  stop() {
    this._running = false;
    document.removeEventListener("visibilitychange", this._onVisibility);
    this._pauseAll();
  }

  setViewport(bbox, zoom) {
    this._viewport = { bbox, zoom };
    clearTimeout(this._viewportTimer);
    this._viewportTimer = setTimeout(() => {
      for (const id of this.activeIds()) {
        const def = this.definition(id);
        if (def?.bboxFiltered && DATA_CLASSES.has(def.klass)) this.fetchLayer(id);
      }
    }, VIEWPORT_DEBOUNCE_MS);
  }

  _syncPolling() {
    if (!this._running) return;
    const wanted = new Set();
    for (const id of this.activeIds()) {
      const def = this.definition(id);
      if (!def || !DATA_CLASSES.has(def.klass)) continue;
      wanted.add(id);
      if (!this._timers.has(id)) this._schedule(id, 0);
    }
    for (const id of [...this._timers.keys()]) {
      if (!wanted.has(id)) {
        clearTimeout(this._timers.get(id));
        this._timers.delete(id);
      }
    }
  }

  _schedule(id, delayMs) {
    clearTimeout(this._timers.get(id));
    this._timers.set(
      id,
      setTimeout(() => this.fetchLayer(id).finally(() => this._reschedule(id)), delayMs)
    );
  }

  _reschedule(id) {
    if (!this._running || document.hidden || !this.activeIds().includes(id)) {
      this._timers.delete(id);
      return;
    }
    const def = this.definition(id);
    this._schedule(id, Math.max(MIN_POLL_MS, def?.interval || 60000));
  }

  _pauseAll() {
    for (const timer of this._timers.values()) clearTimeout(timer);
    this._timers.clear();
  }

  _resumeAll() {
    this._syncPolling();
  }

  async fetchLayer(id) {
    if (this._inflight.has(id) || !this.hass) return null;
    this._inflight.add(id);
    try {
      const def = this.definition(id);
      const params = new URLSearchParams();
      if (def?.bboxFiltered && this._viewport?.bbox) {
        params.set("bbox", this._viewport.bbox);
        params.set("zoom", String(this._viewport.zoom));
      }
      const query = params.toString();
      const url = `/api/chronotope/layers/${encodeURIComponent(id)}/data${query ? `?${query}` : ""}`;
      const response = await this.hass.fetchWithAuth(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const doc = await response.json();
      doc.receivedAt = Date.now();
      this.docs.set(id, doc);
      this.errors.delete(id);
      const config = this.configFor(id);
      if (config && doc.meta) {
        config.status = { ...(config.status || {}), freshness: doc.meta.freshness, last_error: doc.meta.last_error, count: doc.meta.count };
      }
      this.onChange("data", id);
      return doc;
    } catch (err) {
      this.errors.set(id, err.message || String(err));
      this.onChange("error", id);
      return null;
    } finally {
      this._inflight.delete(id);
    }
  }

  freshness(id) {
    const doc = this.docs.get(id);
    if (this.errors.has(id)) return "error";
    return doc?.meta?.freshness || this.configFor(id)?.status?.freshness || "disabled";
  }
}
