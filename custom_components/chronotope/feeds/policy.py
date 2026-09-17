"""Politeness and failure policy for feed providers (spec section 6.5).

Pure logic, free of Home Assistant imports so it can be unit-tested with an
injected clock. Persistence is the caller's job: ``to_dict``/``from_dict``
round-trip the state through ``homeassistant.helpers.storage.Store`` so a
restart does not bypass a source's minimum interval.
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Any, Callable

FRESH = "fresh"
STALE = "stale"
ERROR = "error"
DISABLED = "disabled"
BLOCKED = "blocked"

# HTTP codes that mean "stop asking": credentials, gone, moved, throttled.
BLOCKER_CODES = frozenset({301, 401, 403, 404, 429})

_BACKOFF_BASE_S = 60.0
_BACKOFF_MAX_S = 3600.0
_CIRCUIT_FAILURES = 5
_CIRCUIT_RETRY_S = 3600.0
_BLOCK_DEFAULT_S = 6 * 3600.0
_STALE_FACTOR = 3.0  # data older than 3 intervals counts as stale


@dataclass
class FeedPolicy:
    """Per-provider state machine for attempts, backoff and blocking."""

    min_interval_s: float
    now: Callable[[], float] = time.time
    last_attempt: float | None = None
    last_success: float | None = None
    etag: str | None = None
    last_modified: str | None = None
    blocked_until: float | None = None
    backoff_until: float | None = None
    failures: int = 0
    last_error: str | None = None
    last_status: int | None = None
    enabled: bool = True
    extra: dict[str, Any] = field(default_factory=dict)

    # ------------------------------------------------------------ decisions

    def seconds_until_allowed(self) -> float:
        """How long to wait before the next attempt is polite and permitted."""
        now = self.now()
        waits = [0.0]
        if self.last_attempt is not None:
            waits.append(self.last_attempt + self.min_interval_s - now)
        if self.blocked_until is not None:
            waits.append(self.blocked_until - now)
        if self.backoff_until is not None:
            waits.append(self.backoff_until - now)
        return max(waits)

    def can_attempt(self) -> bool:
        return self.enabled and self.seconds_until_allowed() <= 0

    def conditional_headers(self) -> dict[str, str]:
        headers: dict[str, str] = {}
        if self.etag:
            headers["If-None-Match"] = self.etag
        if self.last_modified:
            headers["If-Modified-Since"] = self.last_modified
        return headers

    # -------------------------------------------------------------- events

    def record_attempt(self) -> None:
        self.last_attempt = self.now()

    def record_success(
        self, etag: str | None = None, last_modified: str | None = None, status: int = 200
    ) -> None:
        self.last_success = self.now()
        self.failures = 0
        self.backoff_until = None
        self.blocked_until = None
        self.last_error = None
        self.last_status = status
        if etag is not None:
            self.etag = etag
        if last_modified is not None:
            self.last_modified = last_modified

    def record_not_modified(self) -> None:
        """304 (or CelesTrak's 'not updated' 403): success without new data."""
        self.record_success(status=304)

    def record_failure(self, error: str, status: int | None = None) -> None:
        """5xx, timeout or network error: exponential backoff, circuit breaker."""
        self.failures += 1
        self.last_error = error
        self.last_status = status
        now = self.now()
        if self.failures >= _CIRCUIT_FAILURES:
            self.backoff_until = now + _CIRCUIT_RETRY_S
        else:
            delay = min(_BACKOFF_BASE_S * (2 ** (self.failures - 1)), _BACKOFF_MAX_S)
            self.backoff_until = now + delay

    def record_blocked(
        self, status: int, retry_after_s: float | None = None, error: str | None = None
    ) -> None:
        """Blocker status codes: pause until Retry-After or 6 h, no retries."""
        self.failures += 1
        self.last_status = status
        self.last_error = error or f"HTTP {status}"
        pause = retry_after_s if retry_after_s and retry_after_s > 0 else _BLOCK_DEFAULT_S
        self.blocked_until = self.now() + pause

    def record_budget_exceeded(self, error: str) -> None:
        """Budget violations count as errors; the last good state stays."""
        self.record_failure(error, status=None)
        self.failures = max(self.failures, _CIRCUIT_FAILURES)
        self.backoff_until = self.now() + _CIRCUIT_RETRY_S

    # -------------------------------------------------------------- status

    def freshness(self, interval_s: float | None = None) -> str:
        if not self.enabled:
            return DISABLED
        now = self.now()
        if self.blocked_until is not None and self.blocked_until > now:
            return BLOCKED
        if self.failures >= _CIRCUIT_FAILURES:
            return ERROR
        if self.last_success is None:
            return ERROR if self.failures else STALE
        horizon = max(interval_s or self.min_interval_s, self.min_interval_s) * _STALE_FACTOR
        if now - self.last_success > horizon:
            return STALE
        if self.failures:
            return STALE
        return FRESH

    def status(self, interval_s: float | None = None) -> dict[str, Any]:
        return {
            "freshness": self.freshness(interval_s),
            "last_attempt": _iso(self.last_attempt),
            "last_success": _iso(self.last_success),
            "last_error": self.last_error,
            "last_status": self.last_status,
            "failures": self.failures,
            "blocked_until": _iso(self.blocked_until),
            "backoff_until": _iso(self.backoff_until),
            "next_allowed_in_s": max(0.0, round(self.seconds_until_allowed(), 1)),
        }

    # --------------------------------------------------------- persistence

    def to_dict(self) -> dict[str, Any]:
        return {
            "last_attempt": self.last_attempt,
            "last_success": self.last_success,
            "etag": self.etag,
            "last_modified": self.last_modified,
            "blocked_until": self.blocked_until,
            "backoff_until": self.backoff_until,
            "failures": self.failures,
            "last_error": self.last_error,
            "last_status": self.last_status,
            "extra": dict(self.extra),
        }

    @classmethod
    def from_dict(
        cls,
        data: dict[str, Any] | None,
        min_interval_s: float,
        now: Callable[[], float] = time.time,
    ) -> "FeedPolicy":
        data = data or {}
        policy = cls(min_interval_s=min_interval_s, now=now)
        for key in (
            "last_attempt",
            "last_success",
            "etag",
            "last_modified",
            "blocked_until",
            "backoff_until",
            "failures",
            "last_error",
            "last_status",
        ):
            if key in data and data[key] is not None:
                setattr(policy, key, data[key])
        policy.extra = dict(data.get("extra") or {})
        return policy


def parse_retry_after(value: str | None, now: float | None = None) -> float | None:
    """Retry-After header: seconds or HTTP date; returns seconds or None."""
    if not value:
        return None
    value = value.strip()
    if value.isdigit():
        return float(value)
    try:
        from email.utils import parsedate_to_datetime

        when = parsedate_to_datetime(value)
    except (TypeError, ValueError, IndexError):
        return None
    if when.tzinfo is None:
        return None
    reference = now if now is not None else time.time()
    return max(0.0, when.timestamp() - reference)


def _iso(ts: float | None) -> str | None:
    if ts is None:
        return None
    from datetime import datetime, timezone

    return datetime.fromtimestamp(ts, tz=timezone.utc).isoformat(timespec="seconds")
