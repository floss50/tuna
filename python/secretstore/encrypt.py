import json
import hashlib
import random
import configparser
from secret_store_client.client import Client
from ..input import INPUT
from ..config import CONFIG_FILE

config = configparser.ConfigParser()
config.read(CONFIG_FILE)
secret_store = Client(secret_store_url=config['keeper-contracts']['secret_store.url'],
                      parity_client_url=config['keeper-contracts']['parity.url'],
                      address=config['keeper-contracts']['parity.address'],
                      password=config['keeper-contracts']['parity.password'])
doc_id = hashlib.sha256(str(random.random()).encode()).hexdigest()
encrypted_document = secret_store.publish_document(doc_id, INPUT)

result = {
    'docId': doc_id,
    'encryptedDocument': encrypted_document
}
print("__result__{}".format(json.dumps(result, indent=2, sort_keys=True)))
