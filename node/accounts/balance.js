const { Ocean, Logger } = require('@oceanprotocol/squid')
let config = require('../config');

(async () => {
    Logger.log('running accounts/balance with config', config)
    const ocean = await Ocean.getInstance(config)
    const accounts = await ocean.getAccounts()
    Logger.log(accounts)
    const balance = await Promise.all(accounts.map(async account => {
        return {
            'id': account.id,
            'balance': await account.getBalance()
        }
    }))

    Logger.log(`__result__${JSON.stringify(balance, null, 2)}`)
})()
