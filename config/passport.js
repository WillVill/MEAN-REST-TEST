var localStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP ====================================================================

    passport.use('local.signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, username, password, done) {
            process.nextTick(function() {
                User.findOne({ 'username': username }, function(err, user) {
                    if (err)
                        return done(err)

                    if (user) {
                        return done(null, false, req.flash('signupMessage','Username already taken'))
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    passport.use('local.login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, username, password, done) {
            console.log(username)
            console.log(password)

            User.findOne({'username': username }, function(err, user) {
                console.log("user: " + user)
                console.log("error: " +err);
                if (err)
                    console.log("error")
                return done(err);

                // if no user is found, return the message
                if (!user)
                    console.log("No User")
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    console.log("wrong password")
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            })
        }));

};