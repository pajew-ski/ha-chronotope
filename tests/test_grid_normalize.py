"""SWPC OVATION grid normalization: longitude wrap, dimensions, range."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


class GridNormalizeTestCase(unittest.TestCase):
    def test_longitude_wrap(self):
        grid = _parse.normalize_lonlat_grid([[0, 0, 7], [359, 0, 9], [180, 45, 3]])
        self.assertEqual(grid["lon0"], -180)
        self.assertEqual((grid["nx"], grid["ny"]), (360, 181))
        # lon 0 -> column 180, lon 359 -> column 179, lon 180 -> column 0
        row0 = 90 * 360
        self.assertEqual(grid["values"][row0 + 180], 7)
        self.assertEqual(grid["values"][row0 + 179], 9)
        self.assertEqual(grid["values"][(45 + 90) * 360 + 0], 3)
        self.assertEqual(_parse.grid_value_at(grid, 0, 0), 7)
        self.assertEqual(_parse.grid_value_at(grid, 0, -1), 9)
        self.assertEqual(_parse.grid_value_at(grid, 45, 180), 3)
        self.assertEqual(_parse.grid_value_at(grid, 45, -180), 3)

    def test_values_outside_range_dropped(self):
        grid = _parse.normalize_lonlat_grid([[10, 10, -1], [11, 10, 101], [12, 10, 100], [13, 10, "x"]])
        self.assertIsNone(_parse.grid_value_at(grid, 10, 10))
        self.assertIsNone(_parse.grid_value_at(grid, 10, 11))
        self.assertEqual(_parse.grid_value_at(grid, 10, 12), 100)
        self.assertIsNone(_parse.grid_value_at(grid, 10, 13))

    def test_dimensions_and_validation(self):
        grid = _parse.normalize_lonlat_grid([])
        self.assertEqual(len(grid["values"]), 360 * 181)
        self.assertEqual(_parse.validate_grid(grid), [])

    def test_parse_swpc_aurora_document(self):
        doc = {
            "Observation Time": "2026-09-17T12:00:00Z",
            "Forecast Time": "2026-09-17T12:30:00Z",
            "Data Format": "[Longitude, Latitude, Aurora]",
            "coordinates": [[0, -90, 0], [30, 60, 42]],
        }
        result = _parse.parse_swpc_aurora(json.dumps(doc))
        self.assertEqual(result["source_time"], "2026-09-17T12:30:00Z")
        self.assertEqual(_parse.grid_value_at(result["grid"], 60, 30), 42)

    def test_parse_kp(self):
        doc = [["time_tag", "Kp", "a_running", "station_count"], ["2026-09-17 00:00:00.000", "2.33", "9", "8"], ["2026-09-17 03:00:00.000", "4.00", "27", "8"]]
        result = _parse.parse_swpc_kp(json.dumps(doc))
        self.assertEqual(result["kp"], 4.0)
        self.assertEqual(result["time"], "2026-09-17T03:00:00Z")
        with self.assertRaises(_parse.ParseError):
            _parse.parse_swpc_kp(json.dumps([["time_tag", "x"]]))
