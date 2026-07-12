# Brand assets for home-assistant/brands

Home Assistant and HACS load integration icons from the central
[home-assistant/brands](https://github.com/home-assistant/brands)
repository - they cannot be shipped inside the integration itself.
Until the brand is merged there, HA and HACS show a placeholder.

The files in `custom_integrations/chronotope/` are ready to submit:

- `icon.png` - 256x256, transparent, MDI `map-clock` in HA blue (#03a9f4),
  the same icon the sidebar panel uses
- `icon@2x.png` - 512x512 hiDPI variant

## How to submit

1. Fork `https://github.com/home-assistant/brands`.
2. Copy the `custom_integrations/chronotope/` folder from here into the
   fork (same path: `custom_integrations/chronotope/`).
3. Open a pull request titled "Add chronotope (custom integration)".
   The PR template asks to confirm the domain matches the integration's
   `manifest.json` (`chronotope`) and that you are the integration owner.
4. After the merge the icon appears automatically at
   `https://brands.home-assistant.io/_/chronotope/icon.png` - HA and HACS
   pick it up without any release on our side (browser caches may take a
   day).

Note: static PNGs cannot follow the HA theme's primary color - only the
sidebar icon (`mdi:map-clock`) is theme-aware, because HA colors it as a
vector icon at runtime.
