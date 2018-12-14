import json

from squid_py.ocean.ocean import Ocean

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
provider_address = ocean.config.get('keeper-contracts', 'provider.address')
provider_password = ocean.config.get('keeper-contracts', 'provider.password')
ocean.set_main_account(provider_address, provider_password)

did = INPUT['did']
sa_id = INPUT['serviceAgreementId']
sa_hash = INPUT['serviceAgreementHash']
sa_signature = INPUT['serviceAgreementSignature']
service_id = INPUT['serviceDefinitionId']
consumer_address = INPUT['consumerAddress']

receipt = ocean.execute_service_agreement(
    service_agreement_id=sa_id,
    service_index=service_id,
    service_agreement_signature=sa_signature,
    did=did,
    consumer_address=consumer_address,
    publisher_address=ocean.main_account.address)

print(receipt)
print("__result__{}".format(json.dumps(
    {
        'transactionHash': receipt['transactionHash'].hex(),
        'blockHash': receipt['blockHash'].hex(),
        'receiptStatus': receipt['status']
    }, indent=2, sort_keys=True)))
