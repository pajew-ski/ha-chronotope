"""OpenSky Network: anonymous or OAuth2 client-credentials states/all."""

from __future__ import annotations

import time
from typing import Any

from ... import feeds_parse
from ..base import FeedProvider, FetchResult, Failure, bbox_around

STATES_URL = "https://opensky-network.org/api/states/all"
TOKEN_URL = (
    "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token"
)


async def fetch_opensky_states(provider: FeedProvider) -> FetchResult | None:
    """Shared by the OpenSky provider and the adsb.lol fallback path."""
    lat, lon = provider.center()
    radius_km = provider.radius_nm() * feeds_parse.NM_TO_KM
    min_lon, min_lat, max_lon, max_lat = bbox_around(lat, lon, radius_km)
    headers: dict[str, str] = {}
    token = await _access_token(provider)
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return await provider.fetch_url(
        STATES_URL,
        headers=headers,
        params={"lamin": f"{min_lat:.4f}", "lomin": f"{min_lon:.4f}", "lamax": f"{max_lat:.4f}", "lomax": f"{max_lon:.4f}"},
        conditional=False,
    )


async def _access_token(provider: FeedProvider) -> str | None:
    credentials = provider.manager.key("opensky")
    if not credentials or ":" not in credentials:
        return None
    cache = provider.policy.extra.setdefault("opensky_token", {})
    if cache.get("token") and cache.get("expires", 0) > time.time() + 30:
        return cache["token"]
    client_id, client_secret = credentials.split(":", 1)
    try:
        result = await provider.fetch_url(
            TOKEN_URL,
            method="POST",
            data={"grant_type": "client_credentials", "client_id": client_id, "client_secret": client_secret},
            conditional=False,
            max_bytes=64 * 1024,
        )
    except Failure:
        return None
    if result is None:
        return None
    try:
        import json

        doc = json.loads(result.body)
        cache["token"] = doc["access_token"]
        cache["expires"] = time.time() + float(doc.get("expires_in", 1800))
    except (ValueError, KeyError, TypeError):
        return None
    return cache["token"]


class OpenSkyProvider(FeedProvider):
    async def async_fetch(self) -> FetchResult | None:
        # Never poll alongside flights_regional (which falls back on its own).
        regional = self.manager.provider("flights_regional")
        if regional is not None and regional.policy.enabled:
            self.policy.last_error = "idle: flights_regional is active"
            return None
        return await fetch_opensky_states(self)

    def parse(self, body: bytes) -> dict[str, Any]:
        return feeds_parse.parse_opensky(body, self.spec.budget.max_features)
