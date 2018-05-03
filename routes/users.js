const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const nodemailer = require('nodemailer');
//const sgTransport = require('nodemailer-sendgrid-transport');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password:req.body.password,
        phone: req.body.phone,
        em:req.body.em,
        bi:req.body.bi,
        rm:req.body.rm,
        sm:req.body.sm,
        s:req.body.s,
        role: req.body.role
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            return res.json({success: false, msg: 'Username or Email already exists'});
        } else {
            return res.json({success: true, msg: 'Succeed to register user'});
        }
    })
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    user: {
                        id: user._id,
                        username: user.username,
                        role: user.role
                    }
                });
            } else {
                return res.json({success:false, msg: 'Wrong password'});
            }
        });
    });
});

//Send Verification Link when User forgot the password
router.post('/verificationlink', (req, res, next) => {
    const username = req.body.username;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }else{
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'stephen19930727@gmail.com',
                  pass: 'haebangsan.'
                }
            });
              
            var mailOptions = {
                from: 'Mozingo EMS',
                to: user.email,
                subject: 'Sending Email using Node.js',
                text: 'Hi, ' + user.username,
                html: 'Hi, <strong> ' + user.username + '</strong><br><br> Please click on the link bellow to set your new password.<br><br><a href="http://localhost:4200/changePassword">Click Here!</a>'
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({success: false, msg: error});
                } else {
                    return res.json({success:true, msg: 'Email was sent to your Email address', user: user});
                }
            });            
        }
    });
});

//Change user password
router.post('/changepassword', (req, res, next) => {
    let newUser = new User({        
        username: req.body.username,
        password:req.body.password       
    });
    console.log(newUser);
    User.changePassword(newUser, (err, user) => {
        if(err){
            return res.json({success: false, msg: 'Something went wrong'});
        } else {
            return res.json({success: true, msg: 'Password changed successfully', user: user});
        }
    })
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});    
});

module.exports = router;