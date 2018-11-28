import configparser
import argparse
import json
import os
import subprocess

parser = argparse.ArgumentParser(description='End-to-end Ocean Testing')
parser.add_argument('action', metavar='action', type=str, help='the action to run')
parser.add_argument('-c', '--client', dest='client', type=str, help='the client to run on')
parser.add_argument('-i', '--input', dest='input', type=str, help='input string')
parser.add_argument('--config', dest='config', type=str, help='supply a config file')

args = parser.parse_args()


# Prepare the config for each client
CONFIG_FILE = 'config.ini'
if args.config is not None:
    CONFIG_FILE = args.config

# Node/JS: config available as ```const config = require('../config.js');```
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

# python: config available as ```import CONFIG_FILE from ..config```
if args.client == 'python':
    with open('{}/config.py'.format(args.client), 'w') as config_file_py:
        config_file_py.write('CONFIG_FILE = "{}"'.format(CONFIG_FILE))


# Prepare the input for each client
if args.input:
    try:
        input_str = json.loads(args.input)
    except json.decoder.JSONDecodeError as e:
        input_str = args.input
    if args.client in ['browser', 'node']:
        input_json = json.dumps(input_str, indent=4, separators=(',', ': ')).replace('\"', '\'')
    if args.client == 'python':
        input_json = input_str

# Node/JS: input available as ```const input = require('../input.js');```
if args.input and args.client in ['browser', 'node']:
    if args.client == 'browser':
        input_js = 'const input = {}'.format(input_json)
    elif args.client == 'node':
        input_js = 'module.exports = Object.freeze({});'.format(input_json)

    with open('{}/input.js'.format(args.client), 'w') as input_file_js:
        input_file_js.write(input_js)

# python: config available as ```import INPUT from ..input```
if args.input and args.client == 'python':
    with open('{}/input.py'.format(args.client), 'w') as input_file_py:
        input_file_py.write('INPUT = {}'.format(input_json))


# Create and run the command
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

