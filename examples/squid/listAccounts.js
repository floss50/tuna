const { Ocean, Logger } = require('@oceanprotocol/squid');

(async () => {
    const ocean = await Ocean.getInstance({
        nodeUri: 'http://localhost:8545'
    })

    const accounts = await ocean.getAccounts()

    Logger.log(JSON.stringify(accounts, null, 2))
})()