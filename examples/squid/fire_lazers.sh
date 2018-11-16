#!/bin/bash

set -e

node listAccounts.js
node registerAsset.js
node signServiceAgreement.js
node executeServiceAgreement.js
