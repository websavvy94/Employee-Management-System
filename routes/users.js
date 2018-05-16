const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const multer = require('multer');
const DIR = './uploads/';
const upload = multer({dest: DIR}).single('photo');


//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password:req.body.password,
        phone: req.body.phone,
        status: req.body.status,
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

//Update
router.post('/update', (req, res, next) => {
    let newUser = new User({
        _id: req.body._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        street: req.body.street,
        street2: req.body.street2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        photo: req.body.photo
    });
    User.updateUser(newUser, (err, user) => {
        if(err){
            return res.json({success: false, msg: 'failed to update profile'});
        } else {
            return res.json({success: true, msg: 'Succeed to update profile'});
        }
    })
});

//Update Password
router.post('/updatePassword', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    // console.log(newUser);
    User.changePassword(newUser, (err, user) => {
        if(err){
            return res.json({success: false, msg: 'failed to update profile'});
        } else {
            return res.json({success: true, msg: 'Succeed to update profile'});
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
                        password: password,
                        role: user.role
                    }
                });
            } else {
                return res.json({success:false, msg: 'Invalid Username and Password. Please try again.'});
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

//Inactivate User
router.post('/changeStatus', (req, res, next) => {
    let newUser = new User({        
        username: req.body.username,
        status: req.body.status
    });

    User.changeStatus(newUser, (err, user) => {
        if(err){
            return res.json({success: false, msg: 'Something went wrong'});
        } else {
            return res.json({success: true, msg: 'Inactivated successfully', user: user});
        }
    })
});

//upload Image
router.post('/uploadImage', (req, res, next) => {
    console.log(req);
    var path = '';

    upload(req, res, function(err) {
        
        if(err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured");
        }

        // No error occured
        path = req.file.path;

        return res.send("Upload Completed for " + path);
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});    
});

//Read Users Data
router.get('/activeuser', function(req, res, next) {
    const filter = {status: true};
    User.find(filter, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/inactiveuser', function(req, res, next) {
    const filter = {status: false};
    User.find(filter, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;