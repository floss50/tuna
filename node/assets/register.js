const { Ocean, Logger } = require('@oceanprotocol/squid');
const config = require('../config');
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()
    const publisherAccount = accounts.filter(account => account.id === config.address)[0]
    Logger.log('Publisher ID:', publisherAccount.getId())

    const ddo = await ocean.registerAsset(input, publisherAccount)
    Logger.log('__result__', ddo.id)
})()
