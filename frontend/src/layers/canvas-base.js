import L from "leaflet";

/**
 * Minimal canvas layer: one <canvas> in a map pane, resized and
 * repositioned on move/zoom; subclasses implement draw(ctx, size).
 * Rendering many points to a canvas instead of DOM markers keeps
 * thousands of moving objects fluid (spec 7.2).
 */
export const CanvasLayerBase = L.Layer.extend({
  options: { pane: "overlayPane", opacity: 1 },

  initialize(options) {
    L.setOptions(this, options);
  },

  onAdd(map) {
    this._map = map;
    this._canvas = L.DomUtil.create("canvas", "leaflet-layer chronotope-canvas");
    this._canvas.style.pointerEvents = "none";
    this._canvas.style.opacity = String(this.options.opacity);
    this.getPane().appendChild(this._canvas);
    map.on("moveend zoomend resize", this._reset, this);
    map.on("zoomstart", this._hide, this);
    this._reset();
  },

  onRemove(map) {
    map.off("moveend zoomend resize", this._reset, this);
    map.off("zoomstart", this._hide, this);
    L.DomUtil.remove(this._canvas);
    this._canvas = null;
  },

  setOpacity(opacity) {
    this.options.opacity = opacity;
    if (this._canvas) this._canvas.style.opacity = String(opacity);
    return this;
  },

  redraw() {
    if (this._map && this._canvas) this._draw();
    return this;
  },

  _hide() {
    if (this._canvas) this._canvas.style.visibility = "hidden";
  },

  _reset() {
    if (!this._map || !this._canvas) return;
    const size = this._map.getSize();
    const ratio = window.devicePixelRatio || 1;
    this._canvas.width = Math.round(size.x * ratio);
    this._canvas.height = Math.round(size.y * ratio);
    this._canvas.style.width = `${size.x}px`;
    this._canvas.style.height = `${size.y}px`;
    L.DomUtil.setPosition(this._canvas, this._map.containerPointToLayerPoint([0, 0]));
    this._canvas.style.visibility = "";
    this._draw();
  },

  _draw() {
    const ctx = this._canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this.draw(ctx, this._map.getSize());
  },

  // eslint-disable-next-line no-unused-vars
  draw(ctx, size) {},
});
