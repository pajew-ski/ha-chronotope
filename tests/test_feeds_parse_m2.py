"""Parsers added in M2/M3: EONET, Onionoo, GeoJSON, Radio Browser, FIRMS, GFW."""

import json
import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


class EonetTestCase(unittest.TestCase):
    def test_events_endpoint_multi_point(self):
        doc = {"events": [{
            "id": "EONET_1", "title": "Tropical Storm X", "description": None, "link": "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_1", "closed": None,
            "categories": [{"id": "severeStorms", "title": "Severe Storms"}],
            "sources": [{"id": "NOAA", "url": "https://www.nhc.noaa.gov/"}],
            "geometry": [
                {"date": "2026-09-10T00:00:00Z", "type": "Point", "coordinates": [-40.0, 15.0], "magnitudeValue": 35, "magnitudeUnit": "kts"},
                {"date": "2026-09-11T00:00:00Z", "type": "Point", "coordinates": [-42.0, 16.0]},
            ],
        }]}
        event = _parse.parse_eonet(json.dumps(doc))["events"][0]
        self.assertEqual(event["id"], "feed:eonet:EONET_1")
        self.assertEqual(event["category"], "natural:severeStorms")
        self.assertEqual((event["lon"], event["lat"]), (-42.0, 16.0))
        self.assertEqual(event["geometry"]["type"], "LineString")
        self.assertEqual(len(event["geometry"]["coordinates"]), 2)
        self.assertEqual(event["start_time"], "2026-09-10T00:00:00+00:00")
        self.assertEqual(event["source_url"], "https://www.nhc.noaa.gov/")
        self.assertIn("35 kts", event["raw_description"])

    def test_geojson_variant_and_closed(self):
        doc = {"type": "FeatureCollection", "features": [
            {"type": "Feature", "properties": {"id": "EONET_2", "title": "Fire", "date": "2026-09-01T00:00:00Z", "closed": "2026-09-05T00:00:00Z", "categories": [{"id": "wildfires"}]}, "geometry": {"type": "Point", "coordinates": [10.0, 45.0]}},
        ]}
        event = _parse.parse_eonet(json.dumps(doc))["events"][0]
        self.assertEqual(event["end_time"], "2026-09-05T00:00:00+00:00")
        self.assertIsNone(event["geometry"])
        self.assertIn("closed", event["raw_description"])

    def test_polygon_centroid(self):
        doc = {"events": [{"id": "E3", "title": "Ice", "categories": [{"id": "seaLakeIce"}], "geometry": [{"date": "2026-09-01T00:00:00Z", "type": "Polygon", "coordinates": [[[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]]}]}]}
        event = _parse.parse_eonet(json.dumps(doc))["events"][0]
        self.assertAlmostEqual(event["lon"], 0.8)
        self.assertAlmostEqual(event["lat"], 0.8)


class OnionooTestCase(unittest.TestCase):
    def test_countries_without_coordinates(self):
        # Onionoo 8.0 shape: no latitude/longitude at all.
        doc = {"version": "8.0", "relays_published": "2026-09-17 11:00:00", "relays": [
            {"nickname": "a", "fingerprint": "A1", "flags": ["Running"], "observed_bandwidth": 125_000_000, "country": "de"},
            {"nickname": "b", "fingerprint": "B2", "flags": ["Running"], "observed_bandwidth": 125_000_000, "country": "DE"},
            {"nickname": "c", "fingerprint": "C3", "flags": ["Running"], "observed_bandwidth": 1000, "country": "nl"},
            {"nickname": "d", "fingerprint": "D4", "flags": ["Running"]},
        ], "bridges": []}
        result = _parse.parse_onionoo_countries(json.dumps(doc))
        self.assertEqual(result["values"], {"DE": 2, "NL": 1})
        self.assertEqual(result["extra"]["DE"], {"relays": 2, "bandwidth_gbit": 2.0})
        self.assertEqual(result["skipped"], 1)
        self.assertEqual(result["source_time"], "2026-09-17T11:00:00Z")
        countries = [
            {"type": "Feature", "properties": {"NAME": "Germany", "ISO_A2": "DE", "ISO_A3": "DEU"}, "geometry": {"type": "Polygon", "coordinates": [[[0, 0], [1, 0], [1, 1], [0, 0]]]}},
        ]
        joined = _parse.choropleth_join(countries, result["values"], "tor_relays", extra=result["extra"])
        self.assertEqual(joined["features"][0]["properties"]["detail"]["relays"], 2)
        self.assertEqual(joined["unknown"], ["NL"])
        self.assertEqual(_parse.parse_onionoo(json.dumps(doc))["features"], [])

    def test_relays(self):
        doc = {"version": "10.0", "relays_published": "2026-09-17 11:00:00", "relays": [
            {"nickname": "relay1", "fingerprint": "ABCDEF0123456789", "latitude": 52.5, "longitude": 13.4, "flags": ["Fast", "Guard"], "observed_bandwidth": 12500000, "country": "de"},
            {"nickname": "nogeo", "fingerprint": "FFFF", "flags": []},
        ], "bridges": []}
        result = _parse.parse_onionoo(json.dumps(doc))
        self.assertEqual(len(result["features"]), 1)
        props = result["features"][0]["properties"]
        self.assertEqual(props["label"], "relay1")
        self.assertEqual(props["detail"]["bandwidth_mbit"], 100.0)
        self.assertEqual(props["detail"]["flags"], "Fast, Guard")
        self.assertEqual(props["ts"], "2026-09-17T11:00:00Z")


class GeoJsonFeaturesTestCase(unittest.TestCase):
    def test_cables_and_labels(self):
        doc = {"type": "FeatureCollection", "features": [
            {"type": "Feature", "properties": {"id": "tat-14", "name": "TAT-14", "color": "#ff0000"}, "geometry": {"type": "MultiLineString", "coordinates": [[[-70, 40], [-10, 50]]]}},
            {"type": "Feature", "properties": {}, "geometry": {"type": "Point", "coordinates": [500, 0]}},
            {"type": "Feature", "properties": {"name": "no geometry"}, "geometry": None},
        ]}
        result = _parse.parse_geojson_features(json.dumps(doc), "cable", "cable")
        self.assertEqual(len(result["features"]), 1)
        feature = result["features"][0]
        self.assertEqual(feature["id"], "cable:tat-14")
        self.assertEqual(feature["properties"]["label"], "TAT-14")
        self.assertEqual(feature["properties"]["color"], "#ff0000")
        self.assertEqual(feature["geometry"]["type"], "MultiLineString")

    def test_single_feature_document(self):
        doc = {"type": "Feature", "properties": {"title": "Home"}, "geometry": {"type": "Point", "coordinates": [1, 2]}}
        result = _parse.parse_geojson_features(json.dumps(doc), "custom", "custom")
        self.assertEqual(result["features"][0]["properties"]["label"], "Home")

    def test_budget(self):
        doc = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {}, "geometry": {"type": "Point", "coordinates": [i, 0]}} for i in range(5)]}
        result = _parse.parse_geojson_features(json.dumps(doc), "x", "x", max_features=2)
        self.assertEqual(len(result["features"]), 2)
        self.assertTrue(result["truncated"])


