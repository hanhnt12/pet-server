var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const CategoryService = require('../services/CategoryService');
const ProductService = require('../services/ProductService');

// verify user was loged in can access
router.use('/', isLoggedIn, function (req, res, next) {
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard/index', { title: 'Welcome to System dashboard' });
});

/**
 * get list categories
 * path: /dashboard/categories
 */
router.get('/categories', CategoryService.getCategories);

/**
 * get information to update category
 * path: /dashboard/:categoryId/update
 * validate category and get category details
 */
router.get('/category/:categoryId/update',
  CategoryController.validateCategoryId,
  CategoryService.updateCategoryGet);

/**
 * update category
 * path: /dashboard/:categoryId/update
 * validate and update category
 */
router.post('/category/:categoryId/update',
  CategoryController.validateCategoryId,
  CategoryController.validateUpdatePost,
  CategoryService.updateCategoryPost);

/**
 * Get list products
 */
router.get('/products', ProductService.searchProduct);

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
