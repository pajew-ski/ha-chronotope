"""Catalog invariants and values fixed by measurement (2026-09-17)."""

import json
import unittest

from helpers import load_module

_catalog = load_module("feeds/catalog")


class CatalogTestCase(unittest.TestCase):
    def test_serializable_without_key_values(self):
        payload = json.dumps(_catalog.catalog_payload({"firms": True, "gfw": False}))
        self.assertNotIn("api_key", payload)
        self.assertIn('"key_set": true', payload)

    def test_night_lights_uses_fixed_black_marble_date(self):
        raster = _catalog.CATALOG["night_lights"].raster
        self.assertIn("/2016-01-01/", raster["url"])
        self.assertNotIn("{Time}", raster["url"])
        self.assertNotIn("time", raster)

    def test_thermal_anomalies_uses_noaa21(self):
        raster = _catalog.CATALOG["thermal_anomalies"].raster
        self.assertEqual(raster["params"]["layers"], "VIIRS_NOAA21_Thermal_Anomalies_375m_All")

    def test_dwd_layers(self):
        self.assertEqual(_catalog.CATALOG["dwd_radar"].raster["params"]["layers"], "dwd:Niederschlagsradar")
        wind = next(p for p in _catalog.PRESETS if p["preset_id"] == "dwd_wind")
        self.assertEqual(wind["params"]["layers"], "dwd:icon_reg025_fd_sl_uv10m_wmc_windbarbs")

    def test_tor_relays_is_choropleth(self):
        spec = _catalog.CATALOG["tor_relays"]
        self.assertEqual(spec.style["kind"], "choropleth")
        self.assertFalse(spec.bbox_filtered)

    def test_regions_dataset(self):
        self.assertEqual(_catalog.CATALOG["regions"].params_schema["dataset"]["default"], "ne_50m_geography_regions_polys")

    def test_esri_attribution(self):
        self.assertIn("Vantor", _catalog.BASEMAPS["esri_imagery"]["attribution"]["text"])

    def test_every_layer_has_attribution_and_license(self):
        for spec in _catalog.CATALOG.values():
            self.assertTrue(spec.attribution[0], spec.id)
            self.assertTrue(spec.license.id, spec.id)
            self.assertGreaterEqual(spec.default_interval_s, spec.min_interval_s, spec.id)
