const { Ocean, Logger } = require('@oceanprotocol/squid');
const config = require('../config');
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()
    const account = accounts.filter(account => account.id === config.address)[0]
    console.log(account, input)
    await account.requestTokens(input)
    // BUG: doesn't update balance
    const balance = await account.getOceanBalance()
    console.log(balance)
    Logger.log(`__result__${account.id} received ${input} tokens`)
})()
