from squid_py.modules.v0_1.accessControl import grantAccess
from squid_py.ocean.ocean import Ocean

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
account_address = ocean.config.get('keeper-contracts', 'account.address')
account_password = ocean.config.get('keeper-contracts', 'account.password')
ocean.set_main_account(account_address, account_password)

did = INPUT['did']
sa_id = INPUT['serviceAgreementId']
sa_hash = INPUT['serviceAgreementHash']
service_id = INPUT['serviceDefinitionId']

_, _, service_def, _ = ocean._get_service_agreement_to_sign(did, service_id)
ocean.main_account.unlock()
grantAccess(ocean._web3, ocean.keeper.contract_path, ocean.main_account, sa_id, service_def)

print("__result__{}".format('access granted'))
