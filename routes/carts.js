var express = require('express');
var router = express.Router();
let Product = require('../models/ProductModel');
let Cart = require('../models/cart');

/* GET home page. */
// view details cart
router.get('/', function (req, res, next) {
  let cart = req.session.cart;
  // if has not cart
  if (!cart) {
    cart = null;
  }
  res.render('cart/index', {cart: cart});
});

/* Process add product to Cart*/
router.get('/add/:id', function (req, res, next) {
  // Get id of product
  let productId = req.params.id;

  // instalition cart
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  // checking product exist in db
  Product.findById(productId, function (err, product) {

    // console.log(product);
    // handle error
    if (err) {
      res.redirect('/');
    }

    // if product is not exist in db
    if (!product) {
      res.end('product is not exist');
    }

    // add product to cart
    cart.add(product, productId);

    console.log(cart);

    // add cart to session
    req.session.cart = cart;

    // get back url
    let backURL = req.header('Referer') || '/';
    console.log(backURL);

    // redirect to homepage
    res.redirect(backURL);
  });
});

/* Process remove product from Cart*/
router.get('/remove/:id', function (req, res, next) {

});

/* Process reduce by 1 product from Cart*/
router.get('/reduce/:id', function (req, res, next) {

});

module.exports = router;
