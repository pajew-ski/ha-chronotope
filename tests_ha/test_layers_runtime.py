"""Set up the integration, enable a layer, let the provider fetch a
synthetic USGS feed through the mocked aiohttp client and read the
result through the store, the WebSocket API and the data view."""

import json
from datetime import datetime, timezone

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.chronotope.const import DATA_FEEDS, DATA_STORE, DOMAIN, OPTION_LAYERS_ENABLED

NOW_MS = int(datetime.now(timezone.utc).timestamp() * 1000)
USGS_FEED = {
    "type": "FeatureCollection",
    "metadata": {"generated": NOW_MS},
    "features": [
        {
            "type": "Feature",
            "id": "us7000test",
            "properties": {"mag": 4.6, "place": "10 km N of Testville", "time": NOW_MS - 600_000, "url": "https://earthquake.usgs.gov/earthquakes/eventpage/us7000test", "title": "M 4.6 - 10 km N of Testville"},
            "geometry": {"type": "Point", "coordinates": [13.4, 52.5, 12.0]},
        }
    ],
}
ADSB_FEED = {"ac": [{"hex": "3c6444", "flight": "DLH4AB ", "lat": 52.5, "lon": 13.4, "alt_baro": 30000, "gs": 400, "track": 90, "t": "A320", "seen_pos": 1}], "now": NOW_MS, "msg": "No error"}


async def _setup(hass, options=None):
    entry = MockConfigEntry(domain=DOMAIN, data={}, options=options or {OPTION_LAYERS_ENABLED: True})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_setup_registers_everything(hass):
    entry = await _setup(hass)
    assert hass.services.has_service(DOMAIN, "add_event")
    manager = hass.data[DOMAIN][DATA_FEEDS]
    assert manager.enabled and manager.providers() == {}
    assert await hass.config_entries.async_unload(entry.entry_id)


async def test_events_layer_fetches_and_stores(hass, aioclient_mock, hass_ws_client):
    aioclient_mock.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", json=USGS_FEED)
    await _setup(hass)
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "chronotope/layers/catalog"})
    catalog = await client.receive_json()
    assert catalog["success"]
    ids = {layer["id"] for layer in catalog["result"]["layers"]}
    assert {"earthquakes", "flights_regional", "aurora", "vessels"} <= ids
    vessels = next(l for l in catalog["result"]["layers"] if l["id"] == "vessels")
    assert vessels["key_set"] is False and "api_key" not in json.dumps(catalog["result"])

    await client.send_json({"id": 2, "type": "chronotope/layers/save", "layer": {"layer_id": "earthquakes", "enabled": True}})
    saved = await client.receive_json()
    assert saved["success"], saved
    await hass.async_block_till_done()

    manager = hass.data[DOMAIN][DATA_FEEDS]
    provider = manager.provider("earthquakes")
    assert provider is not None
    # Drive one cycle directly instead of waiting for the loop.
    await provider._run_once()
    assert aioclient_mock.call_count >= 1  # loop may have fetched already
    assert "ha-chronotope/" in aioclient_mock.mock_calls[0][3]["User-Agent"]

    store = hass.data[DOMAIN][DATA_STORE]
    event = await hass.async_add_executor_job(store.get_event, "feed:usgs:us7000test")
    assert event is not None and event["category"] == "earthquake"
    assert provider.policy.freshness(provider.interval_s) == "fresh"

    await client.send_json({"id": 3, "type": "chronotope/layers/status"})
    status = await client.receive_json()
    assert status["result"]["status"]["earthquakes"]["freshness"] == "fresh"

    await client.send_json({"id": 4, "type": "chronotope/layers/save", "layer": {"layer_id": "earthquakes", "enabled": False}})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert manager.provider("earthquakes") is None


async def test_tracks_layer_data_view(hass, aioclient_mock, hass_client, hass_ws_client):
    aioclient_mock.get("https://api.adsb.lol/v2/lat/52.5200/lon/13.4050/dist/100", json=ADSB_FEED)
    hass.config.latitude = 52.52
    hass.config.longitude = 13.405
    await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "chronotope/layers/save", "layer": {"layer_id": "flights_regional", "enabled": True, "params": {"radius_nm": 100}}})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    provider = hass.data[DOMAIN][DATA_FEEDS].provider("flights_regional")
    await provider._run_once()

    http = await hass_client()
    response = await http.get("/api/chronotope/layers/flights_regional/data")
    assert response.status == 200
    doc = await response.json()
    assert doc["type"] == "FeatureCollection" and doc["meta"]["count"] == 1
    feature = doc["features"][0]
    assert feature["id"] == "adsb:3c6444"
    assert feature["properties"]["label"] == "DLH4AB"
    assert abs(feature["properties"]["alt_m"] - 30000 * 0.3048) < 1
    etag = response.headers["ETag"]
    again = await http.get("/api/chronotope/layers/flights_regional/data", headers={"If-None-Match": etag})
    assert again.status == 304

    # Aggregate sensor exists while the layer runs (I3).
    await hass.async_block_till_done()
    state = hass.states.get("sensor.chronotope_aircraft_nearby")
    assert state is not None and state.state == "1"
    assert state.attributes["nearest_label"] == "DLH4AB"

    # Cache file written (I4: runtime cache outside the repo).
    assert provider.cache_path.exists()


async def test_data_view_requires_auth(hass, hass_client_no_auth):
    await _setup(hass)
    http = await hass_client_no_auth()
    response = await http.get("/api/chronotope/layers/earthquakes/data")
    assert response.status == 401


async def test_blocked_source_pauses(hass, aioclient_mock, hass_ws_client):
    aioclient_mock.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", status=403, text="nope")
    await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "chronotope/layers/save", "layer": {"layer_id": "earthquakes", "enabled": True}})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    provider = hass.data[DOMAIN][DATA_FEEDS].provider("earthquakes")
    await provider._run_once()
    assert provider.policy.freshness(provider.interval_s) == "blocked"
    assert provider.policy.seconds_until_allowed() > 3600


async def test_generic_layer_preview_and_geojson_provider(hass, aioclient_mock, hass_ws_client):
    aioclient_mock.get("https://example.org/points.geojson", json={"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"name": "A"}, "geometry": {"type": "Point", "coordinates": [1, 2]}}]})
    await _setup(hass)
    client = await hass_ws_client(hass)
    layer = {"provider": "geojson_url", "title": "Mine", "url": "https://example.org/points.geojson", "attribution": {"text": "me"}}
    await client.send_json({"id": 1, "type": "chronotope/layers/preview", "layer": layer})
    preview = await client.receive_json()
    assert preview["result"]["ok"] and preview["result"]["count"] == 1
    await client.send_json({"id": 2, "type": "chronotope/layers/preview", "layer": {**layer, "url": "http://insecure/x.json"}})
    assert (await client.receive_json())["result"]["ok"] is False
    await client.send_json({"id": 3, "type": "chronotope/layers/save", "layer": {**preview["result"]["config"], "enabled": True}})
    saved = await client.receive_json()
    assert saved["success"] and saved["result"]["layer"]["id"].startswith("custom_")
    await hass.async_block_till_done()
    provider = hass.data[DOMAIN][DATA_FEEDS].provider(saved["result"]["layer"]["id"])
    assert provider is not None
    await provider._run_once()
    snapshot = provider.snapshot()
    assert snapshot["meta"]["count"] == 1 and snapshot["meta"]["attribution"]["text"] == "me"
