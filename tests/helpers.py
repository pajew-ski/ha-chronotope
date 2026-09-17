"""Load HA-free modules directly by path.

The integration directory must not go on sys.path: it contains platform
modules like calendar.py that would shadow stdlib modules of the same name.
"""

import importlib.util
import sys
from pathlib import Path

_PACKAGE_DIR = Path(__file__).resolve().parent.parent / "custom_components" / "chronotope"


def load_module(name: str):
    """Load ``<name>.py`` from the integration; ``name`` may contain
    slashes for subpackages (``feeds/policy``)."""
    module_name = "chronotope_test_" + name.replace("/", "_")
    if module_name in sys.modules:
        return sys.modules[module_name]
    spec = importlib.util.spec_from_file_location(
        module_name, _PACKAGE_DIR / f"{name}.py"
    )
    module = importlib.util.module_from_spec(spec)
    # Register before exec: dataclass machinery resolves the module through
    # sys.modules when processing annotations.
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module
