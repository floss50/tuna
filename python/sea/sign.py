import json
import time

from web3 import Web3
from squid_py.ocean.ocean import Ocean

from ..config import CONFIG_FILE
from ..input import INPUT

import logging
logging.getLogger().setLevel(logging.WARNING)


def wait_for_event(event, arg_filter, wait_iterations=20):
    _filter = event.createFilter(fromBlock=0, argument_filters=arg_filter)
    for check in range(wait_iterations):
        events = _filter.get_all_entries()
        if events:
            return events[0]
        time.sleep(0.5)


ocean = Ocean(CONFIG_FILE)
cons_address = ocean.config.get('keeper-contracts', 'parity.address1')
cons_password = ocean.config.get('keeper-contracts', 'parity.password1')
ocean.set_main_account(cons_address, cons_password)
# Call the Register function
did = INPUT
service_index = "1"
if isinstance(INPUT, dict):
    did = INPUT['did']
    service_index = INPUT['serviceDefinitionId']

service_agreement_id = ocean.sign_service_agreement(did, service_index, ocean.main_account.address)
print("__result__{}".format(json.dumps(service_agreement_id, indent=2, sort_keys=True)))
print("Please wait, processing keeper events.")

filter1 = {'serviceAgreementId': Web3.toBytes(hexstr=service_agreement_id)}
filter_2 = {'serviceId': Web3.toBytes(hexstr=service_agreement_id)}

executed = wait_for_event(ocean.keeper.service_agreement.events.ExecuteAgreement, filter1)
assert executed
granted = wait_for_event(ocean.keeper.access_conditions.events.AccessGranted, filter_2)
assert granted
fulfilled = wait_for_event(ocean.keeper.service_agreement.events.AgreementFulfilled, filter1, 60)
if fulfilled:
    print("Success, consume completed, check the downloads folder %s" % ocean._downloads_path)
else:
    print("Cosuming asset failed, check logs of this squid instance and logs of running Brizo service.")
