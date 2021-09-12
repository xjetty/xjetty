const mongoose = require('mongoose')
const EmailsIndexSchema = new mongoose.Schema({
    index: {
        type: Number
    }
})

module.exports = mongoose.models.EmailsIndex || mongoose.model('EmailsIndex', EmailsIndexSchema)
