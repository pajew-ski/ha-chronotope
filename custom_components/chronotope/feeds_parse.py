"""HA-free parsers for feed providers (spec section 4, invariant I1).

Every parser is a pure function ``bytes|str -> dict`` that normalizes an
upstream payload into the GeoJSON profile of section 5.3 (``features``),
into store events (``events``, section 5.4), into a ``grid`` or into an
``omm`` list. No network, no Home Assistant, only stdlib.

Return shape (data layers)::

    {"features": [...], "source_time": iso|None, "truncated": bool}

Return shape (event layers)::

    {"events": [...store event dicts...], "source_time": iso|None, "truncated": bool}
"""

from __future__ import annotations

import csv
import io
import json
import math
import re
from datetime import datetime, timedelta, timezone
from typing import Any, Callable, Iterable

FT_TO_M = 0.3048
KN_TO_MS = 0.514444
NM_TO_KM = 1.852

FEATURE_REQUIRED_PROPS = ("label", "kind", "ts")


class ParseError(ValueError):
    """Upstream payload is not what the parser expects."""


# ------------------------------------------------------------------ helpers


def _loads(raw: bytes | str) -> Any:
    if isinstance(raw, (bytes, bytearray)):
        raw = raw.decode("utf-8", errors="replace")
    try:
        return json.loads(raw)
    except ValueError as err:
        raise ParseError(f"invalid JSON: {err}") from err


def _text(raw: bytes | str) -> str:
    if isinstance(raw, (bytes, bytearray)):
        return raw.decode("utf-8", errors="replace")
    return raw


def _num(value: Any) -> float | None:
    if value is None or value == "":
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if math.isnan(number) or math.isinf(number):
        return None
    return number


def _iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def iso_from_epoch(seconds: float | None) -> str | None:
    if seconds is None:
        return None
    return _iso(datetime.fromtimestamp(seconds, tz=timezone.utc))


