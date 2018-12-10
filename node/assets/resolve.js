const { Ocean, Logger } = require('@oceanprotocol/squid')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const ddo = await ocean.resolveDID(input)
    Logger.log(`__result__${JSON.stringify(ddo, null, 2)}`)
})()
