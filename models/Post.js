import {verifyEosAccountName} from '../server/verifyEosAccountName'
import emailValidator from 'email-validator'
import {categoryAndSubcategoryOptions} from '../categoryAndSubcategoryOptions'
import {modeOptions} from '../modeOptions'
import {platformOptions} from "../platformOptions";

const ip = require('ip')

const categoryOptions = categoryAndSubcategoryOptions.map(x => x.category)

const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    mode: {
        type: String,
        required: true,
        enum: modeOptions
    },
    platforms: {
        type: Array,
        required: true,
        validator: function (value) {
            let error = false
            value.forEach(function (value) {
                if (!platformOptions.includes(value))
                    error = true
            })
            return error
        },
    },
    category: {
        type: String,
        required: true,
        enum: categoryOptions
    },
    subcategory: {
        type: String,
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
    title: {
        type: String,
        required: true,
        trim: true
    },
    imageLink: {
        type: String
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
    mongoose.models.Post || mongoose.model('Post', PostSchema)
