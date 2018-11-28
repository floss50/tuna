const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const { sha256 } = require('js-sha256');
const config = require('../config');

(async () => {
    const secretStore = new SecretStore(config)

    const document = {
        ocean: 'is great'
    }

    const documentId = sha256(Math.random().toString(10))
    const encryptedDocument = await secretStore.encryptDocument(documentId, document)

    Logger.log('Encrypted Document:', encryptedDocument)

    const decryptedDocument = await secretStore.decryptDocument(documentId, encryptedDocument)

    Logger.log('__result__Decrypted Document:', JSON.stringify(decryptedDocument, null, 2))
})()
