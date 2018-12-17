const { Ocean, Logger, DID } = require('@oceanprotocol/squid')
const Web3 = require('web3')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)
    const web3Provider = config.web3Provider || new Web3.providers.HttpProvider(config.nodeUri)
    const web3 = new Web3(Web3.givenProvider || web3Provider)

    const accounts = await ocean.getAccounts()
    const account = accounts.filter(account =>
        account.id === config.address)[0]

    const {
        did,
        serviceAgreementId
    } = input

    const assetId = DID.parse(did).getId()

    const ddo = await ocean.resolveDID(did)
    const metadataService = ddo.findServiceByType('Metadata')
    const { price } = metadataService.metadata.base

    const { paymentConditions, token } = await ocean.keeper

    await web3.eth.personal.unlockAccount(config.address, config.password)
    await token.approve(paymentConditions.getAddress(), price, account.getId())

    await web3.eth.personal.unlockAccount(config.address, config.password)
    await paymentConditions
        .lockPayment(
            serviceAgreementId,
            assetId,
            price,
            account.getId())

    Logger.log(`__result__Payed: ${price} for Asset. Access should be granted`)
})()
