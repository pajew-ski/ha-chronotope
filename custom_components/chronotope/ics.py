"""iCalendar (RFC 5545) generation and parsing for Chronotope events.

Free of Home Assistant imports so it can be tested standalone. Produces a
VCALENDAR with one VEVENT per event: CRLF line endings, 75-octet line
folding, TEXT escaping, RRULE passed through as stored. Non-recurring
events are written in UTC; recurring events use DTSTART;TZID=<tz> plus a
generated VTIMEZONE so BYHOUR/BYDAY stay on local wall-clock time across
DST transitions. Also parses external ICS feeds into Chronotope events.
"""

from __future__ import annotations

import re
from datetime import date, datetime, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo

PRODID = "-//ha-chronotope//Chronotope//EN"
CALNAME = "Chronotope"


def _escape_text(value: str) -> str:
    """Escape TEXT per RFC 5545 section 3.3.11."""
    return (
        value.replace("\\", "\\\\")
        .replace(";", "\\;")
        .replace(",", "\\,")
        .replace("\r\n", "\\n")
        .replace("\n", "\\n")
        .replace("\r", "\\n")
    )


def _fold(line: str) -> str:
    """Fold a content line to max 75 octets per line (RFC 5545 section 3.1)."""
    encoded = line.encode("utf-8")
    if len(encoded) <= 75:
        return line
    parts: list[str] = []
    start = 0
    limit = 75
    while start < len(encoded):
        end = min(start + limit, len(encoded))
        # Do not split inside a UTF-8 multibyte sequence: continuation bytes
        # start with bits 10xxxxxx.
        while end < len(encoded) and (encoded[end] & 0xC0) == 0x80:
            end -= 1
        parts.append(encoded[start:end].decode("utf-8"))
        start = end
        limit = 74  # continuation lines start with a space, costing one octet
    return "\r\n ".join(parts)


def _format_utc(value: str) -> str:
    """ISO 8601 (tz-aware) -> RFC 5545 UTC form, e.g. 20260711T120000Z."""
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def _rrule_value(recurrence: str) -> str:
    value = recurrence.strip()
    if value.upper().startswith("RRULE:"):
        value = value[len("RRULE:"):]
    return value


def _format_offset(offset: timedelta) -> str:
    total = int(offset.total_seconds())
    sign = "+" if total >= 0 else "-"
    total = abs(total)
    return f"{sign}{total // 3600:02d}{(total % 3600) // 60:02d}"


def _vtimezone(tz_name: str, start_year: int, end_year: int) -> list[str]:
    """Generate a VTIMEZONE with explicit observances (hour precision).

    Transitions are found by scanning UTC offsets day by day and bisecting
    to the hour - no RRULE reconstruction, just the observance list, which
    every mainstream client accepts.
    """
    tz = ZoneInfo(tz_name)
    lines = ["BEGIN:VTIMEZONE", f"TZID:{tz_name}"]

    cursor = datetime(start_year, 1, 1, tzinfo=timezone.utc)
    end = datetime(end_year, 12, 31, tzinfo=timezone.utc)
    previous_offset = cursor.astimezone(tz).utcoffset()

    def observance(transition_utc: datetime, offset_from: timedelta) -> list[str]:
        local_after = transition_utc.astimezone(tz)
        kind = "DAYLIGHT" if (local_after.dst() or timedelta(0)) else "STANDARD"
        onset_local = transition_utc + offset_from
        return [
            f"BEGIN:{kind}",
            f"DTSTART:{onset_local.strftime('%Y%m%dT%H%M%S')}",
            f"TZOFFSETFROM:{_format_offset(offset_from)}",
            f"TZOFFSETTO:{_format_offset(local_after.utcoffset())}",
            f"TZNAME:{local_after.tzname() or tz_name}",
            f"END:{kind}",
        ]

    # Initial observance so the period before the first transition is covered.
    initial_local = cursor.astimezone(tz)
    initial_kind = "DAYLIGHT" if (initial_local.dst() or timedelta(0)) else "STANDARD"
    lines += [
        f"BEGIN:{initial_kind}",
        f"DTSTART:{(cursor + previous_offset).strftime('%Y%m%dT%H%M%S')}",
        f"TZOFFSETFROM:{_format_offset(previous_offset)}",
        f"TZOFFSETTO:{_format_offset(previous_offset)}",
        f"TZNAME:{initial_local.tzname() or tz_name}",
        f"END:{initial_kind}",
    ]

    day = cursor + timedelta(days=1)
    while day <= end:
        offset = day.astimezone(tz).utcoffset()
        if offset != previous_offset:
            low, high = day - timedelta(days=1), day
            while high - low > timedelta(hours=1):
                mid = low + (high - low) / 2
                mid = mid.replace(minute=0, second=0, microsecond=0)
                if mid <= low:
                    break
                if mid.astimezone(tz).utcoffset() == previous_offset:
                    low = mid
                else:
                    high = mid
            lines += observance(high, previous_offset)
            previous_offset = offset
        day += timedelta(days=1)

    lines.append("END:VTIMEZONE")
    return lines


