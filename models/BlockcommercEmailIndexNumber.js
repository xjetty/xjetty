const mongoose = require('mongoose')
const BlockcommercEmailIndexNumberSchema = new mongoose.Schema({
    index: {
        type: Number
    }
})
module.exports = mongoose.models.BlockcommercEmailIndexNumber || mongoose.model('BlockcommercEmailIndexNumber', BlockcommercEmailIndexNumberSchema)
