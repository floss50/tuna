const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const config = require('../config')
const input = require('../input');

(async () => {
    const secretStore = new SecretStore(config)

    try {
        const decryptedDocument = await secretStore.decryptDocument(input.docId, input.encryptedDocument)

        Logger.log('__result__', decryptedDocument)
    } catch (err) {
        Logger.error(err)
    }
})()