def _format_local(value: str, tz: ZoneInfo) -> str:
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(tz).strftime("%Y%m%dT%H%M%S")


def event_to_vevent(
    event: dict[str, Any], dtstamp: str, tz_name: str | None = None
) -> list[str]:
    """Render one event as VEVENT content lines (unfolded).

    Recurring events use DTSTART;TZID so clock-based rule parts stay on
    local time; non-recurring events are plain UTC.
    """
    if event.get("recurrence") and tz_name:
        tz = ZoneInfo(tz_name)
        dt_lines = [
            f"DTSTART;TZID={tz_name}:{_format_local(event['start_time'], tz)}",
            f"DTEND;TZID={tz_name}:{_format_local(event['end_time'], tz)}",
        ]
    else:
        dt_lines = [
            f"DTSTART:{_format_utc(event['start_time'])}",
            f"DTEND:{_format_utc(event['end_time'])}",
        ]
    lines = [
        "BEGIN:VEVENT",
        f"UID:{_escape_text(str(event['id']))}@chronotope",
        f"DTSTAMP:{dtstamp}",
        *dt_lines,
        f"SUMMARY:{_escape_text(event['title'])}",
    ]
    if event.get("category"):
        lines.append(f"CATEGORIES:{_escape_text(event['category'])}")
    if event.get("recurrence"):
        lines.append(f"RRULE:{_rrule_value(event['recurrence'])}")
    if event.get("address"):
        lines.append(f"LOCATION:{_escape_text(event['address'])}")
    if event.get("lat") is not None and event.get("lon") is not None:
        lines.append(f"GEO:{event['lat']:.6f};{event['lon']:.6f}")
    description_parts = []
    if event.get("schedule_text"):
        description_parts.append(f"Schedule: {event['schedule_text']}")
    if event.get("raw_description"):
        description_parts.append(str(event["raw_description"]))
    if event.get("source_name"):
        description_parts.append(f"Source: {event['source_name']}")
    if description_parts:
        lines.append(f"DESCRIPTION:{_escape_text(chr(10).join(description_parts))}")
    if event.get("source_url"):
        lines.append(f"URL:{_escape_text(event['source_url'])}")
    if event.get("confidence"):
        lines.append(f"X-CHRONOTOPE-CONFIDENCE:{_escape_text(event['confidence'])}")
    if event.get("time_precision") and event["time_precision"] != "exact":
        lines.append(
            f"X-CHRONOTOPE-TIME-PRECISION:{_escape_text(event['time_precision'])}"
        )
    lines.append("END:VEVENT")
    return lines


def events_to_ics(
    events: list[dict[str, Any]],
    now: datetime | None = None,
    tz_name: str | None = None,
) -> str:
    """Render events as a complete iCalendar document.

    With ``tz_name`` set, recurring events get TZID-based times plus a
    generated VTIMEZONE, keeping their local wall-clock time across DST.
    """
    stamp = (now or datetime.now(timezone.utc)).astimezone(timezone.utc)
    dtstamp = stamp.strftime("%Y%m%dT%H%M%SZ")
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        f"PRODID:{PRODID}",
        "CALSCALE:GREGORIAN",
        f"X-WR-CALNAME:{CALNAME}",
    ]
    if tz_name and tz_name != "UTC" and any(ev.get("recurrence") for ev in events):
        lines.extend(_vtimezone(tz_name, stamp.year - 1, stamp.year + 3))
    for event in events:
        lines.extend(event_to_vevent(event, dtstamp, tz_name=tz_name))
    lines.append("END:VCALENDAR")
    return "\r\n".join(_fold(line) for line in lines) + "\r\n"


# --------------------------------------------------------------------- parse

_UNESCAPE = {"\\\\": "\\", "\\;": ";", "\\,": ",", "\\n": "\n", "\\N": "\n"}


def _unescape_text(value: str) -> str:
    return re.sub(
        r"\\[\\;,nN]", lambda match: _UNESCAPE[match.group(0)], value
    )


def _unfold(text: str) -> list[str]:
    lines: list[str] = []
    for raw in text.replace("\r\n", "\n").replace("\r", "\n").split("\n"):
        if raw[:1] in (" ", "\t") and lines:
            lines[-1] += raw[1:]
        elif raw:
            lines.append(raw)
    return lines


