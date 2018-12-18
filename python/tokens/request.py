from squid_py.ocean.ocean import Ocean
from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
account_address = ocean.config.get('keeper-contracts', 'account.address')
account_password = ocean.config.get('keeper-contracts', 'account.password')
ocean.set_main_account(account_address, account_password)

rcpt = ocean.main_account.request_tokens(INPUT)
ocean._web3.eth.waitForTransactionReceipt(rcpt)

print("__result__{} received {} tokens".format(ocean.main_account.address, INPUT))
