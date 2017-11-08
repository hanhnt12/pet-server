var express = require('express');
var router = express.Router();
const CommonController = require('../../controllers/CommonController');
const ProductService = require('../../services/ProductService');

/* get default all products */
router.get('/', ProductService.getProducts);

/* get list products depend on categories*/
router.get('/:category', ProductService.getProductsByCategory);

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
