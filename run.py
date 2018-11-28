import configparser
import argparse
import json
import os
import subprocess
import logging

logging.getLogger().setLevel(logging.WARNING)

parser = argparse.ArgumentParser(description='End-to-end Ocean Testing')
parser.add_argument('action', metavar='action', type=str, help='the action to run')
parser.add_argument('-c', '--client', dest='client', type=str, help='the client to run on')
parser.add_argument('-i', '--input', dest='input', type=str, help='input string')
parser.add_argument('-f', '--file-input', dest='file', type=str, help='input file')
parser.add_argument('--config', dest='config', type=str, help='supply a config file')
parser.add_argument('-v', '--verbose', dest='verbose', action='store_true', help='verbose output')

args = parser.parse_args()


# helper functions
def dump_js(file, data):
    data_js = json.dumps(data, indent=4, separators=(',', ': ')).replace('\"', '\'')
    if args.client == 'browser':
        data_js = 'const {} = {}'.format(file, data_js)
    elif args.client == 'node':
        data_js = 'module.exports = Object.freeze({});'.format(data_js)

    with open('{}/{}.js'.format(args.client, file), 'w') as dump_file_js:
        dump_file_js.write(data_js)


# Prepare the config for each client
CONFIG_FILE = os.getenv('CONFIG_FILE', 'config.ini')
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
    dump_js('config', config_js)

# python: config available as ```import CONFIG_FILE from ..config```
if args.client == 'python':
    with open('{}/config.py'.format(args.client), 'w') as config_file_py:
        config_file_py.write('CONFIG_FILE = "{}"'.format(CONFIG_FILE))


# Prepare the input for each client
if args.input or args.file:
    if args.input:
        try:
            input_json = json.loads(args.input)
        except json.decoder.JSONDecodeError as e:
            input_json = args.input
    elif args.file:
        try:
            with open(args.file) as input_file:
                input_json = json.load(input_file)
        except json.decoder.JSONDecodeError as e:
            with open(args.file) as input_file:
                input_json = "".join(input_file.readlines()).replace("\n", "")
    # Node/JS: input available as ```const input = require('../input.js');```
    if args.client in ['browser', 'node']:
        dump_js('input', input_json)

    # python: config available as ```import INPUT from ..input```
    if args.client == 'python':
        if isinstance(input_json, str):
            input_json = "'{}'".format(input_json)
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
if args.verbose:
    print(output.decode('utf-8'))
else:
    print(output.decode('utf-8').partition("__result__")[-1])
