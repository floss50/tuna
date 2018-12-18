const { Ocean, Logger, ServiceAgreement } = require('@oceanprotocol/squid')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const {
        did,
        serviceAgreementId,
        serviceDefinitionId
    } = input

    const ddo = await ocean.resolveDID(did)
    Logger.log('DID:', ddo.id)

    const accessService = ddo.findServiceByType('Access')

    const values = ServiceAgreement.getValuesFromService(accessService,
        serviceAgreementId.replace('0x', ''))
    const valueHashes = ServiceAgreement.createValueHashes(values)
    const timeoutValues = ServiceAgreement.getTimeoutValuesFromService(accessService)

    const conditionKeys = accessService.conditions.map((condition) => {
        return condition.conditionKey
    })

    const serviceAgreementHash = ServiceAgreement.hashServiceAgreement(
        accessService.templateId,
        serviceAgreementId.replace('0x', ''),
        conditionKeys,
        valueHashes,
        timeoutValues)

    Logger.log(`__result__${JSON.stringify(
        {
            did,
            serviceDefinitionId,
            serviceAgreementId,
            serviceAgreementHash
        }, null, 2)}`)
})()
