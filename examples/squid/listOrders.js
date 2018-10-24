const { Ocean, Logger } = require('@oceanprotocol/squid');

(async () => {
    const ocean = await Ocean.getInstance({
        nodeUri: 'http://localhost:8545'
    })

    const accounts = await ocean.getAccounts()
    const orders = await ocean.getOrdersByAccount(accounts[0])

    Logger.log('Orders', JSON.stringify(orders, null, 2))
})()
