#!/bin/bash

set -e

node decryptDocument.js
node decryptUrl.js
node encryptDocument.js
