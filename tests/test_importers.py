"""Tests for ICS parsing, GeoJSON/GPX importers and VTIMEZONE export."""

import json
import unittest

from helpers import load_module

_ics = load_module("ics")
parse_ics = _ics.parse_ics
events_to_ics = _ics.events_to_ics

_importers = load_module("importers")
parse_geojson = _importers.parse_geojson
parse_gpx = _importers.parse_gpx

SAMPLE_ICS = "\r\n".join(
    [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        "UID:evt-1@example.org",
        "SUMMARY:Sommerfest mit sehr langem Titel der gefaltet werden muss und n",
        " och weiter geht",
        "DTSTART;TZID=Europe/Berlin:20260711T100000",
        "DTEND;TZID=Europe/Berlin:20260711T160000",
        "LOCATION:Boxhagener Platz 1\\, Berlin",
        "GEO:52.510400;13.459900",
        "DESCRIPTION:Zeile1\\nZeile2",
        "RRULE:FREQ=WEEKLY;BYDAY=SA",
        "URL:https://example.org/fest",
        "END:VEVENT",
        "BEGIN:VEVENT",
        "UID:evt-2@example.org",
        "SUMMARY:Ganztags",
        "DTSTART;VALUE=DATE:20260801",
        "DTEND;VALUE=DATE:20260802",
        "END:VEVENT",
        "BEGIN:VEVENT",
        "UID:evt-3@example.org",
        "SUMMARY:UTC mit Dauer",
        "DTSTART:20260711T080000Z",
        "DURATION:PT2H30M",
        "END:VEVENT",
        "END:VCALENDAR",
    ]
)


class IcsParseTestCase(unittest.TestCase):
    def test_parse_basic_fields(self):
        events = parse_ics(SAMPLE_ICS, default_tz="Europe/Berlin")
        self.assertEqual(len(events), 3)
        first = events[0]
        self.assertEqual(first["id"], "evt-1@example.org")
        self.assertIn("gefaltet werden muss und noch weiter geht", first["title"])
        self.assertEqual(first["start_time"], "2026-07-11T10:00:00+02:00")
        self.assertEqual(first["address"], "Boxhagener Platz 1, Berlin")
        self.assertAlmostEqual(first["lat"], 52.5104)
        self.assertEqual(first["raw_description"], "Zeile1\nZeile2")
        self.assertEqual(first["recurrence"], "FREQ=WEEKLY;BYDAY=SA")
        self.assertEqual(first["source_url"], "https://example.org/fest")

    def test_parse_all_day_and_duration(self):
        events = parse_ics(SAMPLE_ICS, default_tz="Europe/Berlin")
        all_day = events[1]
        self.assertEqual(all_day["start_time"], "2026-08-01T00:00:00+02:00")
        self.assertEqual(all_day["end_time"], "2026-08-02T00:00:00+02:00")
        with_duration = events[2]
        self.assertEqual(with_duration["start_time"], "2026-07-11T08:00:00+00:00")
        self.assertEqual(with_duration["end_time"], "2026-07-11T10:30:00+00:00")

    def test_roundtrip_through_own_export(self):
        exported = events_to_ics(
            [
                {
                    "id": "x1",
                    "title": "Test; mit Sonderzeichen",
                    "category": "m",
                    "start_time": "2026-07-11T08:00:00+00:00",
                    "end_time": "2026-07-11T10:00:00+00:00",
                }
            ]
        )
        events = parse_ics(exported)
        self.assertEqual(len(events), 1)
        self.assertEqual(events[0]["title"], "Test; mit Sonderzeichen")
        self.assertEqual(events[0]["start_time"], "2026-07-11T08:00:00+00:00")


class VTimezoneTestCase(unittest.TestCase):
    def test_recurring_event_gets_tzid_and_vtimezone(self):
        ics = events_to_ics(
            [
                {
                    "id": "r1",
                    "title": "Wöchentlich",
                    "start_time": "2026-07-14T16:00:00+00:00",  # 18:00 Berlin
                    "end_time": "2026-07-14T17:00:00+00:00",
                    "recurrence": "FREQ=WEEKLY;BYDAY=TU",
                }
            ],
            tz_name="Europe/Berlin",
        )
        self.assertIn("BEGIN:VTIMEZONE", ics)
        self.assertIn("TZID:Europe/Berlin", ics)
        self.assertIn("DTSTART;TZID=Europe/Berlin:20260714T180000", ics)
        self.assertIn("BEGIN:DAYLIGHT", ics)
        self.assertIn("BEGIN:STANDARD", ics)
        self.assertIn("TZOFFSETFROM:+0200", ics)
        self.assertIn("TZOFFSETTO:+0100", ics)

    def test_non_recurring_stays_utc(self):
        ics = events_to_ics(
            [
                {
                    "id": "s1",
                    "title": "Einmalig",
                    "start_time": "2026-07-11T08:00:00+00:00",
                    "end_time": "2026-07-11T10:00:00+00:00",
                }
            ],
            tz_name="Europe/Berlin",
        )
        self.assertNotIn("VTIMEZONE", ics)
        self.assertIn("DTSTART:20260711T080000Z", ics)


class GeoJsonTestCase(unittest.TestCase):
    def test_point_and_linestring(self):
        data = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [13.4, 52.5]},
                    "properties": {
                        "name": "Punkt-Event",
                        "start_time": "2026-07-12T10:00:00+02:00",
                        "end_time": "2026-07-12T12:00:00+02:00",
                    },
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[13.0, 52.0], [14.0, 53.0]],
                    },
                    "properties": {"title": "Strecke"},
                },
                {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [13.4, 52.5]},
                    "properties": {},
                },
            ],
        }
        events, errors = parse_geojson(
            data,
            default_start="2026-07-01T00:00:00+02:00",
            default_end="2026-07-01T02:00:00+02:00",
            category="geo",
        )
        self.assertEqual(len(events), 2)
        self.assertEqual(len(errors), 1)  # feature without title
        point = events[0]
        self.assertEqual(point["lat"], 52.5)
        self.assertEqual(point["category"], "geo")
        line = events[1]
        self.assertIn("LineString", line["geometry"])
        self.assertAlmostEqual(line["lat"], 52.5)  # centroid
        self.assertEqual(line["start_time"], "2026-07-01T00:00:00+02:00")


class GpxTestCase(unittest.TestCase):
    GPX = """<?xml version="1.0"?>
    <gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1">
      <trk><name>Laufrunde</name><trkseg>
        <trkpt lat="52.50" lon="13.40"><time>2026-07-11T08:00:00Z</time></trkpt>
        <trkpt lat="52.51" lon="13.41"><time>2026-07-11T08:30:00Z</time></trkpt>
        <trkpt lat="52.52" lon="13.42"><time>2026-07-11T09:00:00Z</time></trkpt>
      </trkseg></trk>
    </gpx>"""

    def test_track_to_linestring_event(self):
        events, errors = parse_gpx(self.GPX, category="sport")
        self.assertEqual(errors, [])
        self.assertEqual(len(events), 1)
        track = events[0]
        self.assertEqual(track["title"], "Laufrunde")
        self.assertEqual(track["start_time"], "2026-07-11T08:00:00Z")
        self.assertEqual(track["end_time"], "2026-07-11T09:00:00Z")
        geometry = json.loads(track["geometry"])
        self.assertEqual(len(geometry["coordinates"]), 3)
        self.assertEqual(geometry["coordinates"][0], [13.40, 52.50])
        self.assertEqual(track["lat"], 52.51)  # middle point


if __name__ == "__main__":
    unittest.main()
