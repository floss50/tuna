const { Ocean, Logger, EventListener } = require('@oceanprotocol/squid')

const Web3 = require('web3')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const {
        did,
        serviceAgreementId
    } = input

    const ddo = await ocean.resolveDID(did)

    const accessService = ddo.findServiceByType('Access')

    const executeAgreementEvent = EventListener.subscribe(
        accessService.serviceAgreementContract.contractName,
        'ExecuteAgreement',
        { serviceAgreementId })
    executeAgreementEvent.listenOnce(async (data) => {
        Logger.log('ExecuteAgreement')
    })

    const payEvent = EventListener.subscribe(
        accessService.conditions[0].contractName,
        'PaymentLocked',
        { serviceAgreementId })
    payEvent.listenOnce(async (data) => {
        Logger.log('PaymentLocked')
    })

    const accessEvent = EventListener.subscribe(
        accessService.conditions[1].contractName,
        'AccessGranted',
        {})
    accessEvent.listenOnce(async (data) => {
        Logger.log('AccessGranted')
    })

    const PaymentReleased = EventListener.subscribe(
        accessService.conditions[0].contractName,
        'PaymentReleased',
        { serviceAgreementId })
    PaymentReleased.listenOnce(async (data) => {
        Logger.log('PaymentReleased')
    })

    const PaymentRefund = EventListener.subscribe(
        accessService.conditions[0].contractName,
        'PaymentRefund',
        { serviceAgreementId })
    PaymentRefund.listenOnce(async (data) => {
        Logger.log('PaymentRefund')
    })

    const AgreementFulfilled = EventListener.subscribe(
        accessService.serviceAgreementContract.contractName,
        'AgreementFulfilled',
        { serviceAgreementId })
    AgreementFulfilled.listenOnce(async (data) => {
        Logger.log('AgreementFulfilled')
    })

})()
