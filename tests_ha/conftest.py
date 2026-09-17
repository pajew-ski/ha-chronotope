"""Runtime tests against a real Home Assistant test instance.

Not part of the default CI (which stays HA-free); run with
``pip install pytest-homeassistant-custom-component`` and
``python -m pytest tests_ha``.
"""

import pytest

pytest_plugins = "pytest_homeassistant_custom_component"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    yield


@pytest.fixture(autouse=True)
def clean_chronotope_files(hass):
    """The test config dir is shared; drop the SQLite db and cache between tests."""
    import shutil
    from pathlib import Path

    for name in ("chronotope.db", "chronotope_cache"):
        path = Path(hass.config.path(name))
        if path.is_dir():
            shutil.rmtree(path, ignore_errors=True)
        elif path.exists():
            path.unlink()
    yield
    for name in ("chronotope.db", "chronotope_cache"):
        path = Path(hass.config.path(name))
        if path.is_dir():
            shutil.rmtree(path, ignore_errors=True)
        elif path.exists():
            path.unlink()
