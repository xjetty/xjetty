const mongoose = require('mongoose')
const EscrowSchema = new mongoose.Schema({
    messageBoardId: {
        type: String
    },
    escrowReleased: {
        type: Boolean,
        default: false
    },
    escrowRefunded: {
        type: Boolean,
        default: false
    },
    disputeOpened: {
        type: Boolean,
        default: false
    },
    escrowReleasedOnTimestamp: {
        type: Number,
        default: null
    },
    escrowRefundedOnTimestamp: {
        type: Number,
        default: null
    },
    disputeOpenedOnTimestamp: {
        type: Number,
        default: null
    },
    transactionId: {
        type: String,
        default: null
    }
})

module.exports =
    mongoose.models.Escrow ||
    mongoose.model('Escrow', EscrowSchema)
