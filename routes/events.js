const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Event = require('../models/event');
const config = require('../config/database');

//Register
router.post('/register', (req, res, next) => {
    let newEvent = new Event({
        eventname: req.body.eventname,
        username: req.body.username,
        location: req.body.location,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        notes: req.body.notes
    });
    // console.log(newEvent);
    Event.insertEvent(newEvent, (err, event) => {
        if(err){
            return res.json({success: false, msg: 'Event already exists'});
        } else {
            return res.json({success: true, msg: 'Succeed to register event'});
        }
    });
});

module.exports = router;