var express = require('express');
var router = express.Router();
let ProductService = require('../../services/ProductService');

/* get default all products */
router.get('/', ProductService.getProducts);

/* get list products depend on categories*/
router.get('/:category', ProductService.getProductsByCategory);

module.exports = router;
