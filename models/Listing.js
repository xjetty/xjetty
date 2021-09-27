const mongoose = require('mongoose')
import {verifyEosAccountName} from '../server/verifyEosAccountName'
import emailValidator from 'email-validator'
import {countryOptions} from "../countryOptions";
import {conditionOptions} from '../conditionOptions'

const ip = require('ip')

const ListingSchema = new mongoose.Schema({
    publicListing: {
        type: Boolean,
        required: true
    },
    worldwide: {
        type: Boolean,
        required: true
    },
    countries: {
        type: Array,
        required: function () {
            return !this.worldwide
        },
        validator: function (value) {
            if (!this.worldwide) {
                value.forEach(function (value) {
                    if (!countryOptions.includes(value))
                        return false
                })
            }
            return true
        }
    },
    code: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    pendingTransactions: {
        type: Number,
        default: 0
    },
    condition: {
        type: String,
        required: true,
        enum: conditionOptions
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    imageLinks: {
        type: Array
    },
    description: {
        type: String,
        trim: true
    },
    keywords: {
        type: Array
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
        type: Number,
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
    useEscrow: {
        type: Boolean,
        required: true
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
