const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// EJS
app.use(expresslayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

// Global Vars // keep in mind that you have to put is after session
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on ${PORT}`));