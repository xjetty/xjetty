import {verifyEosAccountName} from '../server/verifyEosAccountName'
import emailValidator from 'email-validator'

const ip = require('ip')

const mongoose = require('mongoose')
const ListingSchema = new mongoose.Schema({
    code: {
        type: String,
        default: null
    },
    hidden: {
        type: Boolean,
        default: false
    },
    pendingTransactions: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    quantitySold: {
        type: Number,
        default: 0
    },
    saleMethod: {
        type: String,
        required: true,
        enum: ['askingPriceOnly', 'askingPriceAndOffers', 'offersOnly']
    },
    fixedAmount: {
        type: String,
        required: true,
        enum: ['usd', 'eos']
    },
    usdAmount: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0
            }
        }
    },
    eosAmount: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0
            }
        }
    },
    maximumPercentLessThan: {
        type: Number,
        default: null,
        required: function () {
            return this.saleMethod === 'askingPriceAndOffers'
        },
        min: 1,
        max: 99
    },
    useEscrow: {
        type: Boolean,
        required: true
    },
    eosAccountName: {
        type: String,
        validate: {
            validator: async function (value) {
                return await verifyEosAccountName(value)
            }
        },
        maxlength: 12,
        minlength: 12
    },
    addMemo: {
        type: Boolean,
        required: true
    },
    memo: {
        type: String,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return emailValidator.validate(value)
            }
        }
    },
    ipAddress: {
        type: String,
        default: ip.address()
    },
    createdOnTimestamp: {
        type: Number,
        default: Date.now()
    },
    lastUpdatedOnTimestamp: {
        type: Number,
        default: Date.now()
    }
})

module.exports =
    mongoose.models.Listing || mongoose.model('Listing', ListingSchema)
