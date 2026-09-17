"""USGS parser: mapping onto the event schema, stable ids, retention."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")
_store = load_module("store")


def feed(features):
    return json.dumps({"type": "FeatureCollection", "metadata": {"generated": 1758110400000}, "features": features})


def quake(ext_id="us7000abcd", mag=4.5, time_ms=1758100000000, lon=12.0, lat=49.0, depth=10.0):
    return {
        "type": "Feature",
        "id": ext_id,
        "properties": {"mag": mag, "place": "10 km N of Somewhere", "time": time_ms, "url": f"https://earthquake.usgs.gov/earthquakes/eventpage/{ext_id}", "title": f"M {mag} - 10 km N of Somewhere", "type": "earthquake"},
        "geometry": {"type": "Point", "coordinates": [lon, lat, depth]},
    }


class UsgsParserTestCase(unittest.TestCase):
    def test_event_mapping(self):
        result = _parse.parse_usgs(feed([quake()]))
        event = result["events"][0]
        self.assertEqual(event["id"], "feed:usgs:us7000abcd")
        self.assertEqual(event["category"], "earthquake")
        self.assertEqual((event["lat"], event["lon"]), (49.0, 12.0))
        self.assertEqual(event["start_time"], "2025-09-17T09:06:40+00:00")
        self.assertEqual(event["end_time"], "2025-09-17T10:06:40+00:00")
        self.assertEqual(event["source_name"], "USGS")
        self.assertEqual(event["confidence"], "scraped")
        self.assertIn("M4.5 10 km N of Somewhere, depth 10 km", event["raw_description"])
        self.assertTrue(event["source_url"].endswith("us7000abcd"))
        self.assertEqual(result["source_time"], "2025-09-17T12:00:00Z")

    def test_stable_id_upserts_in_store(self):
        store = _store.EventStore(":memory:")
        try:
            for _ in range(2):
                for event in _parse.parse_usgs(feed([quake()]))["events"]:
                    store.save_event(event)
            self.assertEqual(len(store.event_ids_by_prefix("feed:usgs:")), 1)
            store.set_event_flags("feed:usgs:us7000abcd", favorite=True)
            store.save_event(_parse.parse_usgs(feed([quake(mag=4.7)]))["events"][0])
            self.assertEqual(store.get_event("feed:usgs:us7000abcd")["favorite"], 1)
        finally:
            store.close()

    def test_retention_skips_favorites(self):
        store = _store.EventStore(":memory:")
        try:
            old = quake(ext_id="old", time_ms=1600000000000)
            fav = quake(ext_id="fav", time_ms=1600000000000)
            for event in _parse.parse_usgs(feed([old, fav, quake()]))["events"]:
                store.save_event(event)
            store.set_event_flags("feed:usgs:fav", favorite=True)
            deleted = store.delete_events_by_prefix("feed:usgs:", older_than="2025-09-10T00:00:00+00:00")
            self.assertEqual(deleted, 1)
            self.assertEqual(sorted(store.event_ids_by_prefix("feed:usgs:")), ["feed:usgs:fav", "feed:usgs:us7000abcd"])
        finally:
            store.close()

    def test_bad_coordinates_dropped(self):
        broken = quake(ext_id="x")
        broken["geometry"]["coordinates"] = [200, 95, 0]
        self.assertEqual(_parse.parse_usgs(feed([broken]))["events"], [])
