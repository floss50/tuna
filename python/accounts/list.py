import json
from squid_py.ocean.ocean import Ocean
from ..config import CONFIG_FILE

ocean = Ocean(CONFIG_FILE)
accounts = [{'id': k} for k in ocean.accounts.keys()]
print("__result__{}".format(json.dumps(accounts, indent=2, sort_keys=True)))
