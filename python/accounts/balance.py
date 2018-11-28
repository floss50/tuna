import json
from squid_py.ocean.ocean import Ocean
from ..config import CONFIG_FILE

ocean = Ocean(CONFIG_FILE)
account = ocean.accounts[ocean.config.parity_address]
balance = account.get_balance()
response = {
    'eth': balance.eth,
    'ocn': balance.ocn,
}
print("__result__{}".format(json.dumps(response, indent=2, sort_keys=True)))
