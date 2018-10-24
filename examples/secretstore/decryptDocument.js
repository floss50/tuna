const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const { sha256 } = require('js-sha256');

(async () => {
    const secretStore = new SecretStore({
        parityUri: 'http://localhost:9545',
        secretStoreUri: 'https://secret-store.dev-ocean.com',
        password: 'unittest',
        address: '0xed243adfb84a6626eba46178ccb567481c6e655d',
        threshold: 2
    })

    const document = {
        ocean: 'is great'
    }

    const documentId = sha256(Math.random().toString(10))
    const encryptedDocument = await secretStore.encryptDocument(documentId, document)

    Logger.log('Encrypted Document:', encryptedDocument)

    const decryptedDocument = await secretStore.decryptDocument(documentId, encryptedDocument)

    Logger.log('Decrypted Document:', JSON.stringify(decryptedDocument, null, 2))
})()
