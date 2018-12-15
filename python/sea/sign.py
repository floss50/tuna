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
service_id = INPUT['serviceDefinitionId']

ddo = ocean.resolve_did(did)
service = ddo.get_service(service_type=ServiceTypes.ASSET_ACCESS)
sa = ServiceAgreement.from_service_dict(service.as_dictionary())
sa_signature, _ = sa.get_signed_agreement_hash(ocean._web3, ocean.keeper.contract_path, sa_id, account_address)

print("__result__{}".format(json.dumps(
    {
        'did': did,
        'serviceDefinitionId': service_id,
        'serviceAgreementId': sa_id,
        'serviceAgreementHash': sa_hash,
        'serviceAgreementSignature': sa_signature,
        'consumerAddress': account_address
    }, indent=2, sort_keys=True)))
