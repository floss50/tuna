import json

from squid_py.utils.utilities import get_metadata_url, prepare_purchase_payload
from squid_py.service_agreement.service_agreement import ServiceAgreement
from squid_py.service_agreement.service_types import ServiceTypes
from squid_py.ocean.ocean import Ocean

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)


ocean = Ocean(CONFIG_FILE)
consumer_address = ocean.config.get('keeper-contracts', 'consumer.address')
consumer_password = ocean.config.get('keeper-contracts', 'consumer.password')
ocean.set_main_account(consumer_address, consumer_password)

did = INPUT['did']
sa_id = INPUT['serviceAgreementId']
sa_hash = INPUT['serviceAgreementHash']
sa_signature = INPUT['serviceAgreementSignature']
service_id = INPUT['serviceDefinitionId']

ddo = ocean.resolve_did(did)
service = ddo.get_service(service_type=ServiceTypes.ASSET_ACCESS)
sa = ServiceAgreement.from_service_dict(service.as_dictionary())

# Must approve token transfer for this purchase
ocean._approve_token_transfer(sa.get_price())

payload = prepare_purchase_payload(did, sa_id, service_id, sa_signature, consumer_address)
response = ocean._http_client.post(
    sa.purchase_endpoint, data=payload, headers={'content-type': 'application/json'}
)

print("__result__{}".format(json.dumps(
    {
        'response': response.status_code
    }, indent=2, sort_keys=True)))


