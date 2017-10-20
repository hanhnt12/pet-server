let ProductModel = require('../models/ProductModel');
const config = require('../config/config');
const Common = require('../common/common');

// common function get products
async function getProducts(query = {}, projection = null, sort = {}) {
  // get list products
  let products = await ProductModel.find(query, projection, sort);
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

/**
 * Get list products
 * for dashboard and api
 */
exports.getProducts = async function (req, res, next) {
  try {

    // sort desc by createDate, price
    let sort = { sort: { createDate: -1, price: -1 } };

    // get list products
    let products = await getProducts({}, null, sort);

    // log result
    Common.customLog(req, 'getProducts', products);

    // check route to display
    if (Common.isDashboardRote(req)) {
      res.render(Common.PRODUCT_PATH_RENDER, {
        title: Common.PRODUCT_TITLE,
        products: products
      });
    } else {
      // output json
      res.json(products);
    }
  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.PRODUCT_PATH_RENDER,
      Common.PRODUCT_TITLE
    );
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
