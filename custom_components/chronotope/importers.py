"""GeoJSON and GPX importers. Free of Home Assistant imports (stdlib only)."""

from __future__ import annotations

import json
import xml.etree.ElementTree as ET
from typing import Any

_TITLE_KEYS = ("title", "name", "Name", "NAME")


def _centroid(geometry: dict[str, Any]) -> tuple[float, float] | None:
    """Rough centroid: average of all coordinate pairs (good enough for
    filtering/sorting; the exact shape is still rendered)."""
    points: list[tuple[float, float]] = []

    def collect(node: Any) -> None:
        if (
            isinstance(node, (list, tuple))
            and len(node) >= 2
            and all(isinstance(coord, (int, float)) for coord in node[:2])
        ):
            points.append((float(node[0]), float(node[1])))
            return
        if isinstance(node, (list, tuple)):
            for child in node:
                collect(child)

    collect(geometry.get("coordinates"))
    if not points:
        return None
    lon = sum(point[0] for point in points) / len(points)
    lat = sum(point[1] for point in points) / len(points)
    return lat, lon


def parse_geojson(
    data: str | dict[str, Any],
    default_start: str | None = None,
    default_end: str | None = None,
    category: str | None = None,
    title_property: str | None = None,
) -> tuple[list[dict[str, Any]], list[str]]:
    """Map GeoJSON features to Chronotope events.

    Times come from feature properties (start_time/end_time) or the
    provided defaults. Returns (events, per-feature errors).
    """
    if isinstance(data, str):
        data = json.loads(data)
    if data.get("type") == "FeatureCollection":
        features = data.get("features") or []
    elif data.get("type") == "Feature":
        features = [data]
    else:
        # Bare geometry: wrap it.
        features = [{"type": "Feature", "geometry": data, "properties": {}}]

    events: list[dict[str, Any]] = []
    errors: list[str] = []
    for index, feature in enumerate(features):
        properties = feature.get("properties") or {}
        geometry = feature.get("geometry") or {}

        title = None
        for key in ([title_property] if title_property else []) + list(_TITLE_KEYS):
            if key and properties.get(key):
                title = str(properties[key])
                break
        if not title:
            errors.append(f"feature {index}: no title property")
            continue

        start = properties.get("start_time") or default_start
        end = properties.get("end_time") or default_end
        if not start or not end:
            errors.append(f"feature {index} ({title}): missing start/end time")
            continue

        event: dict[str, Any] = {
            "title": title,
            "start_time": start,
            "end_time": end,
            "category": str(properties.get("category") or category or ""),
        }
        if properties.get("address"):
            event["address"] = str(properties["address"])
        if geometry.get("type") == "Point":
            coords = geometry.get("coordinates") or []
            if len(coords) >= 2:
                event["lon"], event["lat"] = float(coords[0]), float(coords[1])
        elif geometry:
            event["geometry"] = json.dumps(geometry)
            if centroid := _centroid(geometry):
                event["lat"], event["lon"] = centroid
        events.append(event)
    return events, errors


def _gpx_findall(parent: ET.Element, tag: str) -> list[ET.Element]:
    """Namespace-agnostic findall."""
    return [child for child in parent.iter() if child.tag.split("}")[-1] == tag]


def parse_gpx(
    data: str,
    default_start: str | None = None,
    default_end: str | None = None,
    category: str | None = None,
) -> tuple[list[dict[str, Any]], list[str]]:
    """Map GPX tracks to events with LineString geometry.

    Times come from the first/last track point <time> or the defaults.
    """
    root = ET.fromstring(data)
    events: list[dict[str, Any]] = []
    errors: list[str] = []

    for index, trk in enumerate(_gpx_findall(root, "trk")):
        names = _gpx_findall(trk, "name")
        title = names[0].text.strip() if names and names[0].text else f"Track {index + 1}"
        points: list[tuple[float, float]] = []
        times: list[str] = []
        for trkpt in _gpx_findall(trk, "trkpt"):
            try:
                points.append((float(trkpt.get("lat")), float(trkpt.get("lon"))))
            except (TypeError, ValueError):
                continue
            for time_el in _gpx_findall(trkpt, "time"):
                if time_el.text:
                    times.append(time_el.text.strip())
        if len(points) < 2:
            errors.append(f"track {index} ({title}): fewer than 2 points")
            continue

        start = times[0] if times else default_start
        end = times[-1] if len(times) > 1 else default_end
        if not start or not end:
            errors.append(f"track {index} ({title}): missing time data")
            continue

        mid = points[len(points) // 2]
        events.append(
            {
                "title": title,
                "start_time": start,
                "end_time": end,
                "category": category or "",
                "lat": mid[0],
                "lon": mid[1],
                "geometry": json.dumps(
                    {
                        "type": "LineString",
                        "coordinates": [[lon, lat] for lat, lon in points],
                    }
                ),
            }
        )
    return events, errors
