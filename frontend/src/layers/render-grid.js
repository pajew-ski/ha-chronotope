import { CanvasLayerBase } from "./canvas-base.js";

/**
 * Colors a lon/lat value grid (5.3 "grid") cell by cell in projected space
 * so the equirectangular data lands correctly on the Web Mercator map.
 * Values below the threshold stay transparent; green -> yellow -> red.
 */
export const GridCanvasLayer = CanvasLayerBase.extend({
  options: { pane: "chronotope-grid", opacity: 0.6, threshold: 5, vmax: 100 },

  setGrid(grid) {
    this._grid = grid;
    this.redraw();
    return this;
  },

  draw(ctx, size) {
    const grid = this._grid;
    if (!grid || !grid.values) return;
    const map = this._map;
    const bounds = map.getBounds();
    const { lon0, lat0, dlon, dlat, nx, ny, values } = grid;
    const threshold = this.options.threshold;
    const vmax = this.options.vmax || 100;
    const west = Math.max(-180, Math.floor(bounds.getWest()));
    const east = Math.min(180, Math.ceil(bounds.getEast()));
    const south = Math.max(-85, Math.floor(bounds.getSouth()));
    const north = Math.min(85, Math.ceil(bounds.getNorth()));
    for (let row = 0; row < ny; row += 1) {
      const lat = lat0 + row * dlat;
      if (lat + dlat < south || lat > north) continue;
      const y0 = map.latLngToContainerPoint([Math.min(85, lat + dlat), 0]).y;
      const y1 = map.latLngToContainerPoint([Math.max(-85, lat), 0]).y;
      for (let col = 0; col < nx; col += 1) {
        const value = values[row * nx + col];
        if (value == null || value < threshold) continue;
        let lon = lon0 + col * dlon;
        // Handle maps panned across the antimeridian by trying both copies.
        for (const shift of [0, 360, -360]) {
          const l = lon + shift;
          if (l + dlon < west || l > east) continue;
          const x0 = map.latLngToContainerPoint([0, l]).x;
          const x1 = map.latLngToContainerPoint([0, l + dlon]).x;
          if (x1 < 0 || x0 > size.x || y1 < 0 || y0 > size.y) continue;
          ctx.fillStyle = colorFor(value, vmax);
          ctx.fillRect(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0));
        }
      }
    }
  },
});

export function colorFor(value, vmax) {
  const t = Math.max(0, Math.min(1, value / vmax));
  // green (120) -> red (0), alpha grows with intensity
  const hue = 120 - 120 * t;
  const alpha = 0.25 + 0.6 * t;
  return `hsla(${hue.toFixed(0)}, 90%, 50%, ${alpha.toFixed(2)})`;
}
