"""Authenticated HTTP views for layer data and WMS legends (6.2, I9)."""

from __future__ import annotations

import gzip
import hashlib
import json
from datetime import datetime, timezone
from urllib.parse import urlencode

from aiohttp import web

from homeassistant.components.http import KEY_HASS, HomeAssistantView
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from ..const import DATA_FEEDS, DATA_STORE, DOMAIN, LAYER_DATA_VIEW_URL, LAYER_LEGEND_VIEW_URL


def sample_raster_url(config: dict) -> str:
    """One representative tile / GetMap request for previews."""
    url = str(config.get("url"))
    params = dict(config.get("params") or {})
    today = datetime.now(timezone.utc).date().isoformat()
    if config.get("provider") == "wms" or config.get("type") == "wms":
        query = {
            "SERVICE": "WMS",
            "REQUEST": "GetMap",
            "VERSION": "1.3.0",
            "LAYERS": params.get("layers", ""),
            "STYLES": params.get("styles", ""),
            "FORMAT": params.get("format", "image/png"),
            "TRANSPARENT": "TRUE" if params.get("transparent", True) else "FALSE",
            "CRS": "EPSG:3857",
            "BBOX": "1000000,6000000,1600000,6600000",
            "WIDTH": "64",
            "HEIGHT": "64",
        }
        if params.get("time") or config.get("time"):
            query["TIME"] = today
        return url + ("&" if "?" in url else "?") + urlencode(query)
    return (
        url.replace("{z}", "5")
        .replace("{x}", "16")
        .replace("{y}", "10")
        .replace("{TileMatrix}", "5")
        .replace("{TileRow}", "10")
        .replace("{TileCol}", "16")
        .replace("{Time}", today)
        .replace("{-y}", "21")
        .replace("{s}", "a")
    )


class ChronotopeLayerDataView(HomeAssistantView):
    url = LAYER_DATA_VIEW_URL
    name = "api:chronotope:layer_data"
    requires_auth = True

    async def get(self, request: web.Request, layer_id: str) -> web.Response:
        hass = request.app[KEY_HASS]
        manager = hass.data.get(DOMAIN, {}).get(DATA_FEEDS)
        if manager is None:
            return web.Response(status=503, text="Chronotope is not set up")
        provider = manager.provider(layer_id)
        if provider is None:
            store = hass.data[DOMAIN].get(DATA_STORE)
            config = await hass.async_add_executor_job(store.get_layer, layer_id) if store else None
            if config is None:
                return web.Response(status=404, text="Unknown layer")
            status = manager.status([config]).get(layer_id, {})
            body = json.dumps(
                {
                    "type": "FeatureCollection",
                    "features": [],
                    "meta": {
                        "layer_id": layer_id,
                        "fetched_at": None,
                        "source_time": None,
                        "freshness": status.get("freshness", "disabled"),
                        "stale_since": None,
                        "attribution": {"text": "", "url": None},
                        "truncated": False,
                        "count": 0,
                        "last_error": status.get("last_error"),
                    },
                }
            ).encode()
            return self._respond(request, body)
        snapshot = provider.snapshot(request.query.get("bbox"), _float(request.query.get("zoom")))
        body = await hass.async_add_executor_job(lambda: json.dumps(snapshot, separators=(",", ":")).encode())
        return self._respond(request, body)

    def _respond(self, request: web.Request, body: bytes) -> web.Response:
        etag = '"' + hashlib.sha1(body).hexdigest()[:20] + '"'  # noqa: S324 - cache key, not security
        headers = {"ETag": etag, "Cache-Control": "no-cache", "Vary": "Accept-Encoding"}
        if request.headers.get("If-None-Match") == etag:
            return web.Response(status=304, headers=headers)
        if "gzip" in request.headers.get("Accept-Encoding", "") and len(body) > 1024:
            body = gzip.compress(body, compresslevel=5)
            headers["Content-Encoding"] = "gzip"
        return web.Response(body=body, content_type="application/geo+json", headers=headers)


class ChronotopeLayerLegendView(HomeAssistantView):
    """Proxy for WMS GetLegendGraphic (keeps the browser off the WMS for
    non-tile requests; images are capped at 1 MB)."""

    url = LAYER_LEGEND_VIEW_URL
    name = "api:chronotope:layer_legend"
    requires_auth = True

    async def get(self, request: web.Request, layer_id: str) -> web.Response:
        hass = request.app[KEY_HASS]
        store = hass.data.get(DOMAIN, {}).get(DATA_STORE)
        manager = hass.data.get(DOMAIN, {}).get(DATA_FEEDS)
        if store is None or manager is None:
            return web.Response(status=503, text="Chronotope is not set up")
        config = await hass.async_add_executor_job(store.get_layer, layer_id)
        raster = None
        if config and config.get("provider") == "wms":
            raster = {"url": config["url"], "params": config.get("params") or {}}
        elif config and config.get("layer_id"):
            from .catalog import CATALOG

            spec = CATALOG.get(config["layer_id"])
            if spec and spec.raster and spec.raster.get("type") == "wms":
                raster = spec.raster
        if raster is None:
            return web.Response(status=404, text="No WMS layer")
        query = {
            "SERVICE": "WMS",
            "REQUEST": "GetLegendGraphic",
            "VERSION": "1.3.0",
            "FORMAT": "image/png",
            "LAYER": raster["params"].get("layers", ""),
        }
        url = raster["url"] + ("&" if "?" in raster["url"] else "?") + urlencode(query)
        session = async_get_clientsession(hass)
        try:
            async with session.get(url, timeout=15, headers={"User-Agent": f"ha-chronotope/{manager.version}"}) as response:
                if response.status != 200:
                    return web.Response(status=502, text=f"Legend upstream HTTP {response.status}")
                content_type = response.headers.get("Content-Type", "image/png")
                if not content_type.startswith("image/"):
                    return web.Response(status=502, text="Legend is not an image")
                body = await response.content.read(1_000_000 + 1)
                if len(body) > 1_000_000:
                    return web.Response(status=502, text="Legend too large")
        except Exception as err:  # noqa: BLE001
            return web.Response(status=502, text=f"Legend fetch failed: {err}")
        return web.Response(body=body, content_type=content_type.split(";")[0], headers={"Cache-Control": "max-age=3600"})


def _float(value: str | None) -> float | None:
    if value is None:
        return None
    try:
        return float(value)
    except ValueError:
        return None
