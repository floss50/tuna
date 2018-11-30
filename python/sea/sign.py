import json

from squid_py.ocean.ocean import Ocean
from squid_py.service_agreement.service_factory import ServiceDescriptor
from squid_py.utils.utilities import generate_new_id

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)
account = ocean.accounts[ocean.config.parity_address]

# Call the Register function
service_descriptors = [
    ServiceDescriptor
        .access_service_descriptor(10,
                                   '/purchaseEndpoint',
                                   '/serviceEndpoint',
                                   600,
                                   ('0x%s' % generate_new_id()))]
ddo = ocean.register_asset(INPUT, account.address, service_descriptors)
print("__result__{}".format(json.dumps(ddo.did, indent=2, sort_keys=True)))
