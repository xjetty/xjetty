const mongoose = require('mongoose')
const DisputeSchema = new mongoose.Schema({
    escrowId: {
        type: Object
    },
    resolved: {
        type: Boolean,
        default: false
    },
    resolvedOnTimestamp: {
        type: Number,
        default: null
    }
})

module.exports =
    mongoose.models.Dispute ||
    mongoose.model('Dispute', DisputeSchema)
