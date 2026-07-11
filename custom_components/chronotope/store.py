"""SQLite store for Chronotope events.

Deliberately free of Home Assistant imports so it can be tested standalone.
All methods are synchronous; the integration calls them through
``hass.async_add_executor_job``. Times are normalized to UTC ISO 8601 on
write, which makes window overlap a lexicographic comparison in SQL.
"""

from __future__ import annotations

import json
import logging
import math
import re
import sqlite3
import threading
import uuid
from dataclasses import dataclass
from datetime import date, datetime, time, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo

from dateutil.rrule import rrulestr

_LOGGER = logging.getLogger(__name__)

CONFIDENCE_VALUES = ("verified", "scraped", "inferred")
TIME_PRECISION_VALUES = ("exact", "approximate")

# Safety caps for recurrence expansion.
_MAX_OCCURRENCES = 366
_MAX_RETURNED_OCCURRENCES = 50
_DEFAULT_RECURRENCE_HORIZON = timedelta(days=366)

_SCHEMA = """
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    lat REAL,
    lon REAL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    recurrence TEXT,
    source_url TEXT,
    source_name TEXT,
    confidence TEXT,
    scraped_at TEXT,
    raw_description TEXT,
    geometry TEXT,
    address TEXT,
    time_precision TEXT,
    schedule_text TEXT
);
CREATE INDEX IF NOT EXISTS idx_events_category ON events (category);
CREATE INDEX IF NOT EXISTS idx_events_start ON events (start_time);
CREATE INDEX IF NOT EXISTS idx_events_end ON events (end_time);
CREATE TABLE IF NOT EXISTS places (
    address_key TEXT PRIMARY KEY,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    updated_at TEXT NOT NULL
);
"""

# Columns added after the initial release; existing databases are upgraded
# in-place via ALTER TABLE.
_MIGRATED_COLUMNS = ("address", "time_precision", "schedule_text")

_COLUMNS = (
    "id",
    "title",
    "category",
    "lat",
    "lon",
    "start_time",
    "end_time",
    "recurrence",
    "source_url",
    "source_name",
    "confidence",
    "scraped_at",
    "raw_description",
    "geometry",
    "address",
    "time_precision",
    "schedule_text",
)


def _address_key(address: str) -> str:
    """Normalize an address for cache lookups: casefold, strip punctuation."""
    cleaned = re.sub(r"[^\w\s]", "", address.casefold(), flags=re.UNICODE)
    return " ".join(cleaned.split())


def haversine_km(
    lat1: float | None, lon1: float | None, lat2: float | None, lon2: float | None
) -> float | None:
    """Great-circle distance in kilometers; None if any coordinate is missing."""
    if lat1 is None or lon1 is None or lat2 is None or lon2 is None:
        return None
    rlat1, rlon1, rlat2, rlon2 = map(math.radians, (lat1, lon1, lat2, lon2))
    dlat = rlat2 - rlat1
    dlon = rlon2 - rlon1
    a = math.sin(dlat / 2) ** 2 + math.cos(rlat1) * math.cos(rlat2) * math.sin(dlon / 2) ** 2
    return 2 * 6371.0088 * math.asin(min(1.0, math.sqrt(a)))


def _parse_aware(value: str, field: str) -> datetime:
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except (ValueError, AttributeError, TypeError) as err:
        raise ValueError(f"{field} is not valid ISO 8601: {value!r}") from err
    if parsed.tzinfo is None:
        raise ValueError(f"{field} must be timezone-aware: {value!r}")
    return parsed.astimezone(timezone.utc)


def _to_utc_iso(value: str, field: str) -> str:
    return _parse_aware(value, field).isoformat()


@dataclass(frozen=True)
class QueryFilter:
    """Combinable filters for querying events."""

    categories: list[str] | None = None
    center_lat: float | None = None
    center_lon: float | None = None
    radius_km: float | None = None
    window_start: str | None = None  # ISO 8601, tz-aware
    window_end: str | None = None
    weekdays: list[int] | None = None  # 0 = Monday .. 6 = Sunday
    time_from: str | None = None  # "HH:MM", interpreted in tz_name
    time_to: str | None = None
    tz_name: str = "UTC"
    limit: int | None = None

    @property
    def has_center(self) -> bool:
        return self.center_lat is not None and self.center_lon is not None

    @property
    def has_mask(self) -> bool:
        return bool(self.weekdays) or self.time_from is not None or self.time_to is not None


