var express = require('express');
var router = express.Router();
let csrf = require('csurf');
let passport = require('passport');

let csrfProtection = csrf();
router.use(csrfProtection);

// router.use('/', isNotLoggedIn, function(req, res, next) {
//   next();
// });

/* show the login form */
router.get('/login', isNotLoggedIn, function(req, res) {
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
  successRedirect: '/users',
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
    req.checkBody('username', 'Username không hợp lệ').notEmpty().isLength({min: 4, max: 50});
    req.checkBody('password', 'Password không hợp lệ').notEmpty().isLength({min: 4, max: 50});

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
    successRedirect: '/users/',
    failureRedirect: '/users/register',
    failureFlash: true
  }));

/* process logout */
router.get('/logout', isLoggedIn, function(req, res) {
  req.logout();
  res.redirect('/');
});

/* process to dashboard */
router.get('/', isLoggedIn, function(req, res) {
  res.render('user/index');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (!req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