def parse_iso(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    text = value.strip().replace("Z", "+00:00")
    if " " in text and "T" not in text:
        text = text.replace(" ", "T", 1)
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _valid_lonlat(lon: float | None, lat: float | None) -> bool:
    return (
        lon is not None
        and lat is not None
        and -180 <= lon <= 180
        and -90 <= lat <= 90
    )


def _clean(value: Any) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def make_feature(
    feature_id: str,
    lon: float,
    lat: float,
    label: str,
    kind: str,
    ts: str | None,
    alt_m: float | None = None,
    detail: dict[str, Any] | None = None,
    geometry: dict[str, Any] | None = None,
    **props: Any,
) -> dict[str, Any]:
    """Build one feature of the 5.3 profile (lon, lat[, alt] order)."""
    if geometry is None:
        coords: list[float] = [round(lon, 6), round(lat, 6)]
        if alt_m is not None:
            coords.append(round(alt_m, 1))
        geometry = {"type": "Point", "coordinates": coords}
    properties: dict[str, Any] = {
        "label": label,
        "kind": kind,
        "ts": ts,
        "detail": {k: v for k, v in (detail or {}).items() if v is not None},
    }
    if alt_m is not None:
        properties["alt_m"] = round(alt_m, 1)
    for key, value in props.items():
        if value is not None:
            properties[key] = value
    return {"type": "Feature", "id": feature_id, "geometry": geometry, "properties": properties}


def validate_feature_collection(doc: Any) -> list[str]:
    """Validate a data-layer response against the 5.3 profile.

    Returns a list of problems (empty when valid). Used by tests and by the
    HTTP view in debug mode; providers are expected to produce valid output.
    """
    problems: list[str] = []
    if not isinstance(doc, dict):
        return ["document must be an object"]
    meta = doc.get("meta")
    if not isinstance(meta, dict):
        problems.append("meta is required")
    else:
        for key in ("layer_id", "fetched_at", "freshness", "attribution", "count"):
            if key not in meta:
                problems.append(f"meta.{key} is required")
        attribution = meta.get("attribution")
        if not isinstance(attribution, dict) or not attribution.get("text"):
            problems.append("meta.attribution.text is required")
    if "grid" in doc:
        problems.extend(validate_grid(doc["grid"]))
        return problems
    if "omm" in doc:
        if not isinstance(doc["omm"], list):
            problems.append("omm must be a list")
        return problems
    if doc.get("type") != "FeatureCollection":
        problems.append("type must be FeatureCollection")
    features = doc.get("features")
    if not isinstance(features, list):
        return problems + ["features must be a list"]
    for index, feature in enumerate(features):
        prefix = f"features[{index}]"
        if not isinstance(feature, dict) or feature.get("type") != "Feature":
            problems.append(f"{prefix}: not a Feature")
            continue
        if not feature.get("id"):
            problems.append(f"{prefix}: id is required")
        geometry = feature.get("geometry")
        if not isinstance(geometry, dict) or "type" not in geometry:
            problems.append(f"{prefix}: geometry is required")
        else:
            problems.extend(f"{prefix}: {p}" for p in _validate_geometry(geometry))
        props = feature.get("properties")
        if not isinstance(props, dict):
            problems.append(f"{prefix}: properties is required")
            continue
        for key in FEATURE_REQUIRED_PROPS:
            if key not in props:
                problems.append(f"{prefix}: properties.{key} is required")
        if "detail" in props and not isinstance(props["detail"], dict):
            problems.append(f"{prefix}: properties.detail must be an object")
    return problems


def _validate_geometry(geometry: dict[str, Any]) -> list[str]:
    kind = geometry.get("type")
    coords = geometry.get("coordinates")

    def check_position(pos: Any) -> str | None:
        if not isinstance(pos, (list, tuple)) or len(pos) < 2 or len(pos) > 3:
            return "position must be [lon, lat] or [lon, lat, alt]"
        lon, lat = _num(pos[0]), _num(pos[1])
        if not _valid_lonlat(lon, lat):
            return f"position out of range or not lon/lat ordered: {pos}"
        return None

    def walk(value: Any, depth: int) -> list[str]:
        if depth == 0:
            problem = check_position(value)
            return [problem] if problem else []
        if not isinstance(value, list):
            return ["coordinates nesting is wrong"]
        out: list[str] = []
        for item in value:
            out.extend(walk(item, depth - 1))
            if len(out) > 3:
                break
        return out

    depth = {"Point": 0, "LineString": 1, "MultiPoint": 1, "Polygon": 2, "MultiLineString": 2, "MultiPolygon": 3}
    if kind == "GeometryCollection":
        return [p for g in geometry.get("geometries", []) for p in _validate_geometry(g)]
    if kind not in depth:
        return [f"unsupported geometry type {kind!r}"]
    return walk(coords, depth[kind])


def validate_grid(grid: Any) -> list[str]:
    problems: list[str] = []
    if not isinstance(grid, dict):
        return ["grid must be an object"]
    for key in ("lon0", "lat0", "dlon", "dlat", "nx", "ny", "values"):
        if key not in grid:
            problems.append(f"grid.{key} is required")
    if problems:
        return problems
    values = grid["values"]
    if not isinstance(values, list) or len(values) != grid["nx"] * grid["ny"]:
        problems.append("grid.values length must equal nx*ny")
    if not -180 <= grid["lon0"] < 180:
        problems.append("grid.lon0 must be within -180..179")
    return problems


def bbox_filter(
    features: Iterable[dict[str, Any]], bbox: tuple[float, float, float, float] | None
) -> list[dict[str, Any]]:
    """Keep features whose geometry touches bbox (minLon, minLat, maxLon, maxLat)."""
    if bbox is None:
        return list(features)
    min_lon, min_lat, max_lon, max_lat = bbox
    out: list[dict[str, Any]] = []
    for feature in features:
        box = geometry_bbox(feature.get("geometry"))
        if box is None:
            continue
        if box[2] < min_lon or box[0] > max_lon or box[3] < min_lat or box[1] > max_lat:
            continue
        out.append(feature)
    return out


def geometry_bbox(geometry: Any) -> tuple[float, float, float, float] | None:
    positions: list[list[float]] = []

    def collect(value: Any) -> None:
        if isinstance(value, (list, tuple)) and value and isinstance(value[0], (int, float)):
            positions.append([float(value[0]), float(value[1])])
        elif isinstance(value, (list, tuple)):
            for item in value:
                collect(item)

    if not isinstance(geometry, dict):
        return None
    if geometry.get("type") == "GeometryCollection":
        for sub in geometry.get("geometries", []):
            collect(sub.get("coordinates"))
    else:
        collect(geometry.get("coordinates"))
    if not positions:
        return None
    lons = [p[0] for p in positions]
    lats = [p[1] for p in positions]
    return (min(lons), min(lats), max(lons), max(lats))


def parse_bbox(value: str | None) -> tuple[float, float, float, float] | None:
    if not value:
        return None
    parts = [ _num(p) for p in str(value).split(",") ]
    if len(parts) != 4 or any(p is None for p in parts):
        raise ValueError("bbox must be minLon,minLat,maxLon,maxLat")
    min_lon, min_lat, max_lon, max_lat = parts  # type: ignore[misc]
    if min_lon >= max_lon or min_lat >= max_lat:
        raise ValueError("bbox must be ordered")
    return (max(-180.0, min_lon), max(-90.0, min_lat), min(180.0, max_lon), min(90.0, max_lat))


def _truncate(items: list[Any], max_features: int | None) -> tuple[list[Any], bool]:
    if max_features is not None and len(items) > max_features:
        return items[:max_features], True
    return items, False


# ------------------------------------------------------------ adsb.lol (8.1)


def parse_adsb(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    """adsb.lol v2 (readsb ``aircraft.json`` shape): ``{"ac": [...], "now": ms}``."""
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("ac"), list):
        raise ParseError("adsb.lol payload lacks 'ac' list")
    now_ms = _num(doc.get("now"))
    now_s = now_ms / 1000.0 if now_ms else None
    features: list[dict[str, Any]] = []
    for ac in doc["ac"]:
        if not isinstance(ac, dict):
            continue
        lat, lon = _num(ac.get("lat")), _num(ac.get("lon"))
        if not _valid_lonlat(lon, lat):
            continue
        hexid = _clean(ac.get("hex")) or ""
        if not hexid:
            continue
        alt_raw = ac.get("alt_baro")
        on_ground = alt_raw == "ground"
        alt_m = 0.0 if on_ground else (_num(alt_raw) * FT_TO_M if _num(alt_raw) is not None else None)
        gs = _num(ac.get("gs"))
        seen_pos = _num(ac.get("seen_pos")) or 0.0
        ts = iso_from_epoch(now_s - seen_pos) if now_s is not None else None
        label = _clean(ac.get("flight")) or hexid.upper()
        features.append(
            make_feature(
                f"adsb:{hexid}",
                lon,
                lat,
                label,
                "aircraft",
                ts,
                alt_m=alt_m,
                track=_num(ac.get("track")),
                speed_ms=round(gs * KN_TO_MS, 1) if gs is not None else None,
                detail={
                    "icao24": hexid,
                    "registration": _clean(ac.get("r")),
                    "type": _clean(ac.get("t")),
                    "squawk": _clean(ac.get("squawk")),
                    "category": _clean(ac.get("category")),
                    "on_ground": True if on_ground else None,
                    "vertical_rate_fpm": _num(ac.get("baro_rate")),
                    "military": True if (int(_num(ac.get("dbFlags")) or 0) & 1) else None,
                },
            )
        )
    features, truncated = _truncate(features, max_features)
    return {"features": features, "source_time": iso_from_epoch(now_s), "truncated": truncated}


# -------------------------------------------------------------- OpenSky (8.1)

_OS_ICAO, _OS_CALLSIGN, _OS_COUNTRY, _OS_TIME_POS, _OS_LAST, _OS_LON, _OS_LAT, _OS_BARO = range(8)
_OS_GROUND, _OS_VEL, _OS_TRACK, _OS_VRATE, _OS_SENSORS, _OS_GEO_ALT, _OS_SQUAWK = range(8, 15)


def parse_opensky(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    """OpenSky ``/states/all``: state vectors as positional arrays."""
    doc = _loads(raw)
    if not isinstance(doc, dict):
        raise ParseError("OpenSky payload is not an object")
    states = doc.get("states") or []
    features: list[dict[str, Any]] = []
    for state in states:
        if not isinstance(state, list) or len(state) < 12:
            continue
        lon, lat = _num(state[_OS_LON]), _num(state[_OS_LAT])
        if not _valid_lonlat(lon, lat):
            continue
        icao = _clean(state[_OS_ICAO]) or ""
        if not icao:
            continue
        on_ground = bool(state[_OS_GROUND])
        alt = _num(state[_OS_BARO])
        features.append(
            make_feature(
                f"opensky:{icao}",
                lon,
                lat,
                _clean(state[_OS_CALLSIGN]) or icao.upper(),
                "aircraft",
                iso_from_epoch(_num(state[_OS_TIME_POS]) or _num(state[_OS_LAST])),
                alt_m=0.0 if on_ground else alt,
                track=_num(state[_OS_TRACK]),
                speed_ms=_num(state[_OS_VEL]),
                detail={
                    "icao24": icao,
                    "origin_country": _clean(state[_OS_COUNTRY]),
                    "on_ground": True if on_ground else None,
                    "vertical_rate_ms": _num(state[_OS_VRATE]),
                    "squawk": _clean(state[_OS_SQUAWK]) if len(state) > _OS_SQUAWK else None,
                },
            )
        )
    features, truncated = _truncate(features, max_features)
    return {"features": features, "source_time": iso_from_epoch(_num(doc.get("time"))), "truncated": truncated}


# ------------------------------------------------------------ CelesTrak (8.1)

OMM_REQUIRED = (
    "OBJECT_NAME",
    "EPOCH",
    "MEAN_MOTION",
    "ECCENTRICITY",
    "INCLINATION",
    "RA_OF_ASC_NODE",
    "ARG_OF_PERICENTER",
    "MEAN_ANOMALY",
    "NORAD_CAT_ID",
)
_OMM_OPTIONAL_DEFAULTS = {"BSTAR": 0.0, "MEAN_MOTION_DOT": 0.0, "MEAN_MOTION_DDOT": 0.0, "EPHEMERIS_TYPE": 0}


def parse_celestrak_omm(raw: bytes | str, max_objects: int | None = None) -> dict[str, Any]:
    """CelesTrak GP JSON (OMM). Objects are passed through for browser-side
    propagation; only required fields are checked and numeric fields coerced."""
    doc = _loads(raw)
    if not isinstance(doc, list):
        raise ParseError("CelesTrak payload is not a list of OMM objects")
    omm: list[dict[str, Any]] = []
    for entry in doc:
        if not isinstance(entry, dict) or any(entry.get(k) in (None, "") for k in OMM_REQUIRED):
            continue
        cleaned: dict[str, Any] = {}
        for key in OMM_REQUIRED:
            cleaned[key] = entry[key]
        for key, default in _OMM_OPTIONAL_DEFAULTS.items():
            cleaned[key] = entry.get(key, default)
        for key in ("OBJECT_ID", "CLASSIFICATION_TYPE", "ELEMENT_SET_NO", "REV_AT_EPOCH"):
            if key in entry:
                cleaned[key] = entry[key]
        for key in ("MEAN_MOTION", "ECCENTRICITY", "INCLINATION", "RA_OF_ASC_NODE",
                    "ARG_OF_PERICENTER", "MEAN_ANOMALY", "BSTAR", "MEAN_MOTION_DOT", "MEAN_MOTION_DDOT"):
            number = _num(cleaned.get(key))
            if number is None:
                cleaned = {}
                break
            cleaned[key] = number
        if not cleaned:
            continue
        try:
            cleaned["NORAD_CAT_ID"] = int(cleaned["NORAD_CAT_ID"])
        except (TypeError, ValueError):
            continue
        cleaned["OBJECT_NAME"] = str(cleaned["OBJECT_NAME"]).strip()
        omm.append(cleaned)
    omm, truncated = _truncate(omm, max_objects)
    epochs = [parse_iso(o["EPOCH"]) for o in omm]
    epochs = [e for e in epochs if e is not None]
    return {"omm": omm, "source_time": _iso(max(epochs)) if epochs else None, "truncated": truncated}


def celestrak_not_updated(status: int, body: bytes | str) -> bool:
    """CelesTrak answers 403 with a hint when the data has not changed since
    the last download; that is success without new data, not a block."""
    if status != 403:
        return False
    text = _text(body).lower()
    return "not updated" in text or "already downloaded" in text or "has not been updated" in text


# ----------------------------------------------------------------- USGS (8.2)


def parse_usgs(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    """USGS GeoJSON summary feed -> store events (category ``earthquake``)."""
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("features"), list):
        raise ParseError("USGS payload is not a FeatureCollection")
    events: list[dict[str, Any]] = []
    for feature in doc["features"]:
        props = feature.get("properties") or {}
        geometry = feature.get("geometry") or {}
        coords = geometry.get("coordinates") or []
        if len(coords) < 2:
            continue
        lon, lat = _num(coords[0]), _num(coords[1])
        if not _valid_lonlat(lon, lat):
            continue
        ext_id = _clean(feature.get("id")) or _clean(props.get("code"))
        time_ms = _num(props.get("time"))
        if not ext_id or time_ms is None:
            continue
        start = datetime.fromtimestamp(time_ms / 1000.0, tz=timezone.utc)
        mag = _num(props.get("mag"))
        depth = _num(coords[2]) if len(coords) > 2 else None
        place = _clean(props.get("place")) or "unknown location"
        mag_text = f"M{mag:.1f}" if mag is not None else "M?"
        depth_text = f", depth {depth:.0f} km" if depth is not None else ""
        events.append(
            {
                "id": f"feed:usgs:{ext_id}",
                "title": _clean(props.get("title")) or f"{mag_text} {place}",
                "category": "earthquake",
                "lat": lat,
                "lon": lon,
                "start_time": start.isoformat(),
                "end_time": (start + timedelta(hours=1)).isoformat(),
                "source_name": "USGS",
                "source_url": _clean(props.get("url")),
                "confidence": "scraped",
                "raw_description": f"{mag_text} {place}{depth_text}",
                "geometry": None,
            }
        )
    events, truncated = _truncate(events, max_features)
    generated = _num((doc.get("metadata") or {}).get("generated"))
    return {
        "events": events,
        "source_time": iso_from_epoch(generated / 1000.0) if generated else None,
        "truncated": truncated,
    }


# ------------------------------------------------------ Launch Library 2 (8.2)


def parse_ll2(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    """Launch Library 2 ``launches/upcoming|previous`` -> events (``launch``)."""
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("results"), list):
        raise ParseError("LL2 payload lacks 'results'")
    events: list[dict[str, Any]] = []
    for launch in doc["results"]:
        if not isinstance(launch, dict):
            continue
        pad = launch.get("pad") or {}
        lat, lon = _num(pad.get("latitude")), _num(pad.get("longitude"))
        if not _valid_lonlat(lon, lat):
            continue
        ext_id = _clean(launch.get("id"))
        net = parse_iso(launch.get("net"))
        if not ext_id or net is None:
            continue
        window_end = parse_iso(launch.get("window_end"))
        end = max(net + timedelta(hours=2), window_end) if window_end else net + timedelta(hours=2)
        mission = launch.get("mission") or {}
        rocket = ((launch.get("rocket") or {}).get("configuration") or {})
        provider = (launch.get("launch_service_provider") or {}).get("name")
        status = (launch.get("status") or {}).get("name")
        title = _clean(mission.get("name")) or _clean(launch.get("name")) or "Launch"
        description = ", ".join(
            part for part in (
                _clean(rocket.get("full_name")) or _clean(rocket.get("name")),
                _clean(provider),
                _clean(status),
                _clean((pad.get("location") or {}).get("name")),
            ) if part
        )
        events.append(
            {
                "id": f"feed:ll2:{ext_id}",
                "title": title,
                "category": "launch",
                "lat": lat,
                "lon": lon,
                "start_time": net.isoformat(),
                "end_time": end.isoformat(),
                "source_name": "Launch Library 2",
                "source_url": _clean(launch.get("url")) or (
                    f"https://spacelaunchnow.me/launch/{launch['slug']}" if launch.get("slug") else None
                ),
                "confidence": "scraped",
                "raw_description": description or None,
                "address": _clean(pad.get("name")),
                "geometry": None,
            }
        )
    events, truncated = _truncate(events, max_features)
    return {"events": events, "source_time": None, "truncated": truncated}


# ---------------------------------------------------------------- EONET (8.2)


def parse_eonet(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    """NASA EONET v3: ``/events`` (geometry list per event) or the GeoJSON
    variant (one feature per geometry). Last point -> lat/lon; the full
    sequence becomes a LineString when there is more than one point."""
    doc = _loads(raw)
    grouped: dict[str, dict[str, Any]] = {}
    if isinstance(doc, dict) and isinstance(doc.get("events"), list):
        for event in doc["events"]:
            if not isinstance(event, dict) or not event.get("id"):
                continue
            entry = grouped.setdefault(event["id"], {"props": event, "points": []})
            for geom in event.get("geometry") or []:
                _eonet_collect(entry, geom.get("date"), geom.get("type"), geom.get("coordinates"))
                if geom.get("magnitudeValue") is not None:
                    entry["magnitude"] = (geom.get("magnitudeValue"), geom.get("magnitudeUnit"))
    elif isinstance(doc, dict) and isinstance(doc.get("features"), list):
        for feature in doc["features"]:
            props = feature.get("properties") or {}
            if not props.get("id"):
                continue
            entry = grouped.setdefault(props["id"], {"props": props, "points": []})
            geom = feature.get("geometry") or {}
            _eonet_collect(entry, props.get("date"), geom.get("type"), geom.get("coordinates"))
    else:
        raise ParseError("EONET payload has neither 'events' nor 'features'")

    events: list[dict[str, Any]] = []
    for ext_id, entry in grouped.items():
        points = sorted(entry["points"], key=lambda p: p[0] or "")
        if not points:
            continue
        props = entry["props"]
        first_date = parse_iso(points[0][0]) or datetime.now(timezone.utc)
        last_date = parse_iso(points[-1][0]) or first_date
        closed = parse_iso(props.get("closed"))
        lon, lat = points[-1][1], points[-1][2]
        categories = props.get("categories") or []
        category_id = (
            _clean(categories[0].get("id")) if categories and isinstance(categories[0], dict) else None
        ) or "event"
        end = closed if closed else max(last_date, datetime.now(timezone.utc)) + timedelta(hours=1)
        geometry = None
        if len(points) > 1:
            geometry = {"type": "LineString", "coordinates": [[p[1], p[2]] for p in points]}
        magnitude = None
        if props.get("magnitudeValue") is not None:
            magnitude = f"{props['magnitudeValue']} {props.get('magnitudeUnit') or ''}".strip()
        elif entry.get("magnitude"):
            value, unit = entry["magnitude"]
            magnitude = f"{value} {unit or ''}".strip()
        sources = props.get("sources") or []
        source_url = None
        if sources and isinstance(sources[0], dict):
            source_url = _clean(sources[0].get("url"))
        events.append(
            {
                "id": f"feed:eonet:{ext_id}",
                "title": _clean(props.get("title")) or ext_id,
                "category": f"natural:{category_id}",
                "lat": lat,
                "lon": lon,
                "start_time": first_date.isoformat(),
                "end_time": max(end, first_date).isoformat(),
                "source_name": "NASA EONET",
                "source_url": source_url or _clean(props.get("link")),
                "confidence": "scraped",
                "raw_description": ", ".join(p for p in (_clean(props.get("description")), magnitude, "closed" if closed else None) if p) or None,
                "geometry": geometry,
            }
        )
    events, truncated = _truncate(events, max_features)
    return {"events": events, "source_time": None, "truncated": truncated}


def _eonet_collect(entry: dict[str, Any], date: Any, gtype: Any, coords: Any) -> None:
    if gtype == "Point" and isinstance(coords, list) and len(coords) >= 2:
        lon, lat = _num(coords[0]), _num(coords[1])
        if _valid_lonlat(lon, lat):
            entry["points"].append((date, lon, lat))
    elif gtype == "Polygon" and isinstance(coords, list) and coords and coords[0]:
        ring = [(_num(p[0]), _num(p[1])) for p in coords[0] if isinstance(p, list) and len(p) >= 2]
        ring = [(lon, lat) for lon, lat in ring if _valid_lonlat(lon, lat)]
        if ring:
            lon = sum(p[0] for p in ring) / len(ring)
            lat = sum(p[1] for p in ring) / len(ring)
            entry["points"].append((date, lon, lat))


# ----------------------------------------------------------------- UCDP (8.2)

_UCDP_CANDIDATE_RE = re.compile(r"(GEDEvent_v(\d+)_(\d+)_(\d+)\.csv)", re.IGNORECASE)
_UCDP_VIOLENCE = {"1": "state-based", "2": "non-state", "3": "one-sided"}


def discover_ucdp_candidate(html: bytes | str, base_url: str = "https://ucdp.uu.se/downloads/candidateged/") -> dict[str, Any] | None:
    """Pick the newest ``GEDEvent_v<yy>_<0>_<m>.csv`` link from the download page."""
    text = _text(html)
    best: tuple[tuple[int, int, int], str] | None = None
    for match in _UCDP_CANDIDATE_RE.finditer(text):
        version = (int(match.group(2)), int(match.group(3)), int(match.group(4)))
        if best is None or version > best[0]:
            best = (version, match.group(1))
    if best is None:
        return None
    filename = best[1]
    href_match = re.search(r'href=["\']([^"\']*' + re.escape(filename) + r')["\']', text, re.IGNORECASE)
    href = href_match.group(1) if href_match else filename
    if href.startswith("//"):
        url = "https:" + href
    elif href.startswith("http"):
        url = href
    elif href.startswith("/"):
        url = "https://ucdp.uu.se" + href
    else:
        url = base_url.rstrip("/") + "/" + href
    return {"version": ".".join(str(v) for v in best[0]), "filename": filename, "url": url}


def parse_ucdp_csv(raw: bytes | str, max_features: int | None = None, since: datetime | None = None) -> dict[str, Any]:
    """UCDP GED Candidate CSV -> events (``conflict``)."""
    reader = csv.DictReader(io.StringIO(_text(raw)))
    events: list[dict[str, Any]] = []
    for row in reader:
        events_row = _ucdp_row(row, since)
        if events_row:
            events.append(events_row)
    events, truncated = _truncate(events, max_features)
    return {"events": events, "source_time": None, "truncated": truncated}


def parse_ucdp_api(raw: bytes | str, max_features: int | None = None, since: datetime | None = None) -> dict[str, Any]:
    """UCDP API ``gedevents/<version>`` page -> events; same fields as CSV."""
    doc = _loads(raw)
    if not isinstance(doc, dict):
        raise ParseError("UCDP API payload is not an object")
    rows = doc.get("Result") or doc.get("result") or []
    events = [ev for ev in (_ucdp_row(row, since) for row in rows if isinstance(row, dict)) if ev]
    events, truncated = _truncate(events, max_features)
    return {
        "events": events,
        "source_time": None,
        "truncated": truncated,
        "next_page": doc.get("NextPageUrl") or None,
    }


def _ucdp_row(row: dict[str, Any], since: datetime | None) -> dict[str, Any] | None:
    lat, lon = _num(row.get("latitude")), _num(row.get("longitude"))
    ext_id = _clean(row.get("id"))
    if not ext_id or not _valid_lonlat(lon, lat):
        return None
    start = parse_iso(str(row.get("date_start") or "")[:19])
    end = parse_iso(str(row.get("date_end") or "")[:19])
    if start is None:
        return None
    if end is None or end < start:
        end = start
    end = end + timedelta(days=1)  # date precision: whole last day
    if since is not None and end < since:
        return None
    best = _num(row.get("best"))
    violence = _UCDP_VIOLENCE.get(str(row.get("type_of_violence") or ""), "conflict")
    side_a, side_b = _clean(row.get("side_a")), _clean(row.get("side_b"))
    actors = " vs ".join(p for p in (side_a, side_b) if p)
    where = _clean(row.get("where_description")) or _clean(row.get("adm_1")) or _clean(row.get("country"))
    deaths = f"{int(best)} deaths (best estimate)" if best is not None else None
    return {
        "id": f"feed:ucdp:{ext_id}",
        "title": _clean(row.get("conflict_name")) or actors or "Conflict event",
        "category": "conflict",
        "lat": lat,
        "lon": lon,
        "start_time": start.isoformat(),
        "end_time": end.isoformat(),
        "source_name": "UCDP",
        "source_url": "https://ucdp.uu.se/",
        "confidence": "scraped",
        "raw_description": ", ".join(p for p in (violence, actors, deaths, where) if p) or None,
        "address": None,
        "geometry": None,
    }


# ----------------------------------------------------------------- SWPC (8.4)


def parse_swpc_aurora(raw: bytes | str) -> dict[str, Any]:
    """OVATION ``ovation_aurora_latest.json`` -> ``grid`` (lon -180..179)."""
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("coordinates"), list):
        raise ParseError("OVATION payload lacks 'coordinates'")
    return {
        "grid": normalize_lonlat_grid(doc["coordinates"]),
        "source_time": _iso(parse_iso(doc.get("Forecast Time")) or parse_iso(doc.get("Observation Time")) or datetime.now(timezone.utc)),
        "observation_time": doc.get("Observation Time"),
        "forecast_time": doc.get("Forecast Time"),
        "truncated": False,
    }


def normalize_lonlat_grid(
    triples: list[Any], nx: int = 360, ny: int = 181, vmin: float = 0.0, vmax: float = 100.0
) -> dict[str, Any]:
    """``[[lon 0..359, lat -90..90, value], ...]`` -> row-major grid starting
    at lon -180, lat -90. Values outside vmin..vmax are dropped (None)."""
    values: list[float | None] = [None] * (nx * ny)
    for triple in triples:
        if not isinstance(triple, (list, tuple)) or len(triple) < 3:
            continue
        lon, lat, value = _num(triple[0]), _num(triple[1]), _num(triple[2])
        if lon is None or lat is None or value is None:
            continue
        if value < vmin or value > vmax:
            continue
        lon_i = int(round(lon)) % 360
        lat_i = int(round(lat)) + 90
        if not 0 <= lat_i < ny:
            continue
        col = (lon_i + 180) % 360  # 0..359 -> column for -180..179
        values[lat_i * nx + col] = value
    return {"lon0": -180, "lat0": -90, "dlon": 1, "dlat": 1, "nx": nx, "ny": ny, "values": values}


def grid_value_at(grid: dict[str, Any], lat: float, lon: float) -> float | None:
    col = int(round((((lon - grid["lon0"]) % 360) / grid["dlon"]))) % grid["nx"]
    row = int(round((lat - grid["lat0"]) / grid["dlat"]))
    if not 0 <= row < grid["ny"]:
        return None
    return grid["values"][row * grid["nx"] + col]


def parse_swpc_kp(raw: bytes | str) -> dict[str, Any]:
    """``noaa-planetary-k-index.json``: header row then ``[time_tag, Kp, ...]``."""
    doc = _loads(raw)
    if not isinstance(doc, list) or len(doc) < 2:
        raise ParseError("Kp payload must be a list with header and rows")
    header = [str(h).lower() for h in doc[0]]
    try:
        kp_idx = header.index("kp")
        time_idx = header.index("time_tag")
    except ValueError as err:
        raise ParseError("Kp payload lacks time_tag/Kp columns") from err
    latest = None
    for row in doc[1:]:
        if not isinstance(row, list) or len(row) <= max(kp_idx, time_idx):
            continue
        kp = _num(row[kp_idx])
        when = parse_iso(str(row[time_idx]))
        if kp is None or when is None:
            continue
        if latest is None or when > latest[0]:
            latest = (when, kp)
    if latest is None:
        raise ParseError("Kp payload has no usable rows")
    return {"kp": latest[1], "time": _iso(latest[0])}


# -------------------------------------------------------------- Onionoo (8.3)


def parse_onionoo(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("relays"), list):
        raise ParseError("Onionoo payload lacks 'relays'")
    published = parse_iso(doc.get("relays_published"))
    ts = _iso(published) if published else None
    features: list[dict[str, Any]] = []
    for relay in doc["relays"]:
        if not isinstance(relay, dict):
            continue
        lat, lon = _num(relay.get("latitude")), _num(relay.get("longitude"))
        fingerprint = _clean(relay.get("fingerprint"))
        if not fingerprint or not _valid_lonlat(lon, lat):
            continue
        bandwidth = _num(relay.get("observed_bandwidth"))
        features.append(
            make_feature(
                f"tor:{fingerprint}",
                lon,
                lat,
                _clean(relay.get("nickname")) or fingerprint[:8],
                "tor_relay",
                ts,
                detail={
                    "fingerprint": fingerprint,
                    "country": _clean(relay.get("country")),
                    "flags": ", ".join(str(f) for f in relay.get("flags") or []) or None,
                    "bandwidth_mbit": round(bandwidth * 8 / 1e6, 2) if bandwidth else None,
                },
                weight=bandwidth,
            )
        )
    features, truncated = _truncate(features, max_features)
    return {"features": features, "source_time": ts, "truncated": truncated}


# ------------------------------------------------------------- Overpass (8.3)

OVERPASS_QUERIES = {
    "datacenters": '[out:json][timeout:25];(nwr["telecom"="data_center"]({bbox});nwr["building"="data_center"]({bbox}););out center tags;',
    "dams": '[out:json][timeout:25];(nwr["waterway"="dam"]({bbox}););out center tags;',
}
OVERPASS_MIN_ZOOM = 8
OVERPASS_TILE_ZOOM = 8
OVERPASS_MAX_SPAN_DEG = 2.0


def overpass_query(kind: str, bbox: tuple[float, float, float, float]) -> str:
    if kind not in OVERPASS_QUERIES:
        raise ValueError(f"unknown Overpass kind {kind!r}")
    min_lon, min_lat, max_lon, max_lat = bbox
    if max_lon - min_lon > OVERPASS_MAX_SPAN_DEG + 1e-9 or max_lat - min_lat > OVERPASS_MAX_SPAN_DEG + 1e-9:
        raise ValueError("Overpass bbox must not exceed 2 x 2 degrees")
    return OVERPASS_QUERIES[kind].format(bbox=f"{min_lat:.4f},{min_lon:.4f},{max_lat:.4f},{max_lon:.4f}")


def overpass_tiles(
    bbox: tuple[float, float, float, float], zoom: float, tile_zoom: int = OVERPASS_TILE_ZOOM
) -> list[tuple[int, int, int]]:
    """Slippy-map tiles at ``tile_zoom`` covering bbox; empty below the
    minimum zoom (the panel shows 'zoom in to load')."""
    if zoom < OVERPASS_MIN_ZOOM:
        return []
    min_lon, min_lat, max_lon, max_lat = bbox
    x0, y1 = _lonlat_to_tile(min_lon, min_lat, tile_zoom)
    x1, y0 = _lonlat_to_tile(max_lon, max_lat, tile_zoom)
    tiles = [(tile_zoom, x, y) for x in range(x0, x1 + 1) for y in range(y0, y1 + 1)]
    return tiles[:64]


def tile_bbox(z: int, x: int, y: int) -> tuple[float, float, float, float]:
    n = 2**z
    min_lon = x / n * 360.0 - 180.0
    max_lon = (x + 1) / n * 360.0 - 180.0
    max_lat = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * y / n))))
    min_lat = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * (y + 1) / n))))
    return (min_lon, min_lat, max_lon, max_lat)


