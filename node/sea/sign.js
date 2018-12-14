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

    const ddo = await ocean.resolveDID(input)
    Logger.log('DID:', ddo.id)

    const accessService = ddo.findServiceByType('Access')
    console.log(ddo.id, accessService.serviceDefinitionId, account)


    const signServiceAgreementResult = await ocean
        .signServiceAgreement(ddo.id, accessService.serviceDefinitionId, account)

    const values = ServiceAgreement.getValuesFromService(accessService, signServiceAgreementResult.serviceAgreementId)
    const valueHashes = ServiceAgreement.createValueHashes(values)
    const timeoutValues = ServiceAgreement.getTimeoutValuesFromService(accessService)

    const conditionKeys = accessService.conditions.map((condition) => {
        return condition.conditionKey
    })

    const hash = ServiceAgreement.hashServiceAgreement(
        accessService.templateId,
        signServiceAgreementResult.serviceAgreementId,
        conditionKeys,
        valueHashes,
        timeoutValues)
    console.log(valueHashes, timeoutValues, conditionKeys, hash)

    await ocean
        .initializeServiceAgreement(
            ddo.id,
            accessService.serviceDefinitionId,
            signServiceAgreementResult.serviceAgreementId,
            signServiceAgreementResult.serviceAgreementSignature,
            account)
    Logger.log(`__result__${JSON.stringify(signServiceAgreementResult, null, 2)}`)
})()
