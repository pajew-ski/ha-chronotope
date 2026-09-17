"""Launch Library 2 parser: pad coordinates, end time, retention."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")
_store = load_module("store")


def launch(**overrides):
    entry = {
        "id": "abcd-1234", "url": "https://ll.thespacedevs.com/2.3.0/launches/abcd-1234/", "slug": "falcon-9-starlink",
        "name": "Falcon 9 Block 5 | Starlink Group 10-1", "net": "2026-09-18T12:00:00Z",
        "window_start": "2026-09-18T11:30:00Z", "window_end": "2026-09-18T15:30:00Z",
        "status": {"id": 1, "name": "Go for Launch", "abbrev": "Go"},
        "launch_service_provider": {"name": "SpaceX"},
        "rocket": {"configuration": {"name": "Falcon 9", "full_name": "Falcon 9 Block 5"}},
        "mission": {"name": "Starlink Group 10-1", "type": "Communications"},
        "pad": {"name": "Space Launch Complex 40", "latitude": "28.56194122", "longitude": "-80.57735736", "location": {"name": "Cape Canaveral SFS, FL, USA"}},
    }
    entry.update(overrides)
    return entry


def feed(results):
    return json.dumps({"count": len(results), "next": None, "previous": None, "results": results})


class Ll2ParserTestCase(unittest.TestCase):
    def test_pad_coordinates_and_fields(self):
        event = _parse.parse_ll2(feed([launch()]))["events"][0]
        self.assertEqual(event["id"], "feed:ll2:abcd-1234")
        self.assertAlmostEqual(event["lat"], 28.56194122)
        self.assertAlmostEqual(event["lon"], -80.57735736)
        self.assertEqual(event["title"], "Starlink Group 10-1")
        self.assertEqual(event["category"], "launch")
        self.assertEqual(event["raw_description"], "Falcon 9 Block 5, SpaceX, Go for Launch, Cape Canaveral SFS, FL, USA")
        self.assertEqual(event["address"], "Space Launch Complex 40")

    def test_end_time_net_plus_two_hours_or_window_end(self):
        event = _parse.parse_ll2(feed([launch()]))["events"][0]
        self.assertEqual(event["end_time"], "2026-09-18T15:30:00+00:00")
        event = _parse.parse_ll2(feed([launch(window_end=None)]))["events"][0]
        self.assertEqual(event["end_time"], "2026-09-18T14:00:00+00:00")

    def test_missing_coordinates_dropped(self):
        result = _parse.parse_ll2(feed([launch(pad={"name": "x", "latitude": None, "longitude": None}), launch(id="ok")]))
        self.assertEqual([e["id"] for e in result["events"]], ["feed:ll2:ok"])

    def test_numeric_pad_coordinates(self):
        event = _parse.parse_ll2(feed([launch(pad={"latitude": 5.2, "longitude": -52.7})]))["events"][0]
        self.assertEqual((event["lat"], event["lon"]), (5.2, -52.7))

    def test_retention_30_days(self):
        store = _store.EventStore(":memory:")
        try:
            old = launch(id="old", net="2026-06-01T00:00:00Z", window_end=None)
            for event in _parse.parse_ll2(feed([old, launch()]))["events"]:
                store.save_event(event)
            deleted = store.delete_events_by_prefix("feed:ll2:", older_than="2026-08-18T00:00:00+00:00")
            self.assertEqual(deleted, 1)
            self.assertEqual(store.event_ids_by_prefix("feed:ll2:"), ["feed:ll2:abcd-1234"])
        finally:
            store.close()