def _lonlat_to_tile(lon: float, lat: float, z: int) -> tuple[int, int]:
    n = 2**z
    lat = max(-85.05, min(85.05, lat))
    x = int((lon + 180.0) / 360.0 * n)
    y = int((1.0 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2.0 * n)
    return max(0, min(n - 1, x)), max(0, min(n - 1, y))


class DailyBudget:
    """Hard cap of calls per UTC day (Overpass: 10 000)."""

    def __init__(self, limit: int, now: Callable[[], float] | None = None) -> None:
        self.limit = limit
        self._now = now or (lambda: datetime.now(timezone.utc).timestamp())
        self._day: str | None = None
        self.count = 0

    def _roll(self) -> None:
        day = datetime.fromtimestamp(self._now(), tz=timezone.utc).strftime("%Y-%m-%d")
        if day != self._day:
            self._day = day
            self.count = 0

    def allow(self) -> bool:
        self._roll()
        if self.count >= self.limit:
            return False
        self.count += 1
        return True

    def to_dict(self) -> dict[str, Any]:
        self._roll()
        return {"day": self._day, "count": self.count}

    def load(self, data: dict[str, Any] | None) -> None:
        if data and data.get("day"):
            self._day = data["day"]
            self.count = int(data.get("count") or 0)
            self._roll()


def parse_overpass(raw: bytes | str, kind: str, max_features: int | None = None) -> dict[str, Any]:
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("elements"), list):
        raise ParseError("Overpass payload lacks 'elements'")
    ts = parse_iso((doc.get("osm3s") or {}).get("timestamp_osm_base"))
    ts_iso = _iso(ts) if ts else None
    features: list[dict[str, Any]] = []
    for element in doc["elements"]:
        if not isinstance(element, dict):
            continue
        center = element.get("center") or element
        lat, lon = _num(center.get("lat")), _num(center.get("lon"))
        if not _valid_lonlat(lon, lat):
            continue
        tags = element.get("tags") or {}
        osm_type, osm_id = element.get("type"), element.get("id")
        features.append(
            make_feature(
                f"osm:{osm_type}:{osm_id}",
                lon,
                lat,
                _clean(tags.get("name")) or _clean(tags.get("operator")) or f"{osm_type} {osm_id}",
                kind.rstrip("s"),
                ts_iso,
                detail={
                    "operator": _clean(tags.get("operator")),
                    "website": _clean(tags.get("website")),
                    "osm": f"https://www.openstreetmap.org/{osm_type}/{osm_id}",
                },
            )
        )
    features, truncated = _truncate(features, max_features)
    return {"features": features, "source_time": ts_iso, "truncated": truncated}


