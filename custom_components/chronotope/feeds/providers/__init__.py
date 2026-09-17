"""Provider registry: provider name (catalog) -> FeedProvider subclass."""

from __future__ import annotations

from .adsb_lol import AdsbLolProvider
from .aisstream import AisStreamProvider
from .celestrak import CelestrakProvider
from .eonet import EonetProvider
from .firms import FirmsProvider
from .generic import GeoJsonUrlProvider
from .gfw import GfwProvider
from .ioda import IodaProvider
from .ll2 import LaunchLibraryProvider
from .natural_earth import NaturalEarthProvider
from .onionoo import OnionooProvider
from .opensky import OpenSkyProvider
from .overpass import OverpassProvider
from .radio_browser import RadioBrowserProvider
from .swpc import SwpcProvider
from .telegeography import TeleGeographyProvider
from .ucdp import UcdpApiProvider, UcdpCandidateProvider
from .unhcr import UnhcrProvider
from .usgs import UsgsProvider

PROVIDERS = {
    "adsb_lol": AdsbLolProvider,
    "opensky": OpenSkyProvider,
    "celestrak": CelestrakProvider,
    "usgs": UsgsProvider,
    "ll2": LaunchLibraryProvider,
    "eonet": EonetProvider,
    "ucdp": UcdpCandidateProvider,
    "ucdp_api": UcdpApiProvider,
    "swpc": SwpcProvider,
    "onionoo": OnionooProvider,
    "overpass": OverpassProvider,
    "natural_earth": NaturalEarthProvider,
    "telegeography": TeleGeographyProvider,
    "radio_browser": RadioBrowserProvider,
    "aisstream": AisStreamProvider,
    "firms": FirmsProvider,
    "gfw": GfwProvider,
    "unhcr": UnhcrProvider,
    "ioda": IodaProvider,
    "geojson_url": GeoJsonUrlProvider,
}
