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
var cors = require('cors');
var expressValidator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config'); // config all system
var app = express();

//==================== configuration============================
// conect to database
mongoose.connect(config.url);

// secret variable
app.locals.superSecret = config.secret; 

require('./config/passport');
//==================== configuration============================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//==================== require for passport============================
app.use(session({
  secret: 'hanhnt',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }), // session store in mongodb
  cookie: { maxAge: 3 * 60 * 60 * 1000 } // 3 hour
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//==================== require for passport============================

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// use morgan to log requests to the console
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setting common
app.use(function (req, res, next) {
  // setting global check login
  res.locals.login = req.isAuthenticated();
  // setting global session
  res.locals.session = req.session;
  next();
});

// setting cors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// =======================
// routes ================
// =======================
var index = require('./routes/index');
var users = require('./routes/users');
var carts = require('./routes/carts');
var api = require('./routes/api/api');
var usersAPI = require('./routes/api/users');
var productsAPI = require('./routes/api/products');
var categoriesAPI = require('./routes/api/categories');

app.use('/', index);
app.use('/users', users);
app.use('/cart', carts);

// api
app.use('/api', api);
app.use('/api/user', usersAPI);
app.use('/api/products', productsAPI);
app.use('/api/categories', categoriesAPI);
// =======================
// end routes ============
// =======================

// log error
app.use(logErrors);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    logger(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(req, res, next) {
  mongoose.connect(function(err){
      if(err){
          var err = new Error('Database connection error! Try later please.');
          err.status = 503;
          next(err);    
      }
  });
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  logger(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// error handler
app.use(function (err, req, res, next) {
  logger(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// log error
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

module.exports = app;