# ------------------------------------------ generic GeoJSON / NE / cables (8.3)


def parse_geojson_features(
    raw: bytes | str,
    kind: str,
    id_prefix: str,
    label_keys: tuple[str, ...] = ("name", "NAME", "title", "label"),
    max_features: int | None = None,
    keep_properties: tuple[str, ...] | None = None,
    ts: str | None = None,
) -> dict[str, Any]:
    """Any FeatureCollection -> 5.3 profile. Used for Natural Earth,
    TeleGeography and user ``geojson_url`` layers."""
    doc = _loads(raw)
    if isinstance(doc, dict) and doc.get("type") == "Feature":
        doc = {"type": "FeatureCollection", "features": [doc]}
    if not isinstance(doc, dict) or not isinstance(doc.get("features"), list):
        raise ParseError("payload is not a GeoJSON FeatureCollection")
    features: list[dict[str, Any]] = []
    for index, feature in enumerate(doc["features"]):
        if not isinstance(feature, dict):
            continue
        geometry = feature.get("geometry")
        if not isinstance(geometry, dict) or _validate_geometry(geometry):
            continue
        props = feature.get("properties") or {}
        if not isinstance(props, dict):
            props = {}
        label = next((_clean(props[k]) for k in label_keys if props.get(k)), None) or f"{kind} {index}"
        ext_id = _clean(feature.get("id")) or _clean(props.get("id")) or str(index)
        detail = {}
        for key in keep_properties or ():
            if props.get(key) not in (None, ""):
                detail[key] = props[key] if isinstance(props[key], (int, float, bool)) else str(props[key])
        if keep_properties is None:
            for key, value in list(props.items())[:12]:
                if isinstance(value, (str, int, float, bool)) and key not in label_keys:
                    detail[str(key)] = value
        features.append(
            make_feature(
                f"{id_prefix}:{ext_id}",
                0.0,
                0.0,
                label,
                kind,
                ts,
                detail=detail,
                geometry=geometry,
                color=_clean(props.get("color")) if isinstance(props.get("color"), str) else None,
            )
        )
    features, truncated = _truncate(features, max_features)
    return {"features": features, "source_time": ts, "truncated": truncated}


