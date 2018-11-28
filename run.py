import configparser
import argparse
import json
import os
import subprocess

parser = argparse.ArgumentParser(description='End-to-end Ocean Testing')
parser.add_argument('action', metavar='action', type=str, help='the action to run')
parser.add_argument('--client', dest='client', type=str, help='the client to run on')
parser.add_argument('--config', dest='config', type=str, help='supply a config file')

args = parser.parse_args()

CONFIG_FILE = 'config.ini'
if args.config is not None:
    CONFIG_FILE = args.config

if args.client in ['browser', 'node']:
    config = configparser.ConfigParser()
    config.read(CONFIG_FILE)
    config_js = {
        'nodeUri': config['keeper-contracts']['keeper.url'],
        'parityUri': config['keeper-contracts']['parity.url'],
        'secretStoreUri': config['keeper-contracts']['secret_store.url'],
        'password': config['keeper-contracts']['parity.password'],
        'address': config['keeper-contracts']['parity.address'],
        'threshold': 0,
        'aquariusUri': config['resources']['aquarius.url'],
        'brizoUri': config['resources']['brizo.url'],
    }

    config_js = json.dumps(config_js, indent=4, separators=(',', ': ')).replace('\"', '\'')
    if args.client == 'browser':
        config_js = 'const config = {}'.format(config_js)
    elif args.client == 'node':
        config_js = 'module.exports = Object.freeze({});'.format(config_js)

    with open('{}/config.js'.format(args.client), 'w') as config_file_js:
        config_file_js.write(config_js)

if args.client == 'python':
    with open('{}/config.py'.format(args.client), 'w') as config_file_py:
        config_file_py.write('CONFIG_FILE = "{}"'.format(CONFIG_FILE))

if args.client == 'browser':
    os.chdir(args.client)
    cmd = "python -m http.server 8000"
    print('open your browser in dev console on http://localhost:8000')
elif args.client == 'node':
    os.chdir(args.client)
    cmd = "node {}.js".format(args.action)
elif args.client == 'python':
    cmd = "python -m {}.{}".format(args.client, args.action.replace("/", "."))

process = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE)
output, error = process.communicate()
print(output.decode('utf-8').partition("__result__")[-1])