def _split_property(line: str) -> tuple[str, dict[str, str], str] | None:
    """'DTSTART;TZID=Europe/Berlin:20260711T100000' -> (name, params, value)."""
    in_quotes = False
    for index, char in enumerate(line):
        if char == '"':
            in_quotes = not in_quotes
        elif char == ":" and not in_quotes:
            head, value = line[:index], line[index + 1:]
            parts = head.split(";")
            params = {}
            for param in parts[1:]:
                key, _, raw = param.partition("=")
                params[key.upper()] = raw.strip('"')
            return parts[0].upper(), params, value
    return None


def _parse_ics_datetime(
    value: str, params: dict[str, str], default_tz: str
) -> tuple[datetime | None, bool]:
    """Returns (aware datetime, is_all_day)."""
    value = value.strip()
    if params.get("VALUE") == "DATE" or re.fullmatch(r"\d{8}", value):
        try:
            day = datetime.strptime(value, "%Y%m%d")
        except ValueError:
            return None, False
        return day.replace(tzinfo=ZoneInfo(default_tz)), True
    tzid = params.get("TZID")
    if value.endswith("Z"):
        tz: Any = timezone.utc
        value = value[:-1]
    elif tzid:
        try:
            tz = ZoneInfo(tzid)
        except (KeyError, ValueError):
            tz = ZoneInfo(default_tz)
    else:
        tz = ZoneInfo(default_tz)
    try:
        parsed = datetime.strptime(value, "%Y%m%dT%H%M%S")
    except ValueError:
        return None, False
    return parsed.replace(tzinfo=tz), False


def _parse_duration(value: str) -> timedelta | None:
    match = re.fullmatch(
        r"([+-]?)P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?",
        value.strip(),
    )
    if not match:
        return None
    sign = -1 if match.group(1) == "-" else 1
    weeks, days, hours, minutes, seconds = (
        int(group or 0) for group in match.groups()[1:]
    )
    return sign * timedelta(
        weeks=weeks, days=days, hours=hours, minutes=minutes, seconds=seconds
    )


def parse_ics(text: str, default_tz: str = "UTC") -> list[dict[str, Any]]:
    """Parse an external ICS feed into Chronotope event dicts.

    Handles folding, escaping, UTC/TZID/floating/all-day times and
    DURATION. RRULE is passed through as-is. The UID becomes the event id
    so re-imports update instead of duplicating.
    """
    events: list[dict[str, Any]] = []
    current: dict[str, tuple[dict[str, str], str]] | None = None

    for line in _unfold(text):
        prop = _split_property(line)
        if prop is None:
            continue
        name, params, value = prop
        if name == "BEGIN" and value.upper() == "VEVENT":
            current = {}
            continue
        if name == "END" and value.upper() == "VEVENT":
            if current is not None and (event := _vevent_to_event(current, default_tz)):
                events.append(event)
            current = None
            continue
        if current is not None:
            current[name] = (params, value)
    return events


def _vevent_to_event(
    props: dict[str, tuple[dict[str, str], str]], default_tz: str
) -> dict[str, Any] | None:
    def get(name: str) -> tuple[dict[str, str], str] | None:
        return props.get(name)

    summary = get("SUMMARY")
    dtstart = get("DTSTART")
    if summary is None or dtstart is None:
        return None
    start, all_day = _parse_ics_datetime(dtstart[1], dtstart[0], default_tz)
    if start is None:
        return None

    end: datetime | None = None
    if dtend := get("DTEND"):
        end, _ = _parse_ics_datetime(dtend[1], dtend[0], default_tz)
    elif duration_prop := get("DURATION"):
        if (duration := _parse_duration(duration_prop[1])) is not None:
            end = start + duration
    if end is None:
        end = start + (timedelta(days=1) if all_day else timedelta(hours=1))

    event: dict[str, Any] = {
        "title": _unescape_text(summary[1]),
        "start_time": start.isoformat(),
        "end_time": end.isoformat(),
    }
    if uid := get("UID"):
        event["id"] = _unescape_text(uid[1])
    if categories := get("CATEGORIES"):
        event["category"] = _unescape_text(categories[1].split(",")[0]).strip()
    if location := get("LOCATION"):
        event["address"] = _unescape_text(location[1])
    if geo := get("GEO"):
        parts = geo[1].split(";")
        if len(parts) == 2:
            try:
                event["lat"], event["lon"] = float(parts[0]), float(parts[1])
            except ValueError:
                pass
    if description := get("DESCRIPTION"):
        event["raw_description"] = _unescape_text(description[1])
    if rrule := get("RRULE"):
        event["recurrence"] = rrule[1]
    if url := get("URL"):
        event["source_url"] = url[1]
    return event
