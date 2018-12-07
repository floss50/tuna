import json

from squid_py.ocean.ocean import Ocean

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
assets = ocean.search_assets_by_text(INPUT)

print("__result__{}".format(json.dumps([a.id for a in assets], indent=2, sort_keys=True)))