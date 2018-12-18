const { Logger, IdGenerator } = require('@oceanprotocol/squid')
const input = require('../input');

(async () => {
    const { did } = input

    const serviceDefinitionId = '0'
    const serviceAgreementId = `0x${IdGenerator.generateId()}`

    Logger.log(`__result__${JSON.stringify(
        {
            did,
            serviceDefinitionId,
            serviceAgreementId
        }, null, 2)}`)
})()
