import json

from squid_py.ocean.ocean import Ocean

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
did = INPUT

service_id = '1'
sa_id, sa, _, _ = ocean._get_service_agreement_to_sign(did, service_id)

print("__result__{}".format(json.dumps(
    {
        'did': did,
        'serviceDefinitionId': service_id,
        'serviceAgreementId': sa_id
    }, indent=2, sort_keys=True)))
