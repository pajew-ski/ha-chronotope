"""Choropleth join of ISO codes against Natural Earth countries."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


def country(name, iso2, iso3, adm0=None):
    return {
        "type": "Feature",
        "properties": {"NAME": name, "ISO_A2": iso2, "ISO_A3": iso3, "ADM0_A3": adm0 or iso3, "ISO_A2_EH": iso2 if iso2 != "-99" else "FR", "ISO_A3_EH": iso3 if iso3 != "-99" else "FRA"},
        "geometry": {"type": "Polygon", "coordinates": [[[0, 0], [1, 0], [1, 1], [0, 0]]]},
    }


COUNTRIES = [country("Germany", "DE", "DEU"), country("France", "-99", "-99", "FRA"), country("Poland", "PL", "POL")]


class ChoroplethTestCase(unittest.TestCase):
    def test_iso3_join_and_unknown_codes(self):
        result = _parse.choropleth_join(COUNTRIES, {"DEU": 100.0, "FRA": 50.0, "XKX": 5.0}, "refugees")
        ids = sorted(f["id"] for f in result["features"])
        self.assertEqual(ids, ["refugees:DEU", "refugees:FRA"])
        self.assertEqual(result["unknown"], ["XKX"])
        self.assertEqual(result["matched"], 2)
        deu = next(f for f in result["features"] if f["id"] == "refugees:DEU")
        self.assertEqual(deu["properties"]["intensity"], 1.0)
        self.assertEqual(deu["properties"]["label"], "Germany")

    def test_iso2_join(self):
        result = _parse.choropleth_join(COUNTRIES, {"PL": 3.0, "ZZ": 1.0}, "outages")
        self.assertEqual([f["id"] for f in result["features"]], ["outages:PL"])
        self.assertEqual(result["unknown"], ["ZZ"])

    def test_join_via_profile_features(self):
        # Countries that already went through parse_geojson_features keep codes in detail.
        raw = json.dumps({"type": "FeatureCollection", "features": COUNTRIES})
        parsed = _parse.parse_geojson_features(raw, "country", "ne", label_keys=("NAME",), keep_properties=("ISO_A2", "ISO_A3", "ADM0_A3", "ISO_A2_EH", "ISO_A3_EH"))
        result = _parse.choropleth_join(parsed["features"], {"DEU": 1.0}, "x")
        self.assertEqual(len(result["features"]), 1)

    def test_parsers_for_values(self):
        unhcr = _parse.parse_unhcr(json.dumps({"page": 1, "maxPages": 1, "items": [
            {"year": 2024, "coo_iso": "SYR", "coa_iso": "DEU", "refugees": 100, "asylum_seekers": 10},
            {"year": 2024, "coo_iso": "AFG", "coa_iso": "DEU", "refugees": 5, "asylum_seekers": 0},
        ]}))
        self.assertEqual(unhcr["values"], {"DEU": 115.0})
        origin = _parse.parse_unhcr(json.dumps({"items": [{"coo_iso": "SYR", "coa_iso": "DEU", "refugees": 1}]}), mode="origin")
        self.assertEqual(origin["values"], {"SYR": 1.0})
        ioda = _parse.parse_ioda(json.dumps({"data": [{"entity": {"code": "de", "type": "country"}, "scores": {"overall": 12.5}}, {"entity": {"code": "DE", "type": "country"}, "scores": {"overall": 3}}]}))
        self.assertEqual(ioda["values"], {"DE": 12.5})
