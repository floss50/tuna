const { Ocean, Logger } = require('@oceanprotocol/squid');
const config = require('../config');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()
    const account = accounts.filter(account => account.id === config.address)[0]
    const balance = await account.getBalance()

    Logger.log(`__result__${JSON.stringify(balance, null, 2)}`)
})()
