from squid_py.ocean.ocean import Ocean
from ..config import CONFIG_FILE

ocean = Ocean(CONFIG_FILE)
print("__result__{}".format(ocean.accounts))