class EventStore:
    """Synchronous SQLite access layer for Chronotope events."""

    def __init__(self, path: str) -> None:
        self._path = path
        self._lock = threading.Lock()
        self._conn = sqlite3.connect(path, check_same_thread=False)
        self._conn.row_factory = sqlite3.Row
        self._conn.create_function("haversine_km", 4, haversine_km, deterministic=True)
        with self._lock, self._conn:
            self._conn.executescript(_SCHEMA)
            existing = {
                row[1] for row in self._conn.execute("PRAGMA table_info(events)")
            }
            for column in _MIGRATED_COLUMNS:
                if column not in existing:
                    self._conn.execute(f"ALTER TABLE events ADD COLUMN {column} TEXT")

    def close(self) -> None:
        with self._lock:
            self._conn.close()

    # ------------------------------------------------------------------ write

    def save_event(self, data: dict[str, Any]) -> dict[str, Any]:
        """Insert or replace an event; returns the stored representation.

        Address/geo cache: an event carrying both address and coordinates
        teaches the places table; an event carrying only an address gets its
        coordinates filled in from the cache when the address is known.
        """
        event = self._validate(data)
        columns = ", ".join(_COLUMNS)
        placeholders = ", ".join(f":{col}" for col in _COLUMNS)
        with self._lock, self._conn:
            if event["address"]:
                if event["lat"] is None:
                    row = self._conn.execute(
                        "SELECT lat, lon FROM places WHERE address_key = ?",
                        (_address_key(event["address"]),),
                    ).fetchone()
                    if row:
                        event["lat"] = row["lat"]
                        event["lon"] = row["lon"]
                else:
                    self._upsert_place_locked(
                        event["address"], event["lat"], event["lon"]
                    )
            self._conn.execute(
                f"INSERT OR REPLACE INTO events ({columns}) VALUES ({placeholders})",
                event,
            )
        return event

    def delete_event(self, event_id: str) -> bool:
        with self._lock, self._conn:
            cursor = self._conn.execute("DELETE FROM events WHERE id = ?", (event_id,))
        return cursor.rowcount > 0

    # ------------------------------------------------------------------- read

    def get_event(self, event_id: str) -> dict[str, Any] | None:
        with self._lock:
            row = self._conn.execute(
                "SELECT * FROM events WHERE id = ?", (event_id,)
            ).fetchone()
        return dict(row) if row else None

    def lookup_place(self, address: str) -> dict[str, Any] | None:
        """Look up cached coordinates for an address (normalized match)."""
        with self._lock:
            row = self._conn.execute(
                "SELECT address, lat, lon, updated_at FROM places WHERE address_key = ?",
                (_address_key(address),),
            ).fetchone()
        return dict(row) if row else None

    def save_place(self, address: str, lat: float, lon: float) -> dict[str, Any]:
        """Explicitly cache coordinates for an address."""
        if not address or not str(address).strip():
            raise ValueError("address is required")
        lat, lon = float(lat), float(lon)
        if not -90 <= lat <= 90:
            raise ValueError(f"lat out of range: {lat}")
        if not -180 <= lon <= 180:
            raise ValueError(f"lon out of range: {lon}")
        with self._lock, self._conn:
            self._upsert_place_locked(str(address).strip(), lat, lon)
        return {"address": str(address).strip(), "lat": lat, "lon": lon}

    def _upsert_place_locked(self, address: str, lat: float, lon: float) -> None:
        self._conn.execute(
            """
            INSERT INTO places (address_key, address, lat, lon, updated_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(address_key) DO UPDATE SET
                address = excluded.address,
                lat = excluded.lat,
                lon = excluded.lon,
                updated_at = excluded.updated_at
            """,
            (
                _address_key(address),
                address,
                lat,
                lon,
                datetime.now(timezone.utc).isoformat(),
            ),
        )

    def categories(self) -> list[str]:
        with self._lock:
            rows = self._conn.execute(
                "SELECT DISTINCT category FROM events WHERE category != '' ORDER BY category"
            ).fetchall()
        return [row["category"] for row in rows]

    def query_events(self, flt: QueryFilter) -> list[dict[str, Any]]:
        """Query events with combinable category/radius/time filters.

        Non-recurring events are filtered fully in SQL where possible;
        recurring events pass the SQL time filter and are expanded and
        checked against window and weekday/time mask in Python.
        """
        clauses: list[str] = []
        params: list[Any] = []

        if flt.categories:
            marks = ", ".join("?" for _ in flt.categories)
            clauses.append(f"category IN ({marks})")
            params.extend(flt.categories)

        if flt.has_center and flt.radius_km is not None:
            clauses.append("haversine_km(lat, lon, ?, ?) <= ?")
            params.extend([flt.center_lat, flt.center_lon, flt.radius_km])

        window_start = _parse_aware(flt.window_start, "window_start") if flt.window_start else None
        window_end = _parse_aware(flt.window_end, "window_end") if flt.window_end else None

        time_clauses: list[str] = []
        if window_end is not None:
            time_clauses.append("start_time < ?")
            params_end = window_end.isoformat()
        if window_start is not None:
            time_clauses.append("end_time > ?")
        if time_clauses:
            # Recurring events must survive the SQL window filter; their
            # occurrences are checked in Python.
            combined = " AND ".join(time_clauses)
            clauses.append(f"(recurrence IS NOT NULL OR ({combined}))")
            if window_end is not None:
                params.append(params_end)
            if window_start is not None:
                params.append(window_start.isoformat())

        sql = "SELECT * FROM events"
        if clauses:
            sql += " WHERE " + " AND ".join(clauses)

        with self._lock:
            rows = self._conn.execute(sql, params).fetchall()

        tz = ZoneInfo(flt.tz_name)
        mask_weekdays = set(flt.weekdays) if flt.weekdays else None
        mask_from = _parse_hhmm(flt.time_from, "time_from")
        mask_to = _parse_hhmm(flt.time_to, "time_to")
        has_mask = flt.has_mask

        results: list[dict[str, Any]] = []
        for row in rows:
            event = dict(row)
            occurrences = self._match_occurrences(
                event, window_start, window_end, mask_weekdays, mask_from, mask_to, tz, has_mask
            )
            if occurrences is None:
                continue
            if occurrences:
                event["occurrences"] = occurrences[:_MAX_RETURNED_OCCURRENCES]
            if flt.has_center:
                event["distance_km"] = haversine_km(
                    event["lat"], event["lon"], flt.center_lat, flt.center_lon
                )
            results.append(event)

        results.sort(key=lambda ev: _sort_key(ev, flt.has_center))
        if flt.limit is not None:
            results = results[: flt.limit]
        return results

    # -------------------------------------------------------------- internals

    def _match_occurrences(
        self,
        event: dict[str, Any],
        window_start: datetime | None,
        window_end: datetime | None,
        weekdays: set[int] | None,
        time_from: time | None,
        time_to: time | None,
        tz: ZoneInfo,
        has_mask: bool,
    ) -> list[list[str]] | None:
        """Return matched occurrences for an event, or None if it doesn't match.

        For non-recurring events the result is an empty list (no expansion
        needed). For recurring events it contains the [start, end] pairs that
        overlap the window and mask.
        """
        start = _parse_aware(event["start_time"], "start_time")
        end = _parse_aware(event["end_time"], "end_time")
        duration = max(end - start, timedelta(0))

        rule = None
        if event.get("recurrence"):
            # Expand in the query timezone so clock-based rule parts
            # (BYHOUR, BYDAY, ...) mean local wall-clock time and stay
            # stable across DST transitions.
            try:
                rule = rrulestr(event["recurrence"], dtstart=start.astimezone(tz))
            except (ValueError, TypeError) as err:
                _LOGGER.warning(
                    "Event %s has unparseable RRULE %r (%s); treating as single event",
                    event.get("id"),
                    event["recurrence"],
                    err,
                )

        if rule is None:
            if window_end is not None and start >= window_end:
                return None
            if window_start is not None and end <= window_start:
                return None
            if has_mask and not _matches_mask(
                start, end, weekdays, time_from, time_to, tz
            ):
                return None
            return []

        # Recurring event: expand within the window (or a default horizon).
        if window_start is not None or window_end is not None:
            expand_start = window_start or start
            expand_end = window_end or (expand_start + _DEFAULT_RECURRENCE_HORIZON)
        else:
            expand_start = start
            expand_end = max(start, datetime.now(timezone.utc)) + _DEFAULT_RECURRENCE_HORIZON

        matched: list[list[str]] = []
        for occ_start in rule.xafter(expand_start - duration, count=_MAX_OCCURRENCES, inc=True):
            if occ_start >= expand_end:
                break
            occ_end = occ_start + duration
            if window_start is not None and occ_end <= window_start:
                continue
            if has_mask and not _matches_mask(
                occ_start, occ_end, weekdays, time_from, time_to, tz
            ):
                continue
            matched.append(
                [
                    occ_start.astimezone(timezone.utc).isoformat(),
                    occ_end.astimezone(timezone.utc).isoformat(),
                ]
            )
            if len(matched) >= _MAX_RETURNED_OCCURRENCES:
                break

        return matched if matched else None

    def _validate(self, data: dict[str, Any]) -> dict[str, Any]:
        event: dict[str, Any] = {col: data.get(col) for col in _COLUMNS}

        if not event["id"]:
            event["id"] = uuid.uuid4().hex
        event["id"] = str(event["id"])

        if not event["title"] or not str(event["title"]).strip():
            raise ValueError("title is required")
        event["title"] = str(event["title"])
        event["category"] = str(event["category"] or "")

        for coord in ("lat", "lon"):
            if event[coord] is not None:
                event[coord] = float(event[coord])
        if (event["lat"] is None) != (event["lon"] is None):
            raise ValueError("lat and lon must be provided together")
        if event["lat"] is not None and not -90 <= event["lat"] <= 90:
            raise ValueError(f"lat out of range: {event['lat']}")
        if event["lon"] is not None and not -180 <= event["lon"] <= 180:
            raise ValueError(f"lon out of range: {event['lon']}")

        if not event["start_time"] or not event["end_time"]:
            raise ValueError("start_time and end_time are required")
        event["start_time"] = _to_utc_iso(event["start_time"], "start_time")
        event["end_time"] = _to_utc_iso(event["end_time"], "end_time")
        if event["end_time"] < event["start_time"]:
            raise ValueError("end_time must not be before start_time")

        if event["recurrence"]:
            start = _parse_aware(event["start_time"], "start_time")
            try:
                rrulestr(event["recurrence"], dtstart=start)
            except (ValueError, TypeError) as err:
                raise ValueError(f"recurrence is not a valid RRULE: {err}") from err
        else:
            event["recurrence"] = None

        if event["confidence"] is not None and event["confidence"] not in CONFIDENCE_VALUES:
            raise ValueError(
                f"confidence must be one of {CONFIDENCE_VALUES}, got {event['confidence']!r}"
            )

        if (
            event["time_precision"] is not None
            and event["time_precision"] not in TIME_PRECISION_VALUES
        ):
            raise ValueError(
                f"time_precision must be one of {TIME_PRECISION_VALUES}, "
                f"got {event['time_precision']!r}"
            )

        if event["address"] is not None:
            event["address"] = str(event["address"]).strip() or None

        if event["scraped_at"]:
            event["scraped_at"] = _to_utc_iso(event["scraped_at"], "scraped_at")
        else:
            event["scraped_at"] = None

        if event["geometry"] is not None:
            if isinstance(event["geometry"], (dict, list)):
                event["geometry"] = json.dumps(event["geometry"])
            else:
                try:
                    json.loads(event["geometry"])
                except (ValueError, TypeError) as err:
                    raise ValueError("geometry must be valid GeoJSON") from err
                event["geometry"] = str(event["geometry"])

        for field in ("source_url", "source_name", "raw_description", "schedule_text"):
            if event[field] is not None:
                event[field] = str(event[field])

        return event


