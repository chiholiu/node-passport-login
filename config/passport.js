const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({ email: email})
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'That email is not registered'});
                    }

                    // Match password // user.password comes from the database and compare it to password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Password incorrect'});
                        }
                    });

                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id); // user.id of serializeUser goes to deserializeUser --> id --> findById --> id
        console.log('user.id ' + user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('id ' + id);
        User.findById(id, function(err, user) {
            console.log('id ' + id);
            done(err, user); 
            console.log('user ' + user); // user object attaches to the request as req.user
        });
    });
}