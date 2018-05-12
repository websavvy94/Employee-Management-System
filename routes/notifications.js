const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Notification = require('../models/notification');
const config = require('../config/database');

//Register
router.post('/register', (req, res, next) => {
    let newNotification = new Notification({
        date: req.body.date,
        content: req.body.content,
        status: req.body.status
    });
    Notification.addNotification(newNotification, (err, user) => {
        if(err){
            return res.json({success: false, msg: 'Notification already exists'});
        } else {
            return res.json({success: true, msg: 'Succeed to register notification'});
        }
    })
});

//Inactivate Notification
router.post('/changeStatus', (req, res, next) => {
    let newNotification = new Notification({        
        id: req.body.id,
        status: req.body.status
    });

    Notification.changeStatus(newNotification, (err, Notification) => {
        if(err){
            return res.json({success: false, msg: 'Something went wrong'});
        } else {
            return res.json({success: true, msg: 'Notification was viewed successfully', notification: notification});
        }
    })
});

//Read Notification Data
router.get('/getAllNotifications', function(req, res, next) {
    Notification.find(function (err, notifications) {
        if (err) return next(err);
        res.json(notifications);
    });
});

router.get('/viewedNotification', function(req, res, next) {
    const filter = {status: true};
    Notification.find(filter, function (err, notifications) {
        if (err) return next(err);
        res.json(notifications);
    });
});

router.get('/unviewedNotification', function(req, res, next) {
    const filter = {status: false};
    Notification.find(filter, function (err, notifications) {
        if (err) return next(err);
        res.json(notifications);
    });
});

router.delete('/deleteNotification/:id', function(req, res, next) {
    Notification.delNotification(req.params.id, (err, notification) => {
        if(err) {
            res.status(500).json({ errmsg: err });
        } else {
            res.status(200).json({ msg: notification });
        }
    });
});

module.exports = router;