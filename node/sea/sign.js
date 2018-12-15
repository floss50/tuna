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
        serviceAgreementId,
        serviceAgreementHash,
        serviceDefinitionId
    } = input

    const serviceAgreementSignature = await web3.eth.sign(serviceAgreementHash, account.getId())

    Logger.log(`__result__${JSON.stringify(
        {
            did,
            serviceDefinitionId,
            serviceAgreementId,
            serviceAgreementHash,
            serviceAgreementSignature,
            consumerAddress: account.id
        }, null, 2)}`)
})()
