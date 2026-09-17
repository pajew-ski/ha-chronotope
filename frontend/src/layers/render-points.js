import L from "leaflet";
import { CanvasLayerBase } from "./canvas-base.js";

const HIT_RADIUS_PX = 12;

/**
 * Draws point features (5.3 profile) as canvas symbols with optional
 * rotation (style.rotate_by, e.g. "track"). Emits "featureclick" with
 * {feature, latlng} for the nearest point within 12 px of a map click.
 * Symbol shapes: aircraft, vessel, satellite, diamond, circle.
 */
export const CanvasPointLayer = CanvasLayerBase.extend({
  options: {
    pane: "overlayPane",
    opacity: 1,
    color: "#42a5f5",
    icon: "circle",
    rotateBy: null,
    size: 7,
    selectedId: null,
    labels: false,
    minLabelZoom: 9,
  },

  initialize(options) {
    CanvasLayerBase.prototype.initialize.call(this, options);
    this._features = [];
    this._positions = [];
  },

  onAdd(map) {
    CanvasLayerBase.prototype.onAdd.call(this, map);
    map.on("click", this._onClick, this);
  },

  onRemove(map) {
    map.off("click", this._onClick, this);
    CanvasLayerBase.prototype.onRemove.call(this, map);
  },

  setFeatures(features) {
    this._features = features || [];
    this.redraw();
    return this;
  },

  setSelected(id) {
    this.options.selectedId = id;
    this.redraw();
    return this;
  },

  draw(ctx, size) {
    const map = this._map;
    const zoom = map.getZoom();
    const bounds = map.getBounds().pad(0.05);
    this._positions = [];
    const showLabels = this.options.labels && zoom >= this.options.minLabelZoom;
    for (const feature of this._features) {
      const coords = feature.geometry?.coordinates;
      if (!coords || coords.length < 2) continue;
      const latlng = L.latLng(coords[1], coords[0]);
      if (!bounds.contains(latlng)) continue;
      const point = map.latLngToContainerPoint(latlng);
      if (point.x < -20 || point.y < -20 || point.x > size.x + 20 || point.y > size.y + 20) continue;
      this._positions.push({ x: point.x, y: point.y, feature });
      const selected = feature.id === this.options.selectedId;
      const color = feature.properties?.color || this.options.color;
      const rotation = this.options.rotateBy ? feature.properties?.[this.options.rotateBy] : null;
      drawSymbol(ctx, point.x, point.y, this.options.icon, color, this.options.size * (selected ? 1.5 : 1), rotation, selected);
      if (showLabels && feature.properties?.label) {
        ctx.font = "11px sans-serif";
        ctx.fillStyle = color;
        ctx.strokeStyle = "rgba(0,0,0,0.6)";
        ctx.lineWidth = 3;
        ctx.strokeText(feature.properties.label, point.x + 9, point.y + 4);
        ctx.fillText(feature.properties.label, point.x + 9, point.y + 4);
      }
    }
  },

  _onClick(ev) {
    if (!this._positions.length) return;
    const point = ev.containerPoint;
    let best = null;
    for (const entry of this._positions) {
      const d = Math.hypot(entry.x - point.x, entry.y - point.y);
      if (d <= HIT_RADIUS_PX && (!best || d < best.d)) best = { d, entry };
    }
    if (best) {
      L.DomEvent.stop(ev.originalEvent);
      this.fire("featureclick", { feature: best.entry.feature, latlng: ev.latlng });
    }
  },
});

export function drawSymbol(ctx, x, y, icon, color, size, rotationDeg, selected) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.strokeStyle = selected ? "#fff" : "rgba(0,0,0,0.55)";
  ctx.lineWidth = selected ? 2 : 1;
  if (rotationDeg != null && Number.isFinite(rotationDeg)) {
    ctx.rotate((rotationDeg * Math.PI) / 180);
  }
  ctx.beginPath();
  switch (icon) {
    case "aircraft": {
      const s = size;
      // Stylized plane pointing up (north); rotation applies the track.
      ctx.moveTo(0, -s * 1.4);
      ctx.lineTo(s * 0.35, -s * 0.3);
      ctx.lineTo(s * 1.5, s * 0.3);
      ctx.lineTo(s * 1.5, s * 0.6);
      ctx.lineTo(s * 0.3, s * 0.35);
      ctx.lineTo(s * 0.3, s * 1.0);
      ctx.lineTo(s * 0.7, s * 1.3);
      ctx.lineTo(s * 0.7, s * 1.5);
      ctx.lineTo(0, s * 1.3);
      ctx.lineTo(-s * 0.7, s * 1.5);
      ctx.lineTo(-s * 0.7, s * 1.3);
      ctx.lineTo(-s * 0.3, s * 1.0);
      ctx.lineTo(-s * 0.3, s * 0.35);
      ctx.lineTo(-s * 1.5, s * 0.6);
      ctx.lineTo(-s * 1.5, s * 0.3);
      ctx.lineTo(-s * 0.35, -s * 0.3);
      ctx.closePath();
      break;
    }
    case "vessel": {
      const s = size;
      ctx.moveTo(0, -s * 1.3);
      ctx.lineTo(s * 0.8, s * 0.6);
      ctx.lineTo(s * 0.8, s * 1.2);
      ctx.lineTo(-s * 0.8, s * 1.2);
      ctx.lineTo(-s * 0.8, s * 0.6);
      ctx.closePath();
      break;
    }
    case "satellite": {
      const s = size * 0.7;
      ctx.rect(-s, -s, 2 * s, 2 * s);
      ctx.moveTo(-s * 2.2, 0);
      ctx.lineTo(-s, 0);
      ctx.moveTo(s, 0);
      ctx.lineTo(s * 2.2, 0);
      break;
    }
    case "diamond": {
      const s = size;
      ctx.moveTo(0, -s);
      ctx.lineTo(s, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s, 0);
      ctx.closePath();
      break;
    }
    default:
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
