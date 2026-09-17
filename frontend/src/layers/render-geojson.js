import L from "leaflet";
import { buildFeaturePopup } from "./popup.js";
import { colorFor } from "./render-grid.js";

/**
 * Lines and polygons of a features layer on a shared canvas renderer.
 * Choropleth features (properties.intensity) get a graded fill.
 */
export function createGeoJsonLayer(features, options) {
  const { style = {}, renderer, pane, meta, t, onSelect, opacity = 1 } = options;
  const color = style.color || style.fill || "#66bb6a";
  const isChoropleth = style.kind === "choropleth";
  const layer = L.geoJSON(
    { type: "FeatureCollection", features },
    {
      renderer,
      pane,
      style: (feature) => {
        const props = feature.properties || {};
        if (isChoropleth) {
          const intensity = Number(props.intensity ?? 0);
          return {
            color: "rgba(255,255,255,0.35)",
            weight: 0.6,
            fillColor: colorFor(intensity * 100, 100),
            fillOpacity: Math.min(0.85, 0.2 + 0.7 * intensity) * opacity,
          };
        }
        return {
          color: props.color || color,
          weight: feature.geometry?.type?.includes("Line") ? 2 : 1.2,
          fillColor: props.color || style.fill || color,
          fillOpacity: 0.18 * opacity,
          opacity: 0.9 * opacity,
        };
      },
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          renderer,
          pane,
          radius: 5,
          color: feature.properties?.color || color,
          fillColor: feature.properties?.color || color,
          fillOpacity: 0.7 * opacity,
          weight: 1,
        }),
      onEachFeature: (feature, sub) => {
        sub.bindPopup(() => buildFeaturePopup(feature, meta, t), { maxWidth: 320 });
        if (onSelect) sub.on("click", () => onSelect(feature));
      },
    }
  );
  return layer;
}
