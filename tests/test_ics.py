"""Tests for the RFC 5545 generator."""

import sys
import unittest
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "custom_components" / "chronotope"))

from ics import events_to_ics  # noqa: E402

NOW = datetime(2026, 7, 11, 12, 0, 0, tzinfo=timezone.utc)


def make_event(**overrides):
    event = {
        "id": "abc123",
        "title": "Test Event",
        "category": "market",
        "lat": 52.52,
        "lon": 13.405,
        "start_time": "2026-07-11T08:00:00+00:00",
        "end_time": "2026-07-11T12:00:00+00:00",
        "recurrence": None,
        "source_url": "https://example.org/event",
        "source_name": "Example",
        "confidence": "scraped",
        "scraped_at": None,
        "raw_description": "A test; with, special\nchars",
        "geometry": None,
    }
    event.update(overrides)
    return event


class IcsTestCase(unittest.TestCase):
    def test_document_structure(self):
        ics = events_to_ics([make_event()], now=NOW)
        self.assertTrue(ics.startswith("BEGIN:VCALENDAR\r\n"))
        self.assertTrue(ics.endswith("END:VCALENDAR\r\n"))
        self.assertIn("VERSION:2.0", ics)
        self.assertIn("BEGIN:VEVENT", ics)
        self.assertIn("UID:abc123@chronotope", ics)
        self.assertIn("DTSTAMP:20260711T120000Z", ics)
        self.assertIn("DTSTART:20260711T080000Z", ics)
        self.assertIn("DTEND:20260711T120000Z", ics)
        self.assertIn("SUMMARY:Test Event", ics)
        self.assertIn("CATEGORIES:market", ics)
        self.assertIn("GEO:52.520000;13.405000", ics)
        self.assertIn("URL:https://example.org/event", ics)
        self.assertIn("X-CHRONOTOPE-CONFIDENCE:scraped", ics)

    def test_text_escaping(self):
        ics = events_to_ics([make_event()], now=NOW)
        self.assertIn("DESCRIPTION:A test\\; with\\, special\\nchars\\nSource: Example", ics)

    def test_rrule_passthrough_strips_prefix(self):
        ics = events_to_ics(
            [make_event(recurrence="RRULE:FREQ=WEEKLY;BYDAY=SA")], now=NOW
        )
        self.assertIn("RRULE:FREQ=WEEKLY;BYDAY=SA", ics)
        self.assertNotIn("RRULE:RRULE:", ics)

    def test_line_folding_at_75_octets(self):
        ics = events_to_ics([make_event(title="X" * 200)], now=NOW)
        for line in ics.split("\r\n"):
            self.assertLessEqual(len(line.encode("utf-8")), 75, f"line too long: {line!r}")
        # Unfolding restores the full title.
        unfolded = ics.replace("\r\n ", "")
        self.assertIn("SUMMARY:" + "X" * 200, unfolded)

    def test_folding_does_not_split_multibyte_chars(self):
        ics = events_to_ics([make_event(title="Ü" * 100)], now=NOW)
        # Would raise UnicodeDecodeError on the way in if splitting were wrong;
        # also verify every physical line is valid UTF-8 under the limit.
        for line in ics.split("\r\n"):
            self.assertLessEqual(len(line.encode("utf-8")), 75)
        unfolded = ics.replace("\r\n ", "")
        self.assertIn("SUMMARY:" + "Ü" * 100, unfolded)

    def test_optional_fields_omitted(self):
        event = make_event(
            category="",
            lat=None,
            lon=None,
            source_url=None,
            source_name=None,
            confidence=None,
            raw_description=None,
        )
        ics = events_to_ics([event], now=NOW)
        self.assertNotIn("CATEGORIES", ics)
        self.assertNotIn("GEO", ics)
        self.assertNotIn("URL", ics)
        self.assertNotIn("DESCRIPTION", ics)
        self.assertNotIn("X-CHRONOTOPE-CONFIDENCE", ics)

    def test_address_and_fuzzy_schedule(self):
        event = make_event(
            address="Boxhagener Platz 1, 10245 Berlin",
            time_precision="approximate",
            schedule_text="mittwochs 18 Uhr, ca. 2x im Monat",
            raw_description=None,
        )
        ics = events_to_ics([event], now=NOW)
        self.assertIn("LOCATION:Boxhagener Platz 1\\, 10245 Berlin", ics)
        self.assertIn("X-CHRONOTOPE-TIME-PRECISION:approximate", ics)
        unfolded = ics.replace("\r\n ", "")
        self.assertIn("DESCRIPTION:Schedule: mittwochs 18 Uhr\\, ca. 2x im Monat", unfolded)

    def test_exact_precision_omits_xprop(self):
        ics = events_to_ics([make_event(time_precision="exact")], now=NOW)
        self.assertNotIn("X-CHRONOTOPE-TIME-PRECISION", ics)

    def test_empty_calendar_is_valid(self):
        ics = events_to_ics([], now=NOW)
        self.assertIn("BEGIN:VCALENDAR", ics)
        self.assertIn("END:VCALENDAR", ics)
        self.assertNotIn("VEVENT", ics)


if __name__ == "__main__":
    unittest.main()
