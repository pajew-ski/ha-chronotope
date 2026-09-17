"""Politeness policy: backoff, circuit breaker, blocking, persistence."""

import unittest

from helpers import load_module

_policy = load_module("feeds/policy")
FeedPolicy = _policy.FeedPolicy
parse_retry_after = _policy.parse_retry_after


class Clock:
    def __init__(self, start=1_000_000.0):
        self.t = start

    def __call__(self):
        return self.t

    def advance(self, seconds):
        self.t += seconds


class FeedPolicyTestCase(unittest.TestCase):
    def setUp(self):
        self.clock = Clock()
        self.policy = FeedPolicy(min_interval_s=60, now=self.clock)

    def test_min_interval_enforced(self):
        self.assertTrue(self.policy.can_attempt())
        self.policy.record_attempt()
        self.policy.record_success()
        self.assertFalse(self.policy.can_attempt())
        self.assertAlmostEqual(self.policy.seconds_until_allowed(), 60)
        self.clock.advance(61)
        self.assertTrue(self.policy.can_attempt())

    def test_backoff_sequence(self):
        delays = []
        for _ in range(4):
            self.policy.record_attempt()
            self.policy.record_failure("HTTP 503", status=503)
            delays.append(round(self.policy.seconds_until_allowed()))
            self.clock.advance(self.policy.seconds_until_allowed())
        self.assertEqual(delays, [60, 120, 240, 480])

    def test_circuit_breaker_after_five_failures(self):
        for _ in range(5):
            self.policy.record_attempt()
            self.policy.record_failure("timeout")
            self.clock.advance(10)
        self.assertEqual(self.policy.freshness(), "error")
        self.assertGreater(self.policy.seconds_until_allowed(), 3500)
        self.clock.advance(3601)
        self.assertTrue(self.policy.can_attempt())

    def test_success_resets_failures(self):
        self.policy.record_failure("x")
        self.policy.record_failure("x")
        self.policy.record_success(etag='"abc"')
        self.assertEqual(self.policy.failures, 0)
        self.assertEqual(self.policy.freshness(), "fresh")
        self.assertEqual(self.policy.conditional_headers(), {"If-None-Match": '"abc"'})

    def test_blocked_codes_with_retry_after(self):
        for status in (401, 403, 404, 429):
            policy = FeedPolicy(min_interval_s=10, now=self.clock)
            policy.record_blocked(status, retry_after_s=120 if status == 429 else None)
            self.assertEqual(policy.freshness(), "blocked", status)
            expected = 120 if status == 429 else 6 * 3600
            self.assertAlmostEqual(policy.seconds_until_allowed(), expected)
            self.assertFalse(policy.can_attempt())

    def test_no_fetch_before_min_interval_after_restart(self):
        self.policy.record_attempt()
        self.policy.record_success()
        persisted = self.policy.to_dict()
        # Simulated restart 30 s later: the new instance must honor the gap.
        self.clock.advance(30)
        restored = FeedPolicy.from_dict(persisted, min_interval_s=60, now=self.clock)
        self.assertFalse(restored.can_attempt())
        self.assertAlmostEqual(restored.seconds_until_allowed(), 30)
        self.clock.advance(31)
        self.assertTrue(restored.can_attempt())

    def test_budget_exceeded_is_error_with_last_state_kept(self):
        self.policy.record_success()
        self.policy.record_budget_exceeded("response exceeded 5 MB")
        self.assertEqual(self.policy.freshness(), "error")
        self.assertIsNotNone(self.policy.last_success)
        self.assertEqual(self.policy.last_error, "response exceeded 5 MB")

    def test_stale_after_three_intervals(self):
        self.policy.record_attempt()
        self.policy.record_success()
        self.clock.advance(2 * 60)
        self.assertEqual(self.policy.freshness(), "fresh")
        self.clock.advance(2 * 60)
        self.assertEqual(self.policy.freshness(), "stale")

    def test_not_modified_counts_as_success(self):
        self.policy.record_failure("x")
        self.policy.record_not_modified()
        self.assertEqual(self.policy.freshness(), "fresh")
        self.assertEqual(self.policy.last_status, 304)

    def test_disabled_freshness(self):
        self.policy.enabled = False
        self.assertEqual(self.policy.freshness(), "disabled")
        self.assertFalse(self.policy.can_attempt())

    def test_retry_after_parsing(self):
        self.assertEqual(parse_retry_after("120"), 120.0)
        self.assertIsNone(parse_retry_after(None))
        self.assertIsNone(parse_retry_after("soon"))
        self.assertAlmostEqual(
            parse_retry_after("Wed, 21 Oct 2015 07:28:00 GMT", now=1445412480.0 - 60), 60.0
        )
