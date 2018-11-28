const { Ocean, Logger } = require('@oceanprotocol/squid');
const config = require('../config');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()

    Logger.log(`__result__${JSON.stringify(accounts, null, 2)}`)
})()
