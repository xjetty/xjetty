import emailValidator from "email-validator";

const mongoose = require('mongoose')
const OfferSchema = new mongoose.Schema({
    postId: {
        type: String
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
    fixedAmount: {
        type: String
    },
    usdAmount: {
        type: Number,
        default: null,
        required: function () {
            return this.fixedAmount === 'usd'
        },
        validate: {
            validator: function (value) {
                if (this.fixedAmount === 'usd') {
                    return value > 0
                } else return true
            }
        }
    },
    eosAmount: {
        type: Number,
        default: null,
        required: function () {
            return this.fixedAmount === 'eos'
        },
        validate: {
            validator: function (value) {
                if (this.fixedAmount === 'eos') {
                    return value > 0
                } else return true
            }
        }
    },
    status: {
        type: String,
        default: 'Pending decision'
    },
    statusUpdatedOnTimestamp: {
        type: Number,
        default: null
    },
    createdOnTimestamp: {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.models.Offer || mongoose.model('Offer', OfferSchema)
