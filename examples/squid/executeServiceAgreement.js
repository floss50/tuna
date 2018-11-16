const { Ocean, Logger } = require('@oceanprotocol/squid');

(async () => {
    const ocean = await Ocean.getInstance({
        nodeUri: 'http://localhost:8545',
        aquariusUri: 'http://localhost:5000',
        brizoUri: 'http://localhost:8030',
        parityUri: 'http://localhost:9545',
        secretStoreUri: 'http://localhost:12001',
        password: 'unittest',
        address: '0xed243adfb84a6626eba46178ccb567481c6e655d',
        threshold: 0
    })

    const accounts = await ocean.getAccounts()
    const publisherAccount = accounts[0]
    const consumerAccount = accounts[1]

    Logger.log('Publisher ID:', publisherAccount.getId())

    const metaData = {
        additionalInformation: {
            structuredMarkup: [
                {
                    mediaType: 'application/ld+json',
                    uri: 'http://skos.um.es/unescothes/C01194/jsonld'
                },
                {
                    mediaType: 'text/turtle',
                    uri: 'http://skos.um.es/unescothes/C01194/turtle'
                }
            ],
            updateFrecuency: 'yearly',
            checksum: 'efdd14d39feb726e321931f408b3454d26f1a4899bcc608a68b5397f23203174'
        },
        base: {
            name: 'Office Humidity',
            type: 'dataset',
            description: 'Weather information of UK including temperature and humidity',
            size: '3.1gb',
            dateCreated: '2012-02-01T10:55:11+00:00',
            author: 'Met Office',
            license: 'CC-BY',
            copyrightHolder: 'Met Office',
            encoding: 'UTF-8',
            compression: 'zip',
            contentType: 'text/csv',
            workExample: 'stationId,latitude,longitude,datetime,temperature,humidity423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68',
            contentUrls: [
                'https://testocnfiles.blob.core.windows.net/testfiles/testzkp.zip',
                'https://testocnfiles.blob.core.windows.net/testfiles/testzkp.zip'
            ],
            links: [
                { sample1: 'http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/' },
                { sample2: 'http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-averages-25km/' },
                { fieldsDescription: 'http://data.ceda.ac.uk/badc/ukcp09/' }
            ],
            inLanguage: 'en',
            tags: 'weather, uk, 2011, temperature, humidity',
            price: 10
        },
        curation: {
            numVotes: 125,
            rating: 0.93,
            schema: 'Binary Votting'
        }
    }

    const ddo = await ocean.registerAsset(metaData, publisherAccount)
    Logger.log('DID:', ddo.id)

    const accessService = ddo.findServiceByType('Access')

    const signServiceAgreementResult = await ocean.signServiceAgreement(ddo.id, accessService.serviceDefinitionId, consumerAccount)
    Logger.log('ServiceAgreementId', signServiceAgreementResult.serviceAgreementId)
    Logger.log('serviceAgreementSignature', signServiceAgreementResult.serviceAgreementSignature)

    const serviceAgreement = await ocean.executeServiceAgreement(ddo.id, accessService.serviceDefinitionId,
        signServiceAgreementResult.serviceAgreementId, signServiceAgreementResult.serviceAgreementSignature, consumerAccount, publisherAccount)
    Logger.log('ServiceAgreementId', serviceAgreement.getId())
})()
