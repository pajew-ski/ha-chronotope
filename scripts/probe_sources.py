#!/usr/bin/env python3
"""Probe every external endpoint the layer providers use (spec 0.5).

Stdlib only, not part of the CI. Prints status, content type, size and a
schema sample per endpoint so the PR text can carry the measured state.
Endpoints needing a key are skipped unless the key is passed via
environment variables (AISSTREAM_KEY, FIRMS_KEY, GFW_TOKEN, UCDP_TOKEN).

Usage:
    python3 scripts/probe_sources.py [--only usgs,ll2] [--lat 52.52 --lon 13.405]
"""

from __future__ import annotations

import argparse
import gzip
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

UA = "ha-chronotope-probe/0.3 (+https://github.com/pajew-ski/ha-chronotope)"
TIMEOUT = 25
MAX_BODY = 6_000_000


def endpoints(lat: float, lon: float) -> list[tuple[str, str, dict]]:
    today = time.strftime("%Y-%m-%d", time.gmtime())
    now = int(time.time())
    items = [
        ("adsb_lol_point", f"https://api.adsb.lol/v2/lat/{lat}/lon/{lon}/dist/100", {}),
        ("adsb_lol_mil", "https://api.adsb.lol/v2/mil", {}),
        ("opensky_states", f"https://opensky-network.org/api/states/all?lamin={lat-1}&lomin={lon-1}&lamax={lat+1}&lomax={lon+1}", {}),
        ("celestrak_stations", "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json", {}),
        ("usgs_2.5_day", "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", {}),
        ("ll2_upcoming", "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=2&mode=normal", {}),
        ("ll2_previous", "https://ll.thespacedevs.com/2.3.0/launches/previous/?limit=2&mode=normal", {}),
        ("eonet_events", "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&days=30&limit=3", {}),
        ("eonet_geojson", "https://eonet.gsfc.nasa.gov/api/v3/events/geojson?status=open&limit=3", {}),
        ("ucdp_download_page", "https://ucdp.uu.se/downloads/candidateged/", {}),
        ("swpc_aurora", "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json", {}),
        ("swpc_kp", "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json", {}),
        ("onionoo_details", "https://onionoo.torproject.org/details?type=relay&running=true&limit=3&fields=nickname,fingerprint,latitude,longitude,flags,observed_bandwidth,country", {}),
        ("overpass_status", "https://overpass-api.de/api/status", {}),
        ("natural_earth_countries", "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_admin_0_countries.geojson", {}),
        ("natural_earth_regions", "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_1_states_provinces.geojson", {}),
        ("telegeography_cables", "https://www.submarinecablemap.com/api/v3/cable/cable-geo.json", {}),
        ("telegeography_landings", "https://www.submarinecablemap.com/api/v3/landing-point/landing-point-geo.json", {}),
        ("radio_servers", "https://all.api.radio-browser.info/json/servers", {}),
        ("radio_stations", "https://de1.api.radio-browser.info/json/stations/search?has_geo_info=true&hidebroken=true&limit=3", {}),
        ("unhcr_population", "https://api.unhcr.org/population/v1/population/?limit=2&year=2024&coo_all=true&coa_all=true", {}),
        ("ioda_summary", f"https://api.ioda.inetintel.cc.gatech.edu/v2/outages/summary?from={now-86400}&until={now}&entityType=country&limit=3", {}),
        ("dwd_capabilities", "https://maps.dwd.de/geoserver/dwd/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0", {}),
        ("bkg_topplus_capabilities", "https://sgx.geodatenzentrum.de/wms_topplus_open?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0", {}),
        ("gibs_wmts_capabilities", "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/1.0.0/WMTSCapabilities.xml", {}),
        ("gibs_black_marble_tile", f"https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/{today[:4]}-01-01/GoogleMapsCompatible_Level8/3/2/4.png", {}),
        ("esri_imagery_info", "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer?f=pjson", {}),
    ]
    if key := os.environ.get("FIRMS_KEY"):
        items.append(("firms_area", f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{key}/VIIRS_SNPP_NRT/{lon-2:.1f},{lat-2:.1f},{lon+2:.1f},{lat+2:.1f}/1", {}))
    if token := os.environ.get("GFW_TOKEN"):
        items.append(("gfw_events", "https://gateway.api.globalfishingwatch.org/v3/events?datasets[0]=public-global-fishing-events:latest&limit=2&offset=0", {"Authorization": f"Bearer {token}"}))
    if token := os.environ.get("UCDP_TOKEN"):
        items.append(("ucdp_api", "https://ucdpapi.pcr.uu.se/api/gedevents/25.1?pagesize=2&page=0", {"x-ucdp-access-token": token}))
    return items


def sample(body: bytes, content_type: str) -> str:
    text = body[:200_000].decode("utf-8", errors="replace")
    if "json" in content_type or text.lstrip().startswith(("{", "[")):
        try:
            doc = json.loads(body.decode("utf-8", errors="replace"))
        except ValueError:
            return text[:300].replace("\n", " ")
        return json.dumps(shape(doc), ensure_ascii=False)[:1200]
    return text[:400].replace("\n", " ")


def shape(value, depth: int = 0):
    """Schema sample: keys with first-element shapes, values truncated."""
    if depth > 4:
        return "…"
    if isinstance(value, dict):
        return {k: shape(v, depth + 1) for k, v in list(value.items())[:25]}
    if isinstance(value, list):
        return [f"list[{len(value)}]", shape(value[0], depth + 1)] if value else []
    if isinstance(value, str):
        return value[:60]
    return value


def probe(name: str, url: str, headers: dict) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Encoding": "gzip", **headers})
    started = time.time()
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            body = response.read(MAX_BODY)
            if response.headers.get("Content-Encoding") == "gzip":
                body = gzip.decompress(body)
            content_type = response.headers.get("Content-Type", "")
            return {
                "name": name,
                "url": url,
                "status": response.status,
                "content_type": content_type,
                "bytes": len(body),
                "etag": response.headers.get("ETag"),
                "last_modified": response.headers.get("Last-Modified"),
                "ms": int((time.time() - started) * 1000),
                "sample": sample(body, content_type),
            }
    except urllib.error.HTTPError as err:
        body = err.read(2000)
        return {"name": name, "url": url, "status": err.code, "content_type": err.headers.get("Content-Type", ""), "bytes": len(body), "retry_after": err.headers.get("Retry-After"), "sample": body.decode("utf-8", errors="replace")[:300]}
    except Exception as err:  # noqa: BLE001
        return {"name": name, "url": url, "status": None, "error": f"{type(err).__name__}: {err}"}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--only", help="comma-separated endpoint names")
    parser.add_argument("--lat", type=float, default=52.52)
    parser.add_argument("--lon", type=float, default=13.405)
    parser.add_argument("--json", action="store_true", help="machine-readable output")
    args = parser.parse_args()
    only = {n.strip() for n in args.only.split(",")} if args.only else None
    results = []
    for name, url, headers in endpoints(args.lat, args.lon):
        if only and name not in only:
            continue
        result = probe(name, url, headers)
        results.append(result)
        if not args.json:
            status = result.get("status")
            line = f"{name:28} {status if status is not None else 'ERR':>4} {result.get('content_type', '')[:40]:40} {result.get('bytes', 0):>9}B"
            print(line)
            print("    " + (result.get("sample") or result.get("error") or "")[:600])
        time.sleep(1.0)  # politeness between probes
    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
