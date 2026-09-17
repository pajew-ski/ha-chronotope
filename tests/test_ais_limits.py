"""AISStream: message throttling, object cap, drop counting, parsing."""

import unittest

from helpers import load_module

_parse = load_module("feeds_parse")


def message(mmsi, lat=54.0, lon=10.0, sog=12.0, cog=45.0):
    return {
        "MessageType": "PositionReport",
        "MetaData": {"MMSI": mmsi, "ShipName": f"SHIP {mmsi} ", "latitude": lat, "longitude": lon, "time_utc": "2026-09-17 12:00:00.123456789 +0000 UTC"},
        "Message": {"PositionReport": {"Cog": cog, "Sog": sog, "TrueHeading": 44, "NavigationalStatus": 0, "Latitude": lat, "Longitude": lon, "UserID": mmsi}},
    }


class AisTestCase(unittest.TestCase):
    def test_parse_position_report(self):
        feature = _parse.parse_ais_message(message(211000001))
        self.assertEqual(feature["id"], "ais:211000001")
        self.assertEqual(feature["properties"]["label"], "SHIP 211000001")
        self.assertEqual(feature["properties"]["kind"], "vessel")
        self.assertAlmostEqual(feature["properties"]["speed_ms"], 12 * 0.514444, places=2)
        self.assertEqual(feature["properties"]["track"], 45.0)
        self.assertEqual(feature["properties"]["ts"], "2026-09-17T12:00:00Z")
        self.assertIsNone(_parse.parse_ais_message({"MessageType": "ShipStaticData"}))
        self.assertIsNone(_parse.parse_ais_message("garbage"))

    def test_rate_limit_drops_and_counts(self):
        clock = {"t": 100.0}
        limiter = _parse.AisLimiter(max_objects=10, max_msgs_per_s=3, now=lambda: clock["t"])
        accepted = [limiter.offer(_parse.parse_ais_message(message(i))) for i in range(5)]
        self.assertEqual(accepted, [True, True, True, False, False])
        self.assertEqual(limiter.dropped_rate, 2)
        clock["t"] += 1.0
        self.assertTrue(limiter.offer(_parse.parse_ais_message(message(99))))

    def test_object_cap(self):
        limiter = _parse.AisLimiter(max_objects=2, max_msgs_per_s=100, now=lambda: 0.0)
        self.assertTrue(limiter.offer(_parse.parse_ais_message(message(1))))
        self.assertTrue(limiter.offer(_parse.parse_ais_message(message(2))))
        self.assertFalse(limiter.offer(_parse.parse_ais_message(message(3))))
        self.assertEqual(limiter.dropped_capacity, 1)
        # Updates to known objects still pass.
        self.assertTrue(limiter.offer(_parse.parse_ais_message(message(1, lat=55.0))))
        self.assertEqual(len(limiter.features()), 2)
