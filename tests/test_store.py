"""Tests for the HA-free SQLite store."""

import sqlite3
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "custom_components" / "chronotope"))

from store import EventStore, QueryFilter, haversine_km  # noqa: E402

BERLIN = {"lat": 52.5200, "lon": 13.4050}
POTSDAM = {"lat": 52.3906, "lon": 13.0645}
MUNICH = {"lat": 48.1351, "lon": 11.5820}


def make_event(**overrides):
    event = {
        "title": "Test Event",
        "category": "market",
        "lat": BERLIN["lat"],
        "lon": BERLIN["lon"],
        "start_time": "2026-07-11T10:00:00+02:00",
        "end_time": "2026-07-11T14:00:00+02:00",
    }
    event.update(overrides)
    return event


class StoreTestCase(unittest.TestCase):
    def setUp(self):
        self.store = EventStore(":memory:")

    def tearDown(self):
        self.store.close()

    def test_save_normalizes_to_utc(self):
        saved = self.store.save_event(make_event())
        self.assertEqual(saved["start_time"], "2026-07-11T08:00:00+00:00")
        self.assertEqual(saved["end_time"], "2026-07-11T12:00:00+00:00")
        self.assertTrue(saved["id"])

    def test_save_rejects_naive_times(self):
        with self.assertRaises(ValueError):
            self.store.save_event(make_event(start_time="2026-07-11T10:00:00"))

    def test_save_rejects_missing_title(self):
        with self.assertRaises(ValueError):
            self.store.save_event(make_event(title=""))

    def test_save_rejects_bad_confidence(self):
        with self.assertRaises(ValueError):
            self.store.save_event(make_event(confidence="guessed"))
        self.store.save_event(make_event(confidence="scraped"))

    def test_save_rejects_bad_rrule(self):
        with self.assertRaises(ValueError):
            self.store.save_event(make_event(recurrence="FREQ=NONSENSE"))

    def test_upsert_and_delete(self):
        saved = self.store.save_event(make_event(id="fixed-id"))
        self.store.save_event(make_event(id="fixed-id", title="Renamed"))
        self.assertEqual(self.store.get_event("fixed-id")["title"], "Renamed")
        self.assertTrue(self.store.delete_event("fixed-id"))
        self.assertFalse(self.store.delete_event("fixed-id"))
        self.assertIsNone(self.store.get_event(saved["id"]))

    def test_category_filter(self):
        self.store.save_event(make_event(category="market"))
        self.store.save_event(make_event(category="astro"))
        results = self.store.query_events(QueryFilter(categories=["astro"]))
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["category"], "astro")
        self.assertEqual(self.store.categories(), ["astro", "market"])

    def test_radius_filter_and_distance_sort(self):
        self.store.save_event(make_event(title="Berlin", **BERLIN))
        self.store.save_event(make_event(title="Potsdam", **POTSDAM))
        self.store.save_event(make_event(title="Munich", **MUNICH))

        flt = QueryFilter(
            center_lat=BERLIN["lat"], center_lon=BERLIN["lon"], radius_km=50.0
        )
        results = self.store.query_events(flt)
        self.assertEqual([ev["title"] for ev in results], ["Berlin", "Potsdam"])
        self.assertAlmostEqual(results[0]["distance_km"], 0.0, places=3)
        self.assertGreater(results[1]["distance_km"], 20.0)

    def test_radius_excludes_events_without_coords(self):
        self.store.save_event(make_event(title="Nowhere", lat=None, lon=None))
        flt = QueryFilter(
            center_lat=BERLIN["lat"], center_lon=BERLIN["lon"], radius_km=10000.0
        )
        self.assertEqual(self.store.query_events(flt), [])

    def test_time_window_overlap(self):
        self.store.save_event(make_event(title="Inside"))
        self.store.save_event(
            make_event(
                title="Before",
                start_time="2026-07-10T10:00:00+02:00",
                end_time="2026-07-10T12:00:00+02:00",
            )
        )
        results = self.store.query_events(
            QueryFilter(
                window_start="2026-07-11T00:00:00+02:00",
                window_end="2026-07-12T00:00:00+02:00",
            )
        )
        self.assertEqual([ev["title"] for ev in results], ["Inside"])

    def test_time_window_boundary_is_exclusive(self):
        self.store.save_event(make_event(title="EndsAtWindowStart"))
        results = self.store.query_events(
            QueryFilter(window_start="2026-07-11T14:00:00+02:00")
        )
        self.assertEqual(results, [])

    def test_combined_filters(self):
        self.store.save_event(make_event(title="Match", category="market", **BERLIN))
        self.store.save_event(make_event(title="WrongCat", category="astro", **BERLIN))
        self.store.save_event(make_event(title="TooFar", category="market", **MUNICH))
        self.store.save_event(
            make_event(
                title="WrongTime",
                category="market",
                start_time="2026-08-01T10:00:00+02:00",
                end_time="2026-08-01T14:00:00+02:00",
                **BERLIN,
            )
        )
        results = self.store.query_events(
            QueryFilter(
                categories=["market"],
                center_lat=BERLIN["lat"],
                center_lon=BERLIN["lon"],
                radius_km=50.0,
                window_start="2026-07-11T00:00:00+02:00",
                window_end="2026-07-12T00:00:00+02:00",
            )
        )
        self.assertEqual([ev["title"] for ev in results], ["Match"])

    def test_weekday_mask(self):
        # 2026-07-11 is a Saturday (weekday 5).
        self.store.save_event(make_event(title="Saturday"))
        self.assertEqual(
            len(self.store.query_events(QueryFilter(weekdays=[5], tz_name="Europe/Berlin"))), 1
        )
        self.assertEqual(
            self.store.query_events(QueryFilter(weekdays=[0], tz_name="Europe/Berlin")), []
        )

    def test_time_of_day_mask_respects_timezone(self):
        # Event runs 10:00-14:00 Berlin time == 08:00-12:00 UTC.
        self.store.save_event(make_event())
        matches = self.store.query_events(
            QueryFilter(time_from="13:00", time_to="18:00", tz_name="Europe/Berlin")
        )
        self.assertEqual(len(matches), 1)
        no_match = self.store.query_events(
            QueryFilter(time_from="15:00", time_to="18:00", tz_name="Europe/Berlin")
        )
        self.assertEqual(no_match, [])
        # Same clock range in UTC misses only if it doesn't overlap 08:00-12:00 UTC.
        utc_match = self.store.query_events(
            QueryFilter(time_from="13:00", time_to="18:00", tz_name="UTC")
        )
        self.assertEqual(utc_match, [])

    def test_recurrence_expansion_in_window(self):
        self.store.save_event(
            make_event(title="Weekly", recurrence="FREQ=WEEKLY;BYDAY=SA;COUNT=10")
        )
        results = self.store.query_events(
            QueryFilter(
                window_start="2026-07-17T00:00:00+00:00",
                window_end="2026-07-19T00:00:00+00:00",
            )
        )
        self.assertEqual(len(results), 1)
        occurrences = results[0]["occurrences"]
        self.assertEqual(len(occurrences), 1)
        self.assertEqual(occurrences[0][0], "2026-07-18T08:00:00+00:00")

    def test_recurrence_outside_window_no_match(self):
        self.store.save_event(
            make_event(title="Weekly", recurrence="FREQ=WEEKLY;BYDAY=SA;COUNT=3")
        )
        results = self.store.query_events(
            QueryFilter(
                window_start="2026-09-01T00:00:00+00:00",
                window_end="2026-09-30T00:00:00+00:00",
            )
        )
        self.assertEqual(results, [])

    def test_recurrence_with_weekday_mask(self):
        self.store.save_event(
            make_event(title="Daily", recurrence="FREQ=DAILY;COUNT=14")
        )
        results = self.store.query_events(
            QueryFilter(
                window_start="2026-07-11T00:00:00+00:00",
                window_end="2026-07-25T00:00:00+00:00",
                weekdays=[2],  # Wednesdays
                tz_name="Europe/Berlin",
            )
        )
        self.assertEqual(len(results), 1)
        self.assertEqual(len(results[0]["occurrences"]), 2)
        for occ_start, _ in results[0]["occurrences"]:
            self.assertIn("T08:00:00+00:00", occ_start)

    def test_occurrence_overlapping_window_start_is_found(self):
        # Occurrence starts before the window but is still running at window start.
        self.store.save_event(
            make_event(
                title="Overnight",
                start_time="2026-07-11T22:00:00+00:00",
                end_time="2026-07-12T04:00:00+00:00",
                recurrence="FREQ=WEEKLY;COUNT=5",
            )
        )
        results = self.store.query_events(
            QueryFilter(
                window_start="2026-07-19T00:00:00+00:00",
                window_end="2026-07-19T12:00:00+00:00",
            )
        )
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["occurrences"][0][0], "2026-07-18T22:00:00+00:00")

    def test_geometry_roundtrip(self):
        geojson = {"type": "LineString", "coordinates": [[13.4, 52.5], [13.5, 52.6]]}
        saved = self.store.save_event(make_event(geometry=geojson))
        stored = self.store.get_event(saved["id"])
        self.assertIn("LineString", stored["geometry"])
        with self.assertRaises(ValueError):
            self.store.save_event(make_event(geometry="{not json"))

    def test_address_teaches_place_cache(self):
        self.store.save_event(
            make_event(address="Boxhagener Platz 1, 10245 Berlin")
        )
        place = self.store.lookup_place("boxhagener platz 1  10245 berlin")
        self.assertIsNotNone(place)
        self.assertAlmostEqual(place["lat"], BERLIN["lat"])
        self.assertAlmostEqual(place["lon"], BERLIN["lon"])

    def test_address_fills_missing_coords_from_cache(self):
        self.store.save_event(make_event(address="Boxhagener Platz 1, 10245 Berlin"))
        saved = self.store.save_event(
            make_event(
                title="Later event, same place",
                address="Boxhagener Platz 1, 10245 Berlin",
                lat=None,
                lon=None,
            )
        )
        self.assertAlmostEqual(saved["lat"], BERLIN["lat"])
        self.assertAlmostEqual(saved["lon"], BERLIN["lon"])
        stored = self.store.get_event(saved["id"])
        self.assertAlmostEqual(stored["lat"], BERLIN["lat"])

    def test_unknown_address_leaves_coords_empty(self):
        saved = self.store.save_event(
            make_event(title="No coords", address="Nirgendwo 1", lat=None, lon=None)
        )
        self.assertIsNone(saved["lat"])
        self.assertIsNone(self.store.lookup_place("Nirgendwo 1"))

    def test_save_place_directly(self):
        self.store.save_place("Rathausplatz 5", 50.0, 8.0)
        place = self.store.lookup_place("RATHAUSPLATZ 5")
        self.assertEqual(place["lat"], 50.0)
        with self.assertRaises(ValueError):
            self.store.save_place("", 50.0, 8.0)
        with self.assertRaises(ValueError):
            self.store.save_place("X", 999.0, 8.0)

    def test_time_precision_validation(self):
        with self.assertRaises(ValueError):
            self.store.save_event(make_event(time_precision="fuzzy"))
        saved = self.store.save_event(
            make_event(
                time_precision="approximate",
                schedule_text="mittwochs 18 Uhr, ca. 2x im Monat",
                recurrence="FREQ=WEEKLY;BYDAY=WE",
            )
        )
        stored = self.store.get_event(saved["id"])
        self.assertEqual(stored["time_precision"], "approximate")
        self.assertEqual(stored["schedule_text"], "mittwochs 18 Uhr, ca. 2x im Monat")

    def test_alternative_hours_via_byhour(self):
        # "Every Tuesday and Thursday at 18:00 or 20:00" as a single RRULE.
        self.store.save_event(
            make_event(
                title="TuTh 18/20",
                start_time="2026-07-14T18:00:00+00:00",
                end_time="2026-07-14T19:00:00+00:00",
                recurrence="FREQ=WEEKLY;BYDAY=TU,TH;BYHOUR=18,20",
                time_precision="approximate",
            )
        )
        results = self.store.query_events(
            QueryFilter(
                window_start="2026-07-14T00:00:00+00:00",
                window_end="2026-07-21T00:00:00+00:00",
            )
        )
        self.assertEqual(len(results), 1)
        starts = [occ[0] for occ in results[0]["occurrences"]]
        self.assertEqual(
            starts,
            [
                "2026-07-14T18:00:00+00:00",
                "2026-07-14T20:00:00+00:00",
                "2026-07-16T18:00:00+00:00",
                "2026-07-16T20:00:00+00:00",
            ],
        )

    def test_recurrence_expands_in_local_wall_clock_across_dst(self):
        # Weekly Tuesday 18:00 Berlin time, anchored in July (CEST, UTC+2).
        # In November (CET, UTC+1) the occurrence must still be 18:00 local,
        # i.e. 17:00 UTC — not a fixed 16:00 UTC.
        self.store.save_event(
            make_event(
                title="Weekly local",
                start_time="2026-07-14T18:00:00+02:00",
                end_time="2026-07-14T19:00:00+02:00",
                recurrence="FREQ=WEEKLY;BYDAY=TU",
            )
        )
        results = self.store.query_events(
            QueryFilter(
                window_start="2026-11-03T00:00:00+00:00",
                window_end="2026-11-04T00:00:00+00:00",
                tz_name="Europe/Berlin",
            )
        )
        self.assertEqual(len(results), 1)
        self.assertEqual(
            results[0]["occurrences"][0][0], "2026-11-03T17:00:00+00:00"
        )

    def test_migration_adds_new_columns(self):
        with tempfile.TemporaryDirectory() as tmp:
            db_path = str(Path(tmp) / "old.db")
            conn = sqlite3.connect(db_path)
            conn.executescript(
                """
                CREATE TABLE events (
                    id TEXT PRIMARY KEY, title TEXT NOT NULL,
                    category TEXT NOT NULL DEFAULT '', lat REAL, lon REAL,
                    start_time TEXT NOT NULL, end_time TEXT NOT NULL,
                    recurrence TEXT, source_url TEXT, source_name TEXT,
                    confidence TEXT, scraped_at TEXT, raw_description TEXT,
                    geometry TEXT
                );
                INSERT INTO events (id, title, start_time, end_time)
                VALUES ('old1', 'Old event',
                        '2026-07-11T08:00:00+00:00', '2026-07-11T12:00:00+00:00');
                """
            )
            conn.commit()
            conn.close()

            migrated = EventStore(db_path)
            try:
                old = migrated.get_event("old1")
                self.assertIsNone(old["address"])
                saved = migrated.save_event(
                    make_event(address="Neue Str. 1", time_precision="approximate")
                )
                self.assertEqual(
                    migrated.get_event(saved["id"])["address"], "Neue Str. 1"
                )
            finally:
                migrated.close()

    def test_haversine_known_distance(self):
        # Berlin -> Munich is roughly 504 km.
        distance = haversine_km(
            BERLIN["lat"], BERLIN["lon"], MUNICH["lat"], MUNICH["lon"]
        )
        self.assertAlmostEqual(distance, 504, delta=6)
        self.assertIsNone(haversine_km(None, 1.0, 2.0, 3.0))


if __name__ == "__main__":
    unittest.main()
