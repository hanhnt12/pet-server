let ProductModel = require('../models/ProductModel');
const config = require('../config/config');
const Common = require('../common/common');

// default projection
const DEFAULT_PROJECTION = 'imagePath title price views'

// common function get products
async function getProducts(query = {}, projection = null, sort = {}, paggingObj) {

  let skip = 0;
  let limit = Common.DEFAULT_RECORD_PER_PAGE;

  if (paggingObj && paggingObj.skip && paggingObj.limit) {
    skip = paggingObj.skip;
    limit = paggingObj.limit;
  }

  // get list products
  let products = await ProductModel.find(query, projection, sort).skip(skip).limit(limit);

  // log query object
  Common.customLog(null, 'getProducts', 'query: ', query, 'result: ', products);

  return products;
}

/**
 * Count number of product
 */
async function countProducts(query = {}, projection = '_id') {
  // get total count
  // for pagging
  let productCount = await ProductModel.find(query, projection, {}).count();

  // log query object
  Common.customLog(null, 'countProducts', 'query: ', query, 'result: ', productCount);

  return productCount;
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

/**
 * Search product
 * search by category or title
 */
exports.searchProduct = async function (req, res, next) {
  try {
    // get category name from request
    let categoryName = req.query.category || req.body.category;
    let productTitle = req.query.q || req.body.q;
    let page = req.query.page || req.body.page || 1;

    // santize
    req.sanitize('category').escape();
    req.sanitize('category').trim();
    req.sanitize('q').escape();
    req.sanitize('q').trim();

    // log parameter
    Common.customLog(req, `category: ${categoryName}`, `title: ${productTitle}`, `page: ${page}`);

    // define object search
    let objSearch = {};

    // if search by category
    if (categoryName) {
      objSearch.category.name = categoryName;
    }

    // if search by title
    if (productTitle) {
      objSearch.title = {
        $regex: productTitle,
        $options: 'i'
      };
    }

    Common.customLog(null, 'searchProduct by param: ', objSearch);

    // calculate total page
    let count = await countProducts(objSearch)
    let totalPage = Math.ceil(count / parseInt(Common.DEFAULT_RECORD_PER_PAGE));

    // create pagging object
    let paggingObj = Common.calculatePagging(page);

    // search product
    let products = await getProducts(objSearch, DEFAULT_PROJECTION, {}, paggingObj);

    // check route to display
    if (Common.isDashboardRote(req)) {
      // res.locals.createUrlPagination = Common.createUrlPagination;
      res.render(Common.PRODUCT_PATH_RENDER, {
        title: Common.PRODUCT_TITLE,
        products: products,
        q: productTitle,
        page: page,
        pageSize: Common.DEFAULT_RECORD_PER_PAGE,
        totalPage: totalPage,
        url: Common.createUrlPagination(req)
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