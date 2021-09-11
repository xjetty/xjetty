module.exports = {
    images: {
        domains: ['i.postimg.cc'],
    },
    reactStrictMode: true,
    env: {
        MONGO_URI:
            'mongodb+srv://user:Snapshooter!23@blockcommercapp.bslzk.mongodb.net/BlockCommercApp?retryWrites=true&w=majority',
        JWT_SIGNATURE: 'crypto4ever',
        RECAPTCHA_SITE_KEY: '6Le-jL0bAAAAALtVFAZwX-GB2KHwl8wUmGP7T_VE',
        RECAPTCHA_SECRET_KEY: '6Le-jL0bAAAAAJowKEnL-rWbiWaLaY8ibNr260XT',
        LISTING_CODE_LENGTH: 5,
        EOS_NODE_SERVER_MAIN: 'https://eos.greymass.com/',
        EOS_NODE_SERVER_BACKUP: 'https://api.eosn.io/',
        ESCROW_EOS_ACCOUNT_NAME: 'blockcommerc',
        ESCROW_ASSOCIATIVE_PRIVATE_KEY:
            '5KD6WKJ2ctuZKpYedyZjE9TcFAC79HfSzLZR5FBFs671sN5z9hY',
        ESCROW_MEMO: '',
        LIVE: false
    }
}
