const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Event Schema

const EventSchema = mongoose.Schema({
    eventname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    starttime: {
        type: String
    },
    endtime: {
        type: String
    },
    notes: {
        type: String,
        required: true
    }
});

const Event = module.exports = mongoose.model('events', EventSchema);

module.exports.insertEvent = function(newEvent, callback){
    console.log(newEvent);
    newEvent.save(callback);
}
