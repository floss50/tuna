const { Ocean, Logger } = require('@oceanprotocol/squid')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()
    Logger.log(accounts)
    const account = accounts.filter(account => account.id === config.address)[0]
    Logger.log(account, input)
    await account.requestToken(input)
    // BUG: doesn't update balance
    const balance = await account.getOceanBalance()
    Logger.log(balance)
    Logger.log(`__result__${account.id} received ${input} tokens`)
})()
