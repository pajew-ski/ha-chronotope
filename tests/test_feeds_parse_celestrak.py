"""CelesTrak OMM parser and the 403 'not updated' special case."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")
_policy = load_module("feeds/policy")


def omm(**overrides):
    entry = {
        "OBJECT_NAME": "ISS (ZARYA)", "OBJECT_ID": "1998-067A", "EPOCH": "2026-09-17T10:00:00.000000",
        "MEAN_MOTION": "15.49", "ECCENTRICITY": 0.0006, "INCLINATION": 51.64, "RA_OF_ASC_NODE": 100.0,
        "ARG_OF_PERICENTER": 50.0, "MEAN_ANOMALY": 10.0, "EPHEMERIS_TYPE": 0, "CLASSIFICATION_TYPE": "U",
        "NORAD_CAT_ID": 25544, "ELEMENT_SET_NO": 999, "REV_AT_EPOCH": 1, "BSTAR": 0.0001,
        "MEAN_MOTION_DOT": 0.00001, "MEAN_MOTION_DDOT": 0,
    }
    entry.update(overrides)
    return entry


class CelestrakParserTestCase(unittest.TestCase):
    def test_required_fields_and_coercion(self):
        result = _parse.parse_celestrak_omm(json.dumps([omm()]))
        entry = result["omm"][0]
        self.assertEqual(entry["MEAN_MOTION"], 15.49)
        self.assertEqual(entry["NORAD_CAT_ID"], 25544)
        self.assertEqual(result["source_time"], "2026-09-17T10:00:00Z")

    def test_missing_required_field_dropped(self):
        broken = omm()
        del broken["MEAN_MOTION"]
        result = _parse.parse_celestrak_omm(json.dumps([broken, omm()]))
        self.assertEqual(len(result["omm"]), 1)

    def test_six_digit_catalog_number(self):
        result = _parse.parse_celestrak_omm(json.dumps([omm(NORAD_CAT_ID=270000, OBJECT_NAME="ANALYST")]))
        self.assertEqual(result["omm"][0]["NORAD_CAT_ID"], 270000)

    def test_budget_cap(self):
        result = _parse.parse_celestrak_omm(json.dumps([omm(NORAD_CAT_ID=i) for i in range(5)]), max_objects=2)
        self.assertEqual(len(result["omm"]), 2)
        self.assertTrue(result["truncated"])

    def test_403_not_updated_is_success_without_data(self):
        self.assertTrue(_parse.celestrak_not_updated(403, b"Data has not updated since your last request"))
        self.assertTrue(_parse.celestrak_not_updated(403, "You have already downloaded this data"))
        policy = _policy.FeedPolicy(min_interval_s=7200, now=lambda: 1000.0)
        policy.record_attempt()
        policy.record_not_modified()
        self.assertEqual(policy.freshness(), "fresh")

    def test_other_403_is_blocked(self):
        self.assertFalse(_parse.celestrak_not_updated(403, b"Forbidden"))
        self.assertFalse(_parse.celestrak_not_updated(200, b"Data has not updated"))
        policy = _policy.FeedPolicy(min_interval_s=7200, now=lambda: 1000.0)
        policy.record_blocked(403)
        self.assertEqual(policy.freshness(), "blocked")
        self.assertAlmostEqual(policy.seconds_until_allowed(), 6 * 3600)

    def test_non_list_payload(self):
        with self.assertRaises(_parse.ParseError):
            _parse.parse_celestrak_omm("{}")
