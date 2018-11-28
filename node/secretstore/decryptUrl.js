const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const { sha256 } = require('js-sha256');
const config = require('../config');

(async () => {
    const secretStore = new SecretStore(config)

    const url = 'http://test.com'

    const docId = sha256(Math.random().toString(10))
    try {
        const encryptedUrl = await secretStore.encryptDocument(docId, url)

        Logger.log('EncryptedUrl', encryptedUrl)

        const decryptedUrl = await secretStore.decryptDocument(docId, encryptedUrl)

        Logger.log('__result__DecryptedUrl', decryptedUrl)
    } catch (err) {
        Logger.error(err)
    }
})()
