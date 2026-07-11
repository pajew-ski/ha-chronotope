import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/panel.js"],
  outfile: "../custom_components/chronotope/frontend/chronotope-panel.js",
  bundle: true,
  format: "esm",
  target: "es2020",
  minify: true,
  legalComments: "none",
  // Leaflet CSS is injected into the shadow root; image assets (marker
  // icons referenced from the CSS) become data URIs so nothing is fetched
  // from a CDN or extra static route.
  loader: {
    ".css": "text",
    ".png": "dataurl",
    ".svg": "dataurl",
  },
  logLevel: "info",
});
