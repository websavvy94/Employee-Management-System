const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const notifications = require('./routes/notifications');

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

//On Database Connection Error
mongoose.connection.on('error', (err) => {
    console.log('Database connection error '+err);
});

const app = express();

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/notifications', notifications);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// Start Server
app.listen(port, function(){
    console.log('Server started on port '+port);
});