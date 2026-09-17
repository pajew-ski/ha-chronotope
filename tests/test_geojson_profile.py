"""Validator for the GeoJSON profile of the layer data response (5.3)."""

import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


def valid_doc():
    return {
        "type": "FeatureCollection",
        "features": [
            _parse.make_feature("adsb:3c6444", 12.1, 49.0, "DLH4AB", "aircraft", "2026-09-17T12:00:05Z", alt_m=10972, track=273.0, speed_ms=231.5, detail={"icao24": "3c6444"})
        ],
        "meta": {
            "layer_id": "flights_regional",
            "fetched_at": "2026-09-17T12:00:07Z",
            "source_time": "2026-09-17T12:00:05Z",
            "freshness": "fresh",
            "stale_since": None,
            "attribution": {"text": "adsb.lol", "url": "https://adsb.lol"},
            "truncated": False,
            "count": 1,
        },
    }


class ProfileValidatorTestCase(unittest.TestCase):
    def test_valid_document(self):
        self.assertEqual(_parse.validate_feature_collection(valid_doc()), [])

    def test_make_feature_orders_lon_lat_alt(self):
        feature = valid_doc()["features"][0]
        self.assertEqual(feature["geometry"]["coordinates"], [12.1, 49.0, 10972.0])
        self.assertEqual(feature["properties"]["detail"], {"icao24": "3c6444"})

    def test_required_properties(self):
        doc = valid_doc()
        del doc["features"][0]["properties"]["ts"]
        problems = _parse.validate_feature_collection(doc)
        self.assertTrue(any("properties.ts" in p for p in problems))

    def test_coordinate_order_checked(self):
        doc = valid_doc()
        doc["features"][0]["geometry"]["coordinates"] = [49.0, 200.0]
        self.assertTrue(_parse.validate_feature_collection(doc))

    def test_meta_required(self):
        doc = valid_doc()
        del doc["meta"]["attribution"]
        problems = _parse.validate_feature_collection(doc)
        self.assertIn("meta.attribution is required", problems)
        doc = valid_doc()
        doc.pop("meta")
        self.assertIn("meta is required", _parse.validate_feature_collection(doc))

    def test_grid_document(self):
        grid = _parse.normalize_lonlat_grid([[0, -90, 0], [359, 90, 12]])
        doc = {"grid": grid, "meta": valid_doc()["meta"]}
        self.assertEqual(_parse.validate_feature_collection(doc), [])
        grid["values"] = grid["values"][:-1]
        self.assertTrue(_parse.validate_feature_collection(doc))

    def test_omm_document(self):
        doc = {"omm": [], "meta": valid_doc()["meta"]}
        self.assertEqual(_parse.validate_feature_collection(doc), [])

    def test_polygon_geometry(self):
        doc = valid_doc()
        doc["features"][0]["geometry"] = {"type": "Polygon", "coordinates": [[[0, 0], [1, 0], [1, 1], [0, 0]]]}
        self.assertEqual(_parse.validate_feature_collection(doc), [])

    def test_bbox_filter(self):
        features = [
            _parse.make_feature("a", 10, 50, "a", "x", None),
            _parse.make_feature("b", 30, 50, "b", "x", None),
            _parse.make_feature("c", 0, 0, "c", "x", None, geometry={"type": "LineString", "coordinates": [[5, 45], [15, 55]]}),
        ]
        kept = _parse.bbox_filter(features, (9, 49, 11, 51))
        self.assertEqual([f["id"] for f in kept], ["a", "c"])
        self.assertEqual(_parse.parse_bbox("9,49,11,51"), (9.0, 49.0, 11.0, 51.0))
        with self.assertRaises(ValueError):
            _parse.parse_bbox("11,49,9,51")
