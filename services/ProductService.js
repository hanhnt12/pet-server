let ProductModel = require('../models/ProductModel');
const config = require('../config/config');

// common function get products
async function getProducts(query = {}, projection = null, sort = {}) {
  // get list products
  console.log('before');
  let products = await ProductModel.find(query, projection, sort);
  console.log(products);
  console.log('after');
  return products;
}

// common function get product details
async function getProduct(productId) {
  // get list products
  console.log('before');
  let product = await ProductModel.findById(productId);
  console.log(product);
  console.log('after');
  return product;
}

// get list products
exports.getProducts = async function (req, res, next) {
  console.log('get products default');
  try {
    // sort desc by createDate, price
    let sort = { sort: { createDate: -1, price: -1 } };

    // get list products
    let products = await getProducts({}, null, sort);

    // output json
    res.json(products);
  } catch (error) {
    console.log(err);
    res.json(config.commonError);
  }
}

// get list products by category
exports.getProductsByCategory = async function (req, res, next) {
  console.log('get products by category');
  try {
    // get category name from request
    let category = req.params.category;

    // create query object
    let query = { 'category.name': category };

    let projection = null;
    // sort desc by createDate, price
    let sort = { sort: { createDate: -1, price: -1 } };

    let products = await getProducts(query, projection, sort);

    console.log(products);

    // output json
    res.json(products);
  } catch (error) {
    console.log(err);
    res.json(config.commonError);
  }
}

// get list product details
exports.getProduct = async function (req, res, next) {
  console.log('get details product');
  try {
    // get category name from request
    let productId = req.params.productId;
    console.log(`product id: ${productId}`);

    let product = await getProduct(productId);

    console.log(product);

    // output json
    res.json(product);
  } catch (error) {
    console.log(err);
    res.json(config.commonError);
  }
}

// create new product
exports.createProduct = async function (req, res, next) {
  console.log('create product');
  try {
    
  } catch (error) {
    console.log(err);
    res.json(config.commonError);
  }
}
