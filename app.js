var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');

var configDB = require('./config/db');
mongoose.connect(configDB.getDbConnectionString());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname +'/public'));

app.use(session({ secret: 'ThisIsASecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport);
require('./routes/index')(app, passport);
require('./routes/customerAPI')(app);

server.listen(port);