class RadioBrowserTestCase(unittest.TestCase):
    def test_servers_and_stations(self):
        hosts = _parse.parse_radio_servers(json.dumps([{"ip": "1.2.3.4", "name": "de1.api.radio-browser.info"}, {"ip": "::1", "name": "de1.api.radio-browser.info"}, {"ip": "5.6.7.8", "name": "at1.api.radio-browser.info"}]))
        self.assertEqual(hosts, ["at1.api.radio-browser.info", "de1.api.radio-browser.info"])
        stations = [
            {"stationuuid": "u1", "name": "Radio One", "url_resolved": "https://stream.example/one", "homepage": "javascript:alert(1)", "countrycode": "DE", "geo_lat": 52.5, "geo_long": 13.4, "bitrate": 128, "codec": "MP3", "tags": "pop,rock", "votes": 3},
            {"stationuuid": "u2", "name": "Null Island", "geo_lat": 0, "geo_long": 0},
            {"stationuuid": "u3", "name": "No geo"},
        ]
        result = _parse.parse_radio_browser(json.dumps(stations))
        self.assertEqual([f["id"] for f in result["features"]], ["radio:u1"])
        detail = result["features"][0]["properties"]["detail"]
        self.assertEqual(detail["stream"], "https://stream.example/one")
        self.assertNotIn("homepage", detail)


class FirmsGfwTestCase(unittest.TestCase):
    def test_firms_csv(self):
        csv_text = "latitude,longitude,bright_ti4,scan,track,acq_date,acq_time,satellite,instrument,confidence,version,bright_ti5,frp,daynight\n" \
                   "48.5,11.2,330.1,0.4,0.4,2026-09-17,0130,N,VIIRS,n,2.0NRT,290.0,5.3,N\n" \
                   "95,11.2,330.1,0.4,0.4,2026-09-17,0130,N,VIIRS,n,2.0NRT,290.0,5.3,N\n"
        result = _parse.parse_firms_csv(csv_text)
        self.assertEqual(len(result["events"]), 1)
        event = result["events"][0]
        self.assertEqual(event["category"], "fire")
        self.assertEqual(event["start_time"], "2026-09-17T01:30:00+00:00")
        self.assertEqual(event["end_time"], "2026-09-17T13:30:00+00:00")
        self.assertIn("FRP 5.3 MW", event["raw_description"])
        with self.assertRaises(_parse.ParseError):
            _parse.parse_firms_csv("Invalid MAP_KEY.")

    def test_gfw_events(self):
        doc = {"total": 1, "nextOffset": None, "entries": [
            {"id": "ev1", "type": "fishing", "start": "2026-09-10T01:00:00Z", "end": "2026-09-10T05:00:00Z", "position": {"lat": 55.0, "lon": 3.0}, "vessel": {"id": "v1", "name": "Trawler", "flag": "NLD", "type": "fishing"}},
            {"id": "ev2", "type": "fishing", "start": "2026-09-10T01:00:00Z", "end": "2026-09-10T05:00:00Z", "position": {"lat": -30.0, "lon": 100.0}, "vessel": {}},
        ]}
        result = _parse.parse_gfw_events(json.dumps(doc), bbox=(0, 50, 10, 60))
        self.assertEqual([e["id"] for e in result["events"]], ["feed:gfw:ev1"])
        self.assertEqual(result["events"][0]["title"], "Trawler")
        self.assertEqual(result["events"][0]["raw_description"], "fishing, NLD, fishing")
