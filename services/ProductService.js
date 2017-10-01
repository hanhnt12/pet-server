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

// get list products
exports.getProducts = async function (req, res, next) {
  console.log('get products default');
  try {

    let query = {};
    let projection = null;
    // sort desc by createDate, price
    let sort = { sort: { createDate: -1, price: -1 } };

    // get list products
    let products = await getProducts(query, projection, sort);

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
