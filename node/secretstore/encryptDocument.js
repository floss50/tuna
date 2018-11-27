const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const { sha256 } = require('js-sha256');

(async () => {
    const secretStore = new SecretStore({
        parityUri: 'http://localhost:9545',
        secretStoreUri: 'http://localhost:12001',
        threshold: 0,
        password: 'unittest',
        address: '0xed243adfb84a6626eba46178ccb567481c6e655d'
    })

    const document = {
        ocean: 'is great'
    }

    const docId = sha256(Math.random().toString(10))
    const encryptedDocument = await secretStore.encryptDocument(docId, document)

    Logger.log('EncryptedDocument', encryptedDocument)
})()
