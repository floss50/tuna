const { Ocean, Logger } = require('@oceanprotocol/squid')
const config = require('../config')
const input = require('../input');

(async () => {
    const ocean = await Ocean.getInstance(config)

    const assets = await ocean.searchAssetsByText(input)

    Logger.log(`__result__${JSON.stringify(assets.map(asset => asset.id), null, 2)}`)
})()
