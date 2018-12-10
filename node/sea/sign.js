const { Ocean, Logger } = require('@oceanprotocol/squid');
const config = require('../config');
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()
    const account = accounts.filter(account => account.id === config.address)[0]

    const ddo = await ocean.resolveDID(input)
    Logger.log('DID:', ddo.id)

    const accessService = ddo.findServiceByType('Access')

    const signServiceAgreementResult = await ocean
        .signServiceAgreement(ddo.id, accessService.serviceDefinitionId, account)
    Logger.log(`__result__${JSON.stringify(signServiceAgreementResult, null, 2)}`)
})()
