"""Overpass: bbox tiling, zoom threshold, daily limit, query size."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


class OverpassTestCase(unittest.TestCase):
    def test_zoom_threshold(self):
        self.assertEqual(_parse.overpass_tiles((13.0, 52.0, 13.5, 52.5), zoom=7), [])
        tiles = _parse.overpass_tiles((13.0, 52.0, 13.5, 52.5), zoom=8)
        self.assertTrue(tiles)
        self.assertTrue(all(t[0] == 8 for t in tiles))

    def test_bbox_covers_tiles(self):
        tiles = _parse.overpass_tiles((13.0, 52.0, 14.9, 53.0), zoom=10)
        self.assertGreaterEqual(len(tiles), 2)
        for z, x, y in tiles:
            box = _parse.tile_bbox(z, x, y)
            self.assertLessEqual(box[2] - box[0], 2.0)
            self.assertLessEqual(box[3] - box[1], 2.0)
        # Every tile bbox intersects the requested bbox.
        for z, x, y in tiles:
            box = _parse.tile_bbox(z, x, y)
            self.assertTrue(box[2] >= 13.0 and box[0] <= 14.9 and box[3] >= 52.0 and box[1] <= 53.0)

    def test_query_rejects_large_bbox(self):
        with self.assertRaises(ValueError):
            _parse.overpass_query("dams", (0, 0, 3, 1))
        query = _parse.overpass_query("datacenters", (13.0, 52.0, 14.0, 53.0))
        self.assertIn('"telecom"="data_center"', query)
        self.assertIn("52.0000,13.0000,53.0000,14.0000", query)
        with self.assertRaises(ValueError):
            _parse.overpass_query("bunkers", (0, 0, 1, 1))

    def test_daily_limit(self):
        clock = {"t": 1_700_000_000.0}
        budget = _parse.DailyBudget(3, now=lambda: clock["t"])
        self.assertEqual([budget.allow() for _ in range(4)], [True, True, True, False])
        clock["t"] += 86400
        self.assertTrue(budget.allow())
        restored = _parse.DailyBudget(3, now=lambda: clock["t"])
        restored.load(budget.to_dict())
        self.assertEqual(restored.count, 1)

    def test_parse_elements(self):
        doc = {"osm3s": {"timestamp_osm_base": "2026-09-17T11:00:00Z"}, "elements": [
            {"type": "node", "id": 1, "lat": 52.5, "lon": 13.4, "tags": {"name": "DC Berlin", "operator": "X"}},
            {"type": "way", "id": 2, "center": {"lat": 48.1, "lon": 11.5}, "tags": {"waterway": "dam"}},
            {"type": "relation", "id": 3, "tags": {}},
        ]}
        result = _parse.parse_overpass(json.dumps(doc), "datacenters")
        self.assertEqual([f["id"] for f in result["features"]], ["osm:node:1", "osm:way:2"])
        self.assertEqual(result["features"][0]["properties"]["label"], "DC Berlin")
        self.assertEqual(result["features"][1]["properties"]["label"], "way 2")
        self.assertEqual(result["source_time"], "2026-09-17T11:00:00Z")
