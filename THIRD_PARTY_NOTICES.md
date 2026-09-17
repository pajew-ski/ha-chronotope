# Third-party notices

Chronotope vendors the following libraries into its frontend bundles
(`custom_components/chronotope/frontend/chronotope-panel.js` and
`chronotope-card.js`). No data sets and no upstream responses are stored
in this repository; layer data is fetched at runtime and cached locally.

| Library | Version | License | Use |
|---|---|---|---|
| [Lit](https://lit.dev) | 3.x | BSD-3-Clause | UI components |
| [Leaflet](https://leafletjs.com) | 1.9.x | BSD-2-Clause | map |
| [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) | 1.5.x | MIT | event clustering |
| [satellite.js](https://github.com/shashwatak/satellite-js) | 6.0.x | MIT | SGP4 propagation of CelesTrak OMM records in the browser |

## satellite.js

Copyright (c) 2013 Shashwat Kandadai and UCSC. Licensed under the MIT
License; see the package's `LICENSE.md` in `frontend/node_modules/satellite.js`
after `npm ci`.

## Track interpolation

The aircraft interpolation and dead reckoning in
`frontend/src/layers/interpolate.js` is an original implementation of the
behaviour described in `docs/spec-geo-layers.md` (section 7.4). No code
from God's Eye View or other projects was copied.

## Map data and tiles

Base map tiles and data layers come from the providers listed in the README
section "Layers & data sources", each under its own license and
attribution requirements. The browser loads raster tiles directly from
those providers.
