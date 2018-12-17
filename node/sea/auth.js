const { Ocean, Logger, ServiceAgreement } = require('@oceanprotocol/squid')
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

    const assetId = did.replace('did:op:', '')
    const serviceAgreement = new ServiceAgreement(serviceAgreementId)
    const accessGranted = await serviceAgreement.grantAccess(assetId, assetId, account)
    Logger.log(`__result__Asset access granted: ${accessGranted}`)
})()
