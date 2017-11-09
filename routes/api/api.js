var express = require('express');
var router = express.Router();
var ProductModel = require('../../models/ProductModel');
const ProductService = require('../../services/ProductService');
const ContactService = require('../../services/ContactService');
const config = require('../../config/config');

/* GET home page. */
router.get('/', function (req, res, next) {
  // use model to query db
  ProductModel.find({}, (err, docs) => {
    res.json(docs);
  });
});

/* GET portfolio. */
router.get('/portfolio', ProductService.getPortfolio);

/* GET image product for main banner. */
router.get('/banner', ProductService.getPortfolio);

/* GET contact information. */
router.get('/contact', ContactService.getContactInformaion);

module.exports = router;
