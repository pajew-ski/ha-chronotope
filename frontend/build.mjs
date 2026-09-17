import * as esbuild from "esbuild";

// Leaflet CSS is injected into the shadow root; image assets (marker
// icons referenced from the CSS) become data URIs so nothing is fetched
// from a CDN or extra static route.
const common = {
  bundle: true,
  format: "esm",
  target: "es2020",
  minify: true,
  legalComments: "none",
  loader: {
    ".css": "text",
    ".png": "dataurl",
    ".svg": "dataurl",
  },
  logLevel: "info",
};

// Sidebar panel.
await esbuild.build({
  ...common,
  entryPoints: ["src/panel.js"],
  outfile: "../custom_components/chronotope/frontend/chronotope-panel.js",
});

// Lovelace card (custom:chronotope-map-card), registered via
// frontend.add_extra_js_url; shares the map view and layer modules.
await esbuild.build({
  ...common,
  entryPoints: ["src/card.js"],
  outfile: "../custom_components/chronotope/frontend/chronotope-card.js",
});
