const { bool, boolean } = require('joi');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    description:{
        type: String,
        required: true,
        max:255
    },
    location:{
        type: String,
        required: true,
        max:255
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    voluntersNeeded:{
        type: Number,
    },
    status:{
        type: Boolean,
        default:false,
    },
    dateEntered:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Event',eventSchema);