def parse_radio_servers(raw: bytes | str) -> list[str]:
    """``/json/servers`` -> host names (the caller picks one at random)."""
    doc = _loads(raw)
    if not isinstance(doc, list):
        raise ParseError("radio-browser servers payload is not a list")
    hosts = []
    for entry in doc:
        if isinstance(entry, dict) and _clean(entry.get("name")):
            hosts.append(entry["name"].strip())
    return sorted(set(hosts))


def parse_radio_browser(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    doc = _loads(raw)
    if not isinstance(doc, list):
        raise ParseError("radio-browser stations payload is not a list")
    features: list[dict[str, Any]] = []
    for station in doc:
        if not isinstance(station, dict):
            continue
        lat, lon = _num(station.get("geo_lat")), _num(station.get("geo_long"))
        uuid = _clean(station.get("stationuuid"))
        if not uuid or not _valid_lonlat(lon, lat) or (lat == 0 and lon == 0):
            continue
        stream = _clean(station.get("url_resolved")) or _clean(station.get("url"))
        if stream and not stream.lower().startswith(("http://", "https://")):
            stream = None
        homepage = _clean(station.get("homepage"))
        if homepage and not homepage.lower().startswith(("http://", "https://")):
            homepage = None
        features.append(
            make_feature(
                f"radio:{uuid}",
                lon,
                lat,
                _clean(station.get("name")) or uuid[:8],
                "radio_station",
                None,
                detail={
                    "country": _clean(station.get("countrycode")) or _clean(station.get("country")),
                    "tags": _clean(station.get("tags")),
                    "codec": _clean(station.get("codec")),
                    "bitrate": _num(station.get("bitrate")),
                    "stream": stream,
                    "homepage": homepage,
                    "votes": _num(station.get("votes")),
                },
            )
        )
    features, truncated = _truncate(features, max_features)
    return {"features": features, "source_time": None, "truncated": truncated}


# ------------------------------------------------------------ AISStream (8.1)


def parse_ais_message(message: Any) -> dict[str, Any] | None:
    """One AISStream websocket message -> feature (PositionReport only)."""
    if isinstance(message, (bytes, str)):
        try:
            message = _loads(message)
        except ParseError:
            return None
    if not isinstance(message, dict) or message.get("MessageType") != "PositionReport":
        return None
    meta = message.get("MetaData") or {}
    body = (message.get("Message") or {}).get("PositionReport") or {}
    lat = _num(body.get("Latitude")) if body.get("Latitude") is not None else _num(meta.get("latitude"))
    lon = _num(body.get("Longitude")) if body.get("Longitude") is not None else _num(meta.get("longitude"))
    mmsi = meta.get("MMSI") or body.get("UserID")
    if mmsi is None or not _valid_lonlat(lon, lat):
        return None
    sog = _num(body.get("Sog"))
    cog = _num(body.get("Cog"))
    heading = _num(body.get("TrueHeading"))
    ts = None
    time_utc = _clean(meta.get("time_utc"))
    if time_utc:
        parsed = parse_iso(time_utc[:19])
        ts = _iso(parsed) if parsed else None
    return make_feature(
        f"ais:{mmsi}",
        lon,
        lat,
        _clean(meta.get("ShipName")) or str(mmsi),
        "vessel",
        ts or _iso(datetime.now(timezone.utc)),
        track=cog if cog is not None and cog < 360 else (heading if heading is not None and heading < 360 else None),
        speed_ms=round(sog * KN_TO_MS, 2) if sog is not None and sog < 102.3 else None,
        detail={
            "mmsi": str(mmsi),
            "heading": heading if heading is not None and heading < 360 else None,
            "nav_status": body.get("NavigationalStatus"),
        },
    )


class AisLimiter:
    """Hard limits for the AIS stream: objects kept and messages per second.
    Excess is dropped and counted, never buffered."""

    def __init__(self, max_objects: int = 2000, max_msgs_per_s: int = 50, now: Callable[[], float] | None = None) -> None:
        self.max_objects = max_objects
        self.max_msgs_per_s = max_msgs_per_s
        self._now = now or (lambda: datetime.now(timezone.utc).timestamp())
        self.objects: dict[str, dict[str, Any]] = {}
        self.dropped_rate = 0
        self.dropped_capacity = 0
        self._window_start = self._now()
        self._window_count = 0

    def offer(self, feature: dict[str, Any] | None) -> bool:
        now = self._now()
        if now - self._window_start >= 1.0:
            self._window_start = now
            self._window_count = 0
        self._window_count += 1
        if self._window_count > self.max_msgs_per_s:
            self.dropped_rate += 1
            return False
        if feature is None:
            return False
        fid = feature["id"]
        if fid not in self.objects and len(self.objects) >= self.max_objects:
            self.dropped_capacity += 1
            return False
        self.objects[fid] = feature
        return True

    def expire(self, max_age_s: float) -> int:
        cutoff = datetime.now(timezone.utc) - timedelta(seconds=max_age_s)
        stale = [fid for fid, f in self.objects.items() if (parse_iso(f["properties"].get("ts")) or cutoff) < cutoff]
        for fid in stale:
            del self.objects[fid]
        return len(stale)

    def features(self) -> list[dict[str, Any]]:
        return list(self.objects.values())


# ---------------------------------------------------------------- FIRMS (8.2)


def parse_firms_csv(raw: bytes | str, max_features: int | None = None) -> dict[str, Any]:
    """FIRMS Area API CSV (VIIRS NRT) -> events (``fire``, 12 h duration)."""
    text = _text(raw).strip()
    if not text or text.lower().startswith(("invalid", "error")):
        raise ParseError(f"FIRMS answered: {text[:120]}")
    reader = csv.DictReader(io.StringIO(text))
    events: list[dict[str, Any]] = []
    for row in reader:
        lat, lon = _num(row.get("latitude")), _num(row.get("longitude"))
        if not _valid_lonlat(lon, lat):
            continue
        date, hhmm = _clean(row.get("acq_date")), _clean(row.get("acq_time")) or "0000"
        hhmm = hhmm.zfill(4)
        start = parse_iso(f"{date}T{hhmm[:2]}:{hhmm[2:]}:00") if date else None
        if start is None:
            continue
        frp = _num(row.get("frp"))
        confidence = _clean(row.get("confidence"))
        satellite = _clean(row.get("satellite")) or "VIIRS"
        ext_id = f"{date}{hhmm}:{lat:.4f}:{lon:.4f}:{satellite}"
        events.append(
            {
                "id": f"feed:firms:{ext_id}",
                "title": f"Thermal anomaly {lat:.2f}, {lon:.2f}",
                "category": "fire",
                "lat": lat,
                "lon": lon,
                "start_time": start.isoformat(),
                "end_time": (start + timedelta(hours=12)).isoformat(),
                "source_name": "NASA FIRMS",
                "source_url": "https://firms.modaps.eosdis.nasa.gov/map/",
                "confidence": "scraped",
                "raw_description": ", ".join(p for p in (
                    f"FRP {frp:.1f} MW" if frp is not None else None,
                    f"confidence {confidence}" if confidence else None,
                    satellite,
                    _clean(row.get("daynight")),
                ) if p) or None,
                "geometry": None,
            }
        )
    events, truncated = _truncate(events, max_features)
    return {"events": events, "source_time": None, "truncated": truncated}


# ------------------------------------------------------------------ GFW (8.2)


def parse_gfw_events(raw: bytes | str, max_features: int | None = None, bbox: tuple[float, float, float, float] | None = None) -> dict[str, Any]:
    """Global Fishing Watch Events API v3 -> events (``fishing``)."""
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("entries"), list):
        raise ParseError("GFW payload lacks 'entries'")
    events: list[dict[str, Any]] = []
    for entry in doc["entries"]:
        if not isinstance(entry, dict):
            continue
        position = entry.get("position") or {}
        lat, lon = _num(position.get("lat")), _num(position.get("lon"))
        ext_id = _clean(entry.get("id"))
        start, end = parse_iso(entry.get("start")), parse_iso(entry.get("end"))
        if not ext_id or start is None or not _valid_lonlat(lon, lat):
            continue
        if bbox and not (bbox[0] <= lon <= bbox[2] and bbox[1] <= lat <= bbox[3]):
            continue
        if end is None or end < start:
            end = start + timedelta(hours=1)
        vessel = entry.get("vessel") or {}
        events.append(
            {
                "id": f"feed:gfw:{ext_id}",
                "title": _clean(vessel.get("name")) or _clean(vessel.get("id")) or "Fishing event",
                "category": "fishing",
                "lat": lat,
                "lon": lon,
                "start_time": start.isoformat(),
                "end_time": end.isoformat(),
                "source_name": "Global Fishing Watch",
                "source_url": "https://globalfishingwatch.org/map",
                "confidence": "scraped",
                "raw_description": ", ".join(p for p in (
                    _clean(entry.get("type")),
                    _clean(vessel.get("flag")),
                    _clean(vessel.get("type")),
                ) if p) or None,
                "geometry": None,
            }
        )
    events, truncated = _truncate(events, max_features)
    return {"events": events, "source_time": None, "truncated": truncated, "next_offset": doc.get("nextOffset")}


