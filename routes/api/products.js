var express = require('express');
var router = express.Router();
let Product = require('../../models/product');
let Category = require('../../models/category');

/* get default all products */
router.get('/', function (req, res, next) {
  // use model to query db
  Product.find({}, (err, docs) => {
    res.json(docs);
  });
});

/* get list products depend on categories*/
router.get('/products/:category', function (req, res, next) {
  // get category name from request
  let category = req.params.category;

  // create query object
  let query = {'category.name': category}

  // use model to query db
  Product.find(query, (err, docs) => {
    res.json(docs);
  });
});

module.exports = router;
