import json
from squid_py.ocean.ocean import Ocean
from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
rcpt = ocean.main_account.request_tokens(INPUT)
ocean._web3.eth.waitForTransactionReceipt(rcpt)

print("__result__{} received {} tokens".format(ocean.main_account.address, INPUT))
