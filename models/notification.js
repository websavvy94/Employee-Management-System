const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Notification Schema

const NotificationSchema = mongoose.Schema({
    date: {
        type: Date
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }
});

const Notification = module.exports = mongoose.model('notifications', NotificationSchema);

module.exports.addNotification = function(newNotification, callback){
    newNotification.save(callback);
}

module.exports.changeStatus = function(newNotification, callback){
    const filter = { id: newNotification.id };
    const options ={ new: true };
    User.findOneAndUpdate(filter, { status: newNotification.status }, options, callback);
}

module.exports.delNotification = function(id, callback){
    const filter = { _id: id };
    Notification.findOneAndRemove(filter, callback);
};
