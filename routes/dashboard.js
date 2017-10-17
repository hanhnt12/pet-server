var express = require('express');
var router = express.Router();
const CategoryService = require('../services/CategoryService');

// verify user was loged in can access
router.use('/', isLoggedIn, function(req, res, next) {  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'Welcome to System dashboard' });
});

/**
 * get list categories
 * path: /dashboard/categories
 */
router.get('/categories', CategoryService.getCategories);

/**
 * middleware to verify that user was logedin to access to dashboard
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/users/login');
}

module.exports = router;
