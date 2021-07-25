module.exports = {
    reactStrictMode: true,
    env: {
        MONGO_URI:
            'mongodb+srv://user:Snapshooter!23@blockcommercapp.bslzk.mongodb.net/BlockCommercApp?retryWrites=true&w=majority',
        EMAIL_SERVER_HOST: 'smtp.sendgrid.net',
        EMAIL_SERVER_PORT: 25,
        EMAIL_SERVER_USER: 'apikey',
        EMAIL_SERVER_PASSWORD: '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',
        JWT_SIGNATURE: 'crypto4ever',
        RECAPTCHA_SITE_KEY: '6LcEmE0bAAAAAP-S96EU0iXPoMAxkj3DkxB8QMN4',
        RECAPTCHA_SECRET_KEY: '6LcEmE0bAAAAAAQMUMpDrWcWZJU0XYVkNegBXUoV',
        LISTING_CODE_LENGTH: 5,
        EOS_NODE_SERVER_MAIN: 'https://eos.greymass.com/',
        EOS_NODE_SERVER_BACKUP: 'https://api.eosn.io/',
        ESCROW_EOS_ACCOUNT_NAME: 'blockcommerc',
        ESCROW_ASSOCIATIVE_PRIVATE_KEY:
            '5KD6WKJ2ctuZKpYedyZjE9TcFAC79HfSzLZR5FBFs671sN5z9hY',
        ESCROW_MEMO: '',
        LIVE: true
    }
}
