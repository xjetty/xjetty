import emailValidator from 'email-validator'

const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
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
    app: {
        type: String,
        default: 'blockcommerc'
    },
    createdTimestamp: {
        type: Number,
        default: Date.now()
    }
})

module.exports =
    mongoose.models.Message || mongoose.model('Message', MessageSchema)
