const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const { sha256 } = require('js-sha256');
const config = require('../config');
const input = require('../input');

(async () => {
    const secretStore = new SecretStore(config)

    const docId = sha256(Math.random().toString(10))
    const encryptedDocument = await secretStore.encryptDocument(docId, input)

    const result = {
        docId,
        encryptedDocument
    }

    Logger.log(`__result__${JSON.stringify(result, null, 2)}`)
})()
