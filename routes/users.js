var express = require('express');
var router = express.Router();
let csrf = require('csurf');
let passport = require('passport');

let csrfProtection = csrf();
router.use(csrfProtection);

// router.use('/', isNotLoggedIn, function(req, res, next) {
//   next();
// });

/* process logout */
router.get('/logout', isLoggedIn, function(req, res) {
  console.log('logged out.');
  req.logout();
  
  res.redirect('/');
});

/* show the login form */
router.get('/login', function(req, res) {
  // binding error
  var message = req.flash('error');
  // console.log(message);
  res.render('user/login', { csrfToken: req.csrfToken(), message: message});
});

/* process login */
router.post('/login', (req, res, next) => {
  // first middleware to validation data
  req.checkBody('username', 'Vui lòng nhập username').notEmpty();
  req.checkBody('password', 'Vui lòng nhập password').notEmpty();

  // run the validator
  let errors = req.validationErrors();

  // checking error
  if (errors) {
    for (let i = 0; i < errors.length; i++) {
      req.flash('error', errors[i].msg);
      console.log('error' + errors[i].msg);
    }
    res.redirect('/users/login');
  }

  // call next middleware passport authentication
  next();
}, passport.authenticate('local.login', {
  successRedirect: '/dashboard',
  failureRedirect: '/users/login',
  failureFlash: true
}));

/* show the register form */
router.get('/register', function(req, res) {
  // binding error
  var message = req.flash('error');
  console.log(message);
  res.render('user/register', { csrfToken: req.csrfToken(), message: message});
});

/* process register */
router.post('/register', (req, res, next) => {
    // first middleware to validation data
    req.checkBody('username', 'Username không hợp lệ').isLength({min: 4, max: 50});
    req.checkBody('password', 'Password không hợp lệ').isLength({min: 4, max: 50});

    // run the validator
    let errors = req.validationErrors();

    // checking error
    if (errors) {
      for (let i = 0; i < errors.length; i++) {
        req.flash('error', errors[i].msg);
        // console.log('error' + errors[i].msg);
      }
      res.redirect('/users/register');
    } else {
      //Trim and escape the name field. 
      req.sanitize('username').escape().trim();
      req.sanitize('password').trim();

      // call next middleware passport authentication
      next();
    }
  }, passport.authenticate('local.register', {
    successRedirect: '/dashboard/',
    failureRedirect: '/users/register',
    failureFlash: true
  }
));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  console.log('is log');
  // if user is authenticated in the session, carry on 
  // manage by passport
  if (req.isAuthenticated()) {
    console.log('is logged in.');
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

/**
 * middleware to verify that is login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isNotLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (!req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/dashboard');
}

module.exports = router;
