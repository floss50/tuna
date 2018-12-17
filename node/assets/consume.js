const {
    Ocean,
    Logger,
    WebServiceConnectorProvider,
    SecretStoreProvider
} = require('@oceanprotocol/squid')

const Web3 = require('web3')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)
    const web3Provider = config.web3Provider || new Web3.providers.HttpProvider(config.nodeUri)
    const web3 = new Web3(Web3.givenProvider || web3Provider)
    await web3.eth.personal.unlockAccount(config.address, config.password)

    const accounts = await ocean.getAccounts()
    const account = accounts.filter(account =>
        account.id === config.address)[0]

    const {
        did,
        serviceAgreementId
    } = input

    const ddo = await ocean.resolveDID(did)

    const assetId = did.replace('did:op:', '')

    const accessService = ddo.findServiceByType('Access')
    const metadataService = ddo.findServiceByType('Metadata')

    const webConnector = WebServiceConnectorProvider.getConnector()
    const contentUrls = await SecretStoreProvider
        .getSecretStore()
        .decryptDocument(assetId, metadataService.metadata.base.contentUrls[0])

    const serviceUrl = accessService.serviceEndpoint
    Logger.log('Consuming asset files using service url: ', serviceUrl)
    const files = []
    for (const cUrl of contentUrls) {
        let url = serviceUrl + `?url=${cUrl}`
        url = url + `&serviceAgreementId=${serviceAgreementId}`
        url = url + `&consumerAddress=${account.getId()}`
        Logger.log('Fetching asset from: ', url)
        const response = await webConnector.get(url)
        const responseBuffer = await response.buffer()
        const urlParts = cUrl.split('/')
        const filename = urlParts[urlParts.length - 1]
        Logger.debug(`Got response: filename is ${filename}, url is ${response.url}`)
        files.push(responseBuffer.toString('utf8'))
    }
    Logger.log(`__result__${JSON.stringify(files, null, 2)}`)
})()
