const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const { sha256 } = require('js-sha256');

(async () => {
    const secretStore = new SecretStore({
        parityUri: 'http://localhost:9545',
        secretStoreUri: 'https://secret-store.dev-ocean.com',
        threshold: 2,
        password: 'unittest',
        address: '0xed243adfb84a6626eba46178ccb567481c6e655d'
    })

    const url = 'http://test.com'

    const docId = sha256(Math.random().toString(10))
    try {
        const encryptedUrl = await secretStore.encryptDocument(docId, url)

        Logger.log(encryptedUrl)

        const decryptedUrl = await secretStore.decryptDocument(docId, encryptedUrl)

        Logger.log(decryptedUrl)
    } catch (err) {
        Logger.error(err)
    }
})()
