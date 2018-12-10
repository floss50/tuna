const { Ocean, Logger } = require('@oceanprotocol/squid');
const config = require('../config');
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()
    const publisherAccount = accounts[0]
    const consumerAccount = accounts[1]

    Logger.log('Publisher ID:', publisherAccount.getId())

    const ddo = await ocean.resolveDID(input)
    Logger.log('DID:', ddo.id)

    const accessService = ddo.findServiceByType('Access')

    const signServiceAgreementResult = await ocean
        .signServiceAgreement(ddo.id, accessService.serviceDefinitionId, consumerAccount)
    Logger.log('ServiceAgreementId', signServiceAgreementResult.serviceAgreementId)
    Logger.log('serviceAgreementSignature', signServiceAgreementResult.serviceAgreementSignature)

    const serviceAgreement = await ocean
        .executeServiceAgreement(
            ddo.id,
            accessService.serviceDefinitionId,
            signServiceAgreementResult.serviceAgreementId,
            signServiceAgreementResult.serviceAgreementSignature,
            consumerAccount,
            publisherAccount)
    Logger.log('ServiceAgreementId', serviceAgreement.getId())
})()