# ----------------------------------------------------- UNHCR / IODA (8.3, M3)


def parse_unhcr(raw: bytes | str, mode: str = "asylum") -> dict[str, Any]:
    """UNHCR population API -> ``{"values": {ISO3: persons}}`` (refugees plus
    asylum seekers), keyed by country of asylum or of origin."""
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("items"), list):
        raise ParseError("UNHCR payload lacks 'items'")
    key = "coa_iso" if mode == "asylum" else "coo_iso"
    values: dict[str, float] = {}
    year = None
    for item in doc["items"]:
        if not isinstance(item, dict):
            continue
        code = _clean(item.get(key))
        if not code or len(code) != 3:
            continue
        total = (_num(item.get("refugees")) or 0) + (_num(item.get("asylum_seekers")) or 0)
        values[code.upper()] = values.get(code.upper(), 0) + total
        year = item.get("year", year)
    return {"values": values, "year": year, "max_pages": doc.get("maxPages"), "page": doc.get("page")}


def parse_ioda(raw: bytes | str) -> dict[str, Any]:
    """IODA v2 outages summary (entityType=country) -> ``{"values": {ISO2: score}}``."""
    doc = _loads(raw)
    if not isinstance(doc, dict) or not isinstance(doc.get("data"), list):
        raise ParseError("IODA payload lacks 'data'")
    values: dict[str, float] = {}
    for item in doc["data"]:
        if not isinstance(item, dict):
            continue
        entity = item.get("entity") or {}
        code = _clean(entity.get("code"))
        if not code or entity.get("type") not in (None, "country"):
            continue
        score = _num((item.get("scores") or {}).get("overall")) or _num(item.get("score")) or 0.0
        values[code.upper()] = max(values.get(code.upper(), 0.0), score)
    return {"values": values}


