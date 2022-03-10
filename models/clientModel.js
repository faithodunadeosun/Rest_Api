const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    clientsName: {
        type: String,
        required: true
    },
    clientsSubscribedChannel: {
        type: String,
        required: true
    },
    subscribedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Client', clientSchema)