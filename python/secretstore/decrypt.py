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
decrypted_document = secret_store.decrypt_document(INPUT['docId'], INPUT['encryptedDocument'])

print("__result__{}".format(decrypted_document))
