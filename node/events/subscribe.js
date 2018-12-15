const { Ocean, Logger, ServiceAgreement, EventListener } = require('@oceanprotocol/squid')
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

    const id = did.replace('did:op:', '')
    const ddo = await ocean.resolveDID(did)

    const accessService = ddo.findServiceByType('Access')
    const metadataService = ddo.findServiceByType('Metadata')

    const event = EventListener.subscribe(
        accessService.serviceAgreementContract.contractName,
        accessService.serviceAgreementContract.events[0].name, {
            serviceAgreementId
        })

    event.listenOnce(async (data) => {
        Logger.log(data)
        const sa = new ServiceAgreement(data.returnValues.serviceAgreementId)
        await web3.eth.personal.unlockAccount(config.address, config.password)
        await sa.payAsset(
            id,
            metadataService.metadata.base.price,
            account
        )
        Logger.log('Completed asset payment, now access should be granted.')
    })
})()
