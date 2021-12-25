// -> name, channel, subscribe
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }, 
}, 
{ 
    timestamps: true 
});
module.exports = mongoose.model('Subscriber', subscriberSchema);