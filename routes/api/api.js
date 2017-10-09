var express = require('express');
var router = express.Router();
var Product = require('../../models/ProductModel');
const config = require('../../config/config');

/* GET home page. */
router.get('/', function (req, res, next) {
  // use model to query db
  Product.find({}, (err, docs) => {
    res.json(docs);
  });
});

module.exports = router;