def _parse_hhmm(value: str | None, field: str) -> time | None:
    if value is None:
        return None
    try:
        hours, minutes = value.split(":")
        return time(int(hours), int(minutes))
    except (ValueError, AttributeError) as err:
        raise ValueError(f"{field} must be HH:MM, got {value!r}") from err


def _matches_mask(
    start: datetime,
    end: datetime,
    weekdays: set[int] | None,
    time_from: time | None,
    time_to: time | None,
    tz: ZoneInfo,
) -> bool:
    """Check whether [start, end) touches the weekday/time-of-day mask in tz."""
    local_start = start.astimezone(tz)
    local_end = end.astimezone(tz)
    day = local_start.date()
    last_day = max(local_end.date(), day)
    # After 8 distinct days every weekday has been seen.
    for _ in range(8):
        if day > last_day:
            break
        if weekdays is None or day.weekday() in weekdays:
            if time_from is None and time_to is None:
                mask_start = datetime.combine(day, time.min, tzinfo=tz)
                mask_end = datetime.combine(day + timedelta(days=1), time.min, tzinfo=tz)
            else:
                mask_start = datetime.combine(day, time_from or time.min, tzinfo=tz)
                mask_end = datetime.combine(day, time_to or time.max, tzinfo=tz)
            if local_end <= local_start:
                if mask_start <= local_start < mask_end:
                    return True
            elif mask_start < local_end and mask_end > local_start:
                return True
        day += timedelta(days=1)
    return False


def _sort_key(event: dict[str, Any], by_distance: bool) -> tuple:
    occurrences = event.get("occurrences")
    effective_start = occurrences[0][0] if occurrences else event["start_time"]
    if by_distance:
        distance = event.get("distance_km")
        return (distance is None, distance if distance is not None else 0.0, effective_start)
    return (effective_start,)
