const mongoose = require('mongoose')
const MessageBoardSchema = new mongoose.Schema({
    listingDetails: {
        type: Object
    },
    messages: {
        type: Array
    },
    sellerEmailAddress: {
        type: String
    },
    buyerEmailAddress: {
        type: String
    }
})

module.exports =
    mongoose.models.MessageBoard ||
    mongoose.model('MessageBoard', MessageBoardSchema)
