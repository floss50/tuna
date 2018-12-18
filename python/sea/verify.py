import json

from squid_py.service_agreement.service_agreement import ServiceAgreement
from squid_py.service_agreement.service_types import ServiceTypes
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
sa_signature = INPUT['serviceAgreementSignature']
sa_consumer = INPUT['consumerAddress']
service_id = INPUT['serviceDefinitionId']

ddo = ocean.resolve_did(did)
service = ddo.get_service(service_type=ServiceTypes.ASSET_ACCESS)
sa = ServiceAgreement.from_service_dict(service.as_dictionary())

print("__result__{}".format(json.dumps(
    {
        'valid': ocean.verify_service_agreement_signature(
            did,
            sa_id,
            service_id,
            sa_consumer,
            sa_signature)
    }, indent=2, sort_keys=True)))



