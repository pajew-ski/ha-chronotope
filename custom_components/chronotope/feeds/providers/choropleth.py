"""Shared base for choropleth providers: values per ISO code joined onto
Natural Earth countries (110m). Uses the running ``countries`` provider's
data when present, otherwise fetches the same file into the same cache."""

from __future__ import annotations

from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult, Failure
from .natural_earth import COUNTRY_PROPS, NE_URL


class ChoroplethProvider(FeedProvider):
    calls_per_cycle = 2
    value_kind = "choropleth"

    async def _countries(self) -> list[dict[str, Any]]:
        countries = self.manager.provider("countries")
        if countries is not None and hasattr(countries, "features"):
            features = countries.features()
            if features:
                return features
        cached = self.policy.extra.get("countries_cached")
        if cached and self._countries_cache:
            return self._countries_cache
        result = await self.fetch_url(
            NE_URL.format(dataset="ne_110m_admin_0_countries"), conditional=False, allow_redirects=True, max_bytes=20_000_000
        )
        if result is None:
            raise Failure("countries not available")
        parsed = await self.hass.async_add_executor_job(
            lambda: feeds_parse.parse_geojson_features(result.body, "country", "ne", label_keys=("NAME", "name"), keep_properties=COUNTRY_PROPS)
        )
        self._countries_cache = parsed["features"]
        self.policy.extra["countries_cached"] = True
        return self._countries_cache

    _countries_cache: list[dict[str, Any]] = []

    async def async_fetch_values(self) -> dict[str, float] | None:
        """Values per ISO code; None means 'not modified'. Subclasses may
        set ``self._extra`` (per-code detail) and ``self._source_time``."""
        raise NotImplementedError

    _extra: dict[str, dict[str, Any]] | None = None

    async def async_fetch(self) -> FetchResult | None:
        self._extra = None
        values = await self.async_fetch_values()
        if values is None:
            return None
        countries = await self._countries()
        joined = await self.hass.async_add_executor_job(
            lambda: feeds_parse.choropleth_join(countries, values, self.value_kind, extra=self._extra)
        )
        self._joined = joined
        return FetchResult(200, b"{}", {})

    _joined: dict[str, Any] | None = None

    def parse(self, body: bytes) -> dict[str, Any]:
        joined = self._joined or {"features": [], "unknown": [], "matched": 0, "vmax": 0}
        features, truncated = feeds_parse._truncate(joined["features"], self.spec.budget.max_features)
        return {
            "features": features,
            "source_time": None,
            "truncated": truncated,
            "unknown_codes": joined["unknown"],
            "matched": joined["matched"],
            "vmax": joined["vmax"],
        }

    def _set_payload(self, parsed: dict[str, Any]) -> None:
        super()._set_payload(parsed)
        self.policy.extra["unknown_codes"] = parsed.get("unknown_codes")
        self.policy.extra["vmax"] = parsed.get("vmax")

    def meta(self) -> dict[str, Any]:
        meta = super().meta()
        meta["unknown_codes"] = self.policy.extra.get("unknown_codes") or []
        meta["vmax"] = self.policy.extra.get("vmax")
        return meta
