const { Ocean, Asset, Logger } = require('@oceanprotocol/squid')

const name = 'Tuna Test2'
const description = 'Fine tuna test' + Math.floor(Math.random() * 100000) + 1
const timeout = 10000000
const price = 100
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1Mzk3ODcxMDEsImV4cCI6NDcyNjk5NjcwNCwiYXVkIjoiIiwic3ViIjoiIiwic2VydmljZV9lbmRwb2ludCI6Imh0dHA6Ly9hZGFzZCIsInJlc291cmNlX2lkIjoiMTIzNDUifQ.2H3TRC3CAToVE9divSckwHi_HNvgOHKrtJPo8128qrKBHTk7YYb0UNfVCuYqwhGR';

(async () => {
    const ocean = await Ocean.getInstance({
        nodeUri: 'http://localhost:8545'
    })

    const accounts = await ocean.getAccounts()
    const publisherAccount = accounts[0]
    Logger.log('Publisher ID:', publisherAccount.getId())

    const asset = new Asset(name, description, price, publisherAccount)
    const assetId = await ocean.register(asset)
    Logger.log('AssetId:', assetId)

    const consumerAccount = accounts[1]
    await consumerAccount.requestTokens(price)
    Logger.log('Consumer ID:', consumerAccount.getId())

    // consumer
    const order = await asset.purchase(consumerAccount, timeout)
    Logger.log('Order ID:', order.getId())

    // publisher
    await order.commit(accessToken)

    // consumer
    const paymentId = await order.pay(consumerAccount)
    Logger.log('Payment ID:', paymentId)

    // consumer
    const assetUrl = await order.consume(consumerAccount)
    Logger.log('Asset URL:', assetUrl)
})()
