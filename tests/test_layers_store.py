"""Layer configuration CRUD, migration and generic-layer validation."""

import sqlite3
import tempfile
import unittest
from pathlib import Path

from helpers import load_module

_store = load_module("store")
EventStore = _store.EventStore
validate_layer_config = _store.validate_layer_config


class LayerStoreTestCase(unittest.TestCase):
    def setUp(self):
        self.store = EventStore(":memory:")

    def tearDown(self):
        self.store.close()

    def test_builtin_layer_roundtrip(self):
        saved = self.store.save_layer(
            {"layer_id": "flights_regional", "enabled": True, "interval_s": 15, "params": {"radius_nm": 80}}
        )
        self.assertEqual(saved["id"], "flights_regional")
        self.assertTrue(saved["enabled"])
        self.assertEqual(saved["params"]["radius_nm"], 80)
        self.assertEqual(saved["opacity"], 1.0)
        listed = self.store.list_layers()
        self.assertEqual([l["id"] for l in listed], ["flights_regional"])
        self.assertEqual(self.store.get_layer("flights_regional")["interval_s"], 15)

    def test_update_and_delete(self):
        self.store.save_layer({"layer_id": "aurora", "enabled": True})
        self.store.save_layer({"layer_id": "aurora", "enabled": False, "opacity": 0.4})
        self.assertFalse(self.store.get_layer("aurora")["enabled"])
        self.assertEqual(self.store.get_layer("aurora")["opacity"], 0.4)
        self.assertTrue(self.store.delete_layer("aurora"))
        self.assertFalse(self.store.delete_layer("aurora"))
        self.assertIsNone(self.store.get_layer("aurora"))

    def test_generic_layer_valid(self):
        saved = self.store.save_layer(
            {
                "provider": "wms",
                "title": "DWD radar",
                "url": "https://maps.dwd.de/geoserver/dwd/wms",
                "params": {"layers": "dwd:Niederschlagsradar"},
                "attribution": {"text": "© DWD", "url": "https://www.dwd.de"},
                "opacity": 0.7,
            }
        )
        self.assertTrue(saved["id"].startswith("custom_"))
        self.assertEqual(saved["attribution"]["text"], "© DWD")
        self.assertEqual(saved["min_zoom"], 0)
        self.assertEqual(saved["max_zoom"], 18)

    def test_generic_requires_https(self):
        with self.assertRaises(ValueError):
            validate_layer_config(
                {"provider": "xyz", "title": "x", "url": "http://a/{z}/{x}/{y}.png", "attribution": {"text": "a"}}
            )

    def test_xyz_requires_placeholders(self):
        with self.assertRaises(ValueError):
            validate_layer_config(
                {"provider": "xyz", "title": "x", "url": "https://a/{z}/{x}.png", "attribution": {"text": "a"}}
            )
        ok = validate_layer_config(
            {"provider": "xyz", "title": "x", "url": "https://a/{z}/{x}/{y}.png", "attribution": {"text": "a"}}
        )
        self.assertEqual(ok["provider"], "xyz")

    def test_wmts_accepts_either_placeholder_style(self):
        for url in (
            "https://a/{TileMatrix}/{TileRow}/{TileCol}.png",
            "https://a/{z}/{y}/{x}.png",
        ):
            validate_layer_config({"provider": "wmts", "title": "x", "url": url, "attribution": {"text": "a"}})
        with self.assertRaises(ValueError):
            validate_layer_config({"provider": "wmts", "title": "x", "url": "https://a/tiles.png", "attribution": {"text": "a"}})

    def test_attribution_required(self):
        with self.assertRaises(ValueError):
            validate_layer_config({"provider": "xyz", "title": "x", "url": "https://a/{z}/{x}/{y}.png"})
        with self.assertRaises(ValueError):
            validate_layer_config(
                {"provider": "xyz", "title": "x", "url": "https://a/{z}/{x}/{y}.png", "attribution": {"text": "  "}}
            )

    def test_wms_requires_layers_param(self):
        with self.assertRaises(ValueError):
            validate_layer_config({"provider": "wms", "title": "x", "url": "https://a/wms", "attribution": {"text": "a"}})

    def test_geojson_url_min_interval(self):
        with self.assertRaises(ValueError):
            validate_layer_config(
                {"provider": "geojson_url", "title": "x", "url": "https://a/x.json", "attribution": {"text": "a"}, "interval_s": 60}
            )
        ok = validate_layer_config(
            {"provider": "geojson_url", "title": "x", "url": "https://a/x.json", "attribution": {"text": "a"}}
        )
        self.assertEqual(ok["interval_s"], 3600)

    def test_unknown_provider_rejected(self):
        with self.assertRaises(ValueError):
            validate_layer_config({"provider": "ftp", "title": "x", "url": "https://a", "attribution": {"text": "a"}})

    def test_bad_layer_id_rejected(self):
        with self.assertRaises(ValueError):
            validate_layer_config({"layer_id": "Flights Regional"})

    def test_opacity_range(self):
        with self.assertRaises(ValueError):
            validate_layer_config({"layer_id": "aurora", "opacity": 1.5})

    def test_migration_adds_layers_table_to_old_db(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = str(Path(tmp) / "old.db")
            conn = sqlite3.connect(path)
            conn.executescript(
                """
                CREATE TABLE events (id TEXT PRIMARY KEY, title TEXT NOT NULL,
                    category TEXT NOT NULL DEFAULT '', lat REAL, lon REAL,
                    start_time TEXT NOT NULL, end_time TEXT NOT NULL, recurrence TEXT,
                    source_url TEXT, source_name TEXT, confidence TEXT, scraped_at TEXT,
                    raw_description TEXT, geometry TEXT);
                """
            )
            conn.commit()
            conn.close()
            store = EventStore(path)
            try:
                store.save_layer({"layer_id": "earthquakes", "enabled": True})
                self.assertEqual(len(store.list_layers()), 1)
                self.assertEqual(store.stats()["layers"], 1)
            finally:
                store.close()

    def test_retention_by_prefix_keeps_favorites(self):
        base = {
            "category": "earthquake",
            "lat": 1.0,
            "lon": 1.0,
            "start_time": "2026-01-01T00:00:00+00:00",
            "end_time": "2026-01-01T01:00:00+00:00",
        }
        self.store.save_event({**base, "id": "feed:usgs:a", "title": "old"})
        self.store.save_event({**base, "id": "feed:usgs:b", "title": "old fav", "favorite": True})
        self.store.save_event({**base, "id": "feed:ll2:c", "title": "other provider"})
        self.store.save_event(
            {**base, "id": "feed:usgs:d", "title": "recent", "end_time": "2026-12-01T00:00:00+00:00"}
        )
        deleted = self.store.delete_events_by_prefix("feed:usgs:", older_than="2026-06-01T00:00:00+00:00")
        self.assertEqual(deleted, 1)
        remaining = sorted(self.store.event_ids_by_prefix("feed:"))
        self.assertEqual(remaining, ["feed:ll2:c", "feed:usgs:b", "feed:usgs:d"])
