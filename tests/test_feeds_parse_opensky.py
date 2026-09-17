"""OpenSky parser: state vector indices, null positions."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


class OpenSkyParserTestCase(unittest.TestCase):
    def test_state_vector_indices(self):
        state = ["3c6444", "DLH4AB  ", "Germany", 1758110400, 1758110405, 12.1, 49.0, 10972.8, False, 231.5, 273.0, -2.6, None, 11000.0, "1000", False, 0]
        result = _parse.parse_opensky(json.dumps({"time": 1758110405, "states": [state]}))
        props = result["features"][0]["properties"]
        self.assertEqual(result["features"][0]["id"], "opensky:3c6444")
        self.assertEqual(props["label"], "DLH4AB")
        self.assertEqual(props["alt_m"], 10972.8)
        self.assertEqual(props["speed_ms"], 231.5)
        self.assertEqual(props["track"], 273.0)
        self.assertEqual(props["ts"], "2025-09-17T12:00:00Z")
        self.assertEqual(props["detail"]["origin_country"], "Germany")
        self.assertEqual(props["detail"]["squawk"], "1000")
        self.assertEqual(result["features"][0]["geometry"]["coordinates"], [12.1, 49.0, 10972.8])

    def test_null_positions_dropped(self):
        states = [
            ["aaa", None, "X", None, 1, None, None, None, False, None, None, None, None, None, None, False, 0],
            ["bbb", "CALL", "X", 1, 1, 5.0, 50.0, None, True, 0.0, 90.0, 0.0, None, None, None, False, 0],
        ]
        result = _parse.parse_opensky(json.dumps({"time": 1, "states": states}))
        self.assertEqual([f["id"] for f in result["features"]], ["opensky:bbb"])
        self.assertEqual(result["features"][0]["properties"]["alt_m"], 0.0)

    def test_empty_states(self):
        result = _parse.parse_opensky(json.dumps({"time": 1, "states": None}))
        self.assertEqual(result["features"], [])
