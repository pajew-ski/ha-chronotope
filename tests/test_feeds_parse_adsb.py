"""adsb.lol parser: units, ground, missing callsign, budget cap."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


def payload(aircraft):
    return json.dumps({"ac": aircraft, "now": 1758110405000, "total": len(aircraft), "msg": "No error"})


class AdsbParserTestCase(unittest.TestCase):
    def test_units_and_fields(self):
        result = _parse.parse_adsb(
            payload([
                {"hex": "3c6444", "flight": "DLH4AB  ", "lat": 49.0, "lon": 12.1, "alt_baro": 36000,
                 "gs": 450.0, "track": 273.0, "t": "A20N", "squawk": "1000", "seen_pos": 5.0, "r": "D-AIZP"}
            ])
        )
        feature = result["features"][0]
        self.assertEqual(feature["id"], "adsb:3c6444")
        self.assertEqual(feature["properties"]["label"], "DLH4AB")
        self.assertEqual(feature["properties"]["kind"], "aircraft")
        self.assertAlmostEqual(feature["properties"]["alt_m"], 36000 * 0.3048, places=1)
        self.assertAlmostEqual(feature["properties"]["speed_ms"], 450 * 0.514444, places=1)
        self.assertEqual(feature["properties"]["track"], 273.0)
        self.assertEqual(feature["properties"]["ts"], "2025-09-17T12:00:00Z")
        self.assertEqual(feature["properties"]["detail"]["type"], "A20N")
        self.assertEqual(feature["properties"]["detail"]["registration"], "D-AIZP")
        self.assertEqual(feature["geometry"]["coordinates"][:2], [12.1, 49.0])
        self.assertEqual(result["source_time"], "2025-09-17T12:00:05Z")

    def test_ground_maps_to_zero_altitude(self):
        result = _parse.parse_adsb(payload([{"hex": "abc", "lat": 1, "lon": 2, "alt_baro": "ground"}]))
        props = result["features"][0]["properties"]
        self.assertEqual(props["alt_m"], 0.0)
        self.assertTrue(props["detail"]["on_ground"])

    def test_missing_callsign_falls_back_to_hex(self):
        result = _parse.parse_adsb(payload([{"hex": "abc123", "lat": 1, "lon": 2, "flight": "   "}]))
        self.assertEqual(result["features"][0]["properties"]["label"], "ABC123")

    def test_entries_without_position_dropped(self):
        result = _parse.parse_adsb(payload([{"hex": "abc"}, {"hex": "def", "lat": 91, "lon": 0}]))
        self.assertEqual(result["features"], [])

    def test_budget_cap(self):
        aircraft = [{"hex": f"{i:06x}", "lat": 1, "lon": 2} for i in range(10)]
        result = _parse.parse_adsb(payload(aircraft), max_features=3)
        self.assertEqual(len(result["features"]), 3)
        self.assertTrue(result["truncated"])

    def test_military_flag(self):
        result = _parse.parse_adsb(payload([{"hex": "abc", "lat": 1, "lon": 2, "dbFlags": 1}]))
        self.assertTrue(result["features"][0]["properties"]["detail"]["military"])

    def test_bad_payload(self):
        with self.assertRaises(_parse.ParseError):
            _parse.parse_adsb("not json")
        with self.assertRaises(_parse.ParseError):
            _parse.parse_adsb("{}")

    def test_profile_valid(self):
        result = _parse.parse_adsb(payload([{"hex": "abc", "lat": 1, "lon": 2, "alt_baro": 100}]))
        doc = {"type": "FeatureCollection", "features": result["features"], "meta": {"layer_id": "x", "fetched_at": "", "freshness": "fresh", "attribution": {"text": "a"}, "count": 1}}
        self.assertEqual(_parse.validate_feature_collection(doc), [])
