var express = require('express');
var router = express.Router();
let Product = require('../models/ProductModel');
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, (err, docs) => {
    res.render('index', { products: docs });
  });
});

module.exports = router;
