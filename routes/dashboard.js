var express = require('express');
var router = express.Router();
const CommonController = require('../controllers/CommonController');
const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');
const ContactController = require('../controllers/ContactController');
const CategoryService = require('../services/CategoryService');
const ProductService = require('../services/ProductService');
const ContactService = require('../services/ContactService');


const Common = require('../common/common');

// verify user was loged in can access
router.use('/', isLoggedIn, function (req, res, next) {
  next();
});

/**
 * GET home page.
 * system dashboard
 */
router.get('/', function (req, res, next) {
  res.render(Common.DASHBOARD_PATH_RENDER, {
    title: Common.DASHBOARD_TITLE
  });
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
  CommonController.validateObjectId,
  CategoryService.updateCategoryGet
);

/**
 * update category
 * path: /dashboard/:categoryId/update
 * validate and update category
 */
router.post('/category/:categoryId/update',
  CommonController.validateObjectId,
  CategoryController.validateUpdatePost,
  CategoryService.updateCategoryPost
);

/**
 * Get list products
 * path: /dashboard/products
 */
router.get('/products',
  ProductController.validateSearch,
  ProductService.searchProduct
);

/**
 * Add new products
 * path: /dashboard/product/add
 * get list category before render to display selectbox
 */
router.get('/product/add',
  CategoryService.getCategoryName,
  function (req, res, next) {
    res.render(Common.PRODUCT_ADD_PATH_RENDER, {
      title: Common.PRODUCT_ADD_TITLE,
      categories: req.categories
    });
  }
);

/**
 * Add new products
 * path: /dashboard/product/add
 * get list category before render to display selectbox
 */
router.post('/product/add',
  CategoryService.getCategoryName,
  ProductController.validateAddPost,
  ProductService.addProduct
);

/**
 * update product
 * path: /dashboard/product/update
 * update product get
 */
router.get('/product/:productId/update',
  CommonController.validateObjectId,
  CategoryService.getCategoryName,
  ProductService.getProduct
);

/**
* Add new products
* path: /dashboard/product/add
* update product post
*/
router.post('/product/:productId/update',
  CommonController.validateObjectId,
  CategoryService.getCategoryName,
  ProductController.validateAddPost,
  ProductService.updateProduct
);

/**
 * DELETE PRODUCT
 */
router.get('/product/:productId/delete',
  CommonController.validateObjectId,
  ProductService.deleteProduct
);

/**
 * GET CONTACT INFORMATION
 */
router.get('/contact', ContactService.getContactInformaion);

/**
 * UPDATE CONTACT INFORMATION
 */
router.post('/contact',
  ContactController.validate,
  ContactService.updateContactInformaion
);

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
