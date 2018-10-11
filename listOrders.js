const { Ocean, Logger } = require('@oceanprotocol/squid');

(async () => {
    const ocean = await Ocean.getInstance({
        nodeUri: 'http://localhost:8545'
    })

    const orders = await ocean.order.getOrdersByConsumer('0x970e8f18ebfEa0B08810f33a5A40438b9530FBCF')

    Logger.log('Orders', JSON.stringify(orders, null, 2))
})()
