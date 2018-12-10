import json

from squid_py.ocean.ocean import Ocean
from squid_py.service_agreement.service_agreement import ServiceAgreement
from squid_py.service_agreement.service_types import ServiceTypes

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
account = ocean.accounts[ocean.config.parity_address]
ddo = ocean.resolve_did(INPUT)

service = ddo.get_service(service_type=ServiceTypes.ASSET_ACCESS)
sa = ServiceAgreement.from_service_dict(service.as_dictionary())

service_agreement_id = ocean\
    .sign_service_agreement(ddo.did, sa.sa_definition_id, account)

print("__result__{}".format(json.dumps(service_agreement_id, indent=2, sort_keys=True)))
