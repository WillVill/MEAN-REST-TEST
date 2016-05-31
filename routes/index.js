var User = require('../models/user.js');

module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.ejs', {message: req.flash('loginMessage')});
    });

    app.get('/user', isLoggedIn, function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(err);

            res.render('users.ejs', {
                user: req.user
            });
        })
    })

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    })

    app.get('/home', isLoggedIn, function (req, res) {
        res.render('home.ejs', {user: req.user});
    })

    // POST
    app.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/',
        failureFlash: true,
    }));

    app.post('/login', passport.authenticate('local.login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    //USER API

    app.get('/users', function(req, res){
        User.find(function(err, users){
            if(err)
            res.send(err)

            console.log(users)
            res.json(users)
        })
    })

    app.get('/user/:user_id', function(req,res){
        User.findById(req.params.user_id, function(err, user){
            if(err)
            res.send(err)

            console.log(user)
            res.json(user)
        })
    })

    app.get('/username/:username', function(req,res){
        User.findOne(req.params.username, function(err, user){
            if(err)
                res.send(err)

            console.log(user)
            res.json(user.username)
        })
    })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}