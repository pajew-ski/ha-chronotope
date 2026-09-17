"""UCDP Candidate: newest file from an HTML list; CSV parsing."""

import unittest

from helpers import load_module

_parse = load_module("feeds_parse")

HTML = """
<ul>
<li><a href="/downloads/candidateged/GEDEvent_v25_0_7.csv">GEDEvent_v25_0_7.csv</a></li>
<li><a href="https://ucdp.uu.se/downloads/candidateged/GEDEvent_v25_0_10.csv">GEDEvent_v25_0_10.csv</a></li>
<li><a href="GEDEvent_v24_0_12.csv">GEDEvent_v24_0_12.csv</a></li>
</ul>
"""

CSV = """id,relid,year,type_of_violence,conflict_name,side_a,side_b,where_description,adm_1,country,latitude,longitude,date_start,date_end,best,high,low
1001,X,2026,1,Government of A - B,Government of A,B,Town,Region,Aland,60.1,19.9,2026-08-01 00:00:00.000,2026-08-02 00:00:00.000,3,5,1
1002,Y,2026,3,C civilians,C,Civilians,,,Bland,95,10,2026-08-01,2026-08-01,1,1,1
1003,Z,2026,2,D - E,D,E,,,Cland,-1.5,30.2,2020-01-01,2020-01-02,10,12,8
"""


class UcdpTestCase(unittest.TestCase):
    def test_newest_version_selected(self):
        found = _parse.discover_ucdp_candidate(HTML)
        self.assertEqual(found["version"], "25.0.10")
        self.assertEqual(found["url"], "https://ucdp.uu.se/downloads/candidateged/GEDEvent_v25_0_10.csv")

    def test_relative_links(self):
        html = '<a href="GEDEvent_v25_0_3.csv">x</a>'
        self.assertEqual(_parse.discover_ucdp_candidate(html)["url"], "https://ucdp.uu.se/downloads/candidateged/GEDEvent_v25_0_3.csv")
        self.assertIsNone(_parse.discover_ucdp_candidate("<p>nothing</p>"))

    def test_csv_rows(self):
        result = _parse.parse_ucdp_csv(CSV)
        events = result["events"]
        self.assertEqual([e["id"] for e in events], ["feed:ucdp:1001", "feed:ucdp:1003"])
        first = events[0]
        self.assertEqual(first["category"], "conflict")
        self.assertEqual(first["title"], "Government of A - B")
        self.assertIn("state-based", first["raw_description"])
        self.assertIn("Government of A vs B", first["raw_description"])
        self.assertIn("3 deaths", first["raw_description"])
        self.assertEqual(first["start_time"], "2026-08-01T00:00:00+00:00")
        self.assertEqual(first["end_time"], "2026-08-03T00:00:00+00:00")

    def test_since_filter(self):
        from datetime import datetime, timezone

        result = _parse.parse_ucdp_csv(CSV, since=datetime(2026, 1, 1, tzinfo=timezone.utc))
        self.assertEqual([e["id"] for e in result["events"]], ["feed:ucdp:1001"])
