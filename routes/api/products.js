var express = require('express');
var router = express.Router();
const CommonController = require('../../controllers/CommonController');
const ProductController = require('../../controllers/ProductController');
const ProductService = require('../../services/ProductService');

/* get default all products */
router.get('/', 
  ProductController.validateSearch,
  ProductService.searchProduct
);

/* get default all products for search at api*/
router.post('/', 
  ProductController.validateSearch,
  ProductService.searchProduct
);

/* get list products depend on categories*/
router.get('/:category', 
  ProductController.validateSearch,
  ProductService.searchProduct
);

/**
 * Get product details
 */
router.get('/product/:productId', ProductService.getProduct);

/**
 * Update view product
 */
router.post('/product/update/:productId', 
  CommonController.validateObjectId,
  ProductService.updateProductView
);

module.exports = router;
