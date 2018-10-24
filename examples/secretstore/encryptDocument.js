const SecretStore = require('@oceanprotocol/secret-store-client').default
const { Logger } = require('@oceanprotocol/squid')
const { BigNumber } = require('bignumber.js')

function generateRandomId() {
    const id = BigNumber.random(64).toString().replace('0.', '')

    // sometimes it only generates 63 digits
    return id.length === 63 ? id + '0' : id
}

(async () => {
    const secretStore = new SecretStore({
        parityUri: 'http://localhost:9545',
        secretStoreUri: 'https://secret-store.dev-ocean.com',
        threshold: 2,
        password: 'unittest',
        address: '0xed243adfb84a6626eba46178ccb567481c6e655d'
    })

    const document = {
        ocean: 'is great'
    }

    const docId = generateRandomId()
    const encryptedDocument = await secretStore.encryptDocument(docId, document)

    Logger.log(encryptedDocument)
})()
