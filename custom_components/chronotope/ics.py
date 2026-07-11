"""iCalendar (RFC 5545) generation for Chronotope events.

Free of Home Assistant imports so it can be tested standalone. Produces a
VCALENDAR with one VEVENT per event: CRLF line endings, 75-octet line
folding, TEXT escaping, times in UTC, RRULE passed through as stored.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

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


def event_to_vevent(event: dict[str, Any], dtstamp: str) -> list[str]:
    """Render one event as VEVENT content lines (unfolded)."""
    lines = [
        "BEGIN:VEVENT",
        f"UID:{_escape_text(str(event['id']))}@chronotope",
        f"DTSTAMP:{dtstamp}",
        f"DTSTART:{_format_utc(event['start_time'])}",
        f"DTEND:{_format_utc(event['end_time'])}",
        f"SUMMARY:{_escape_text(event['title'])}",
    ]
    if event.get("category"):
        lines.append(f"CATEGORIES:{_escape_text(event['category'])}")
    if event.get("recurrence"):
        lines.append(f"RRULE:{_rrule_value(event['recurrence'])}")
    if event.get("lat") is not None and event.get("lon") is not None:
        lines.append(f"GEO:{event['lat']:.6f};{event['lon']:.6f}")
    description_parts = []
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
    lines.append("END:VEVENT")
    return lines


def events_to_ics(events: list[dict[str, Any]], now: datetime | None = None) -> str:
    """Render events as a complete iCalendar document."""
    stamp = (now or datetime.now(timezone.utc)).astimezone(timezone.utc)
    dtstamp = stamp.strftime("%Y%m%dT%H%M%SZ")
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        f"PRODID:{PRODID}",
        "CALSCALE:GREGORIAN",
        f"X-WR-CALNAME:{CALNAME}",
    ]
    for event in events:
        lines.extend(event_to_vevent(event, dtstamp))
    lines.append("END:VCALENDAR")
    return "\r\n".join(_fold(line) for line in lines) + "\r\n"
