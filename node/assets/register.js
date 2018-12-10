const { Ocean, Logger } = require('@oceanprotocol/squid')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const configAddress = config.address.toLowerCase()
    const accounts = await ocean.getAccounts()
    const publisherAccount = accounts.filter(account => account.id.toLowerCase() === configAddress)[0]
    Logger.log('Publisher ID:', publisherAccount.getId())

    const ddo = await ocean.registerAsset(input, publisherAccount)
    Logger.log('__result__', ddo.id)
})()
