import json

from squid_py.ocean.ocean import Ocean

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
ddo = ocean.resolve_did(INPUT)

print("__result__{}".format(json.dumps(ddo.as_dictionary(), indent=2, sort_keys=True)))