_NE_CODE_KEYS = {
    2: ("ISO_A2_EH", "ISO_A2", "WB_A2", "iso_a2"),
    3: ("ISO_A3_EH", "ISO_A3", "ADM0_A3", "iso_a3", "adm0_a3"),
}


def country_code(properties: dict[str, Any], length: int) -> str | None:
    """ISO code of a Natural Earth admin-0 feature (``-99`` means unknown)."""
    for key in _NE_CODE_KEYS[length]:
        value = _clean(properties.get(key))
        if value and value != "-99" and len(value) == length:
            return value.upper()
    return None


def choropleth_join(
    countries: list[dict[str, Any]], values: dict[str, float], kind: str, ts: str | None = None
) -> dict[str, Any]:
    """Join per-country values onto country features (5.3 profile). Codes of
    the source without a matching country are counted in ``unknown``."""
    if not values:
        return {"features": [], "unknown": [], "matched": 0, "vmax": 0.0}
    length = len(next(iter(values)))
    matched: set[str] = set()
    features: list[dict[str, Any]] = []
    vmax = max(values.values()) if values else 0.0
    for feature in countries:
        props = feature.get("properties") or {}
        detail_src = props.get("detail") if isinstance(props.get("detail"), dict) else props
        code = country_code(detail_src, length) or country_code(props, length)
        if code is None or code not in values:
            continue
        matched.add(code)
        value = values[code]
        features.append(
            make_feature(
                f"{kind}:{code}",
                0.0,
                0.0,
                props.get("label") or detail_src.get("NAME") or detail_src.get("name") or code,
                kind,
                ts,
                detail={"code": code, "value": value},
                geometry=feature["geometry"],
                value=value,
                intensity=round(value / vmax, 4) if vmax else 0.0,
            )
        )
    unknown = sorted(code for code in values if code not in matched)
    return {"features": features, "unknown": unknown, "matched": len(matched), "vmax": vmax}
