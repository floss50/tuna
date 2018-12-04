import json

from squid_py.ocean.ocean import Ocean
from squid_py.service_agreement.service_factory import ServiceDescriptor
from squid_py.utils.utilities import generate_prefixed_id

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)

ocean = Ocean(CONFIG_FILE)

_url = ocean.config.get('resources', 'brizo.url') if ocean.config.has_option('resources', 'brizo.url') else 'http://localhost:8030'
brizo_url = '{}/api/v1/brizo'.format(_url)
purchase_endpoint = '{}/services/access/initialize'.format(brizo_url)
service_endpoint = '{}/services/consume'.format(brizo_url)

# Call the Register function
service_descriptors = [
    ServiceDescriptor
        .access_service_descriptor(10,
                                   purchase_endpoint,
                                   service_endpoint,
                                   600,
                                   generate_prefixed_id())]
ddo = ocean.register_asset(INPUT, ocean.main_account.address, service_descriptors)
print("__result__{}".format(json.dumps(ddo.did, indent=2, sort_keys=True)))
