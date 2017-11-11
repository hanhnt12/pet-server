let ProductModel = require('../models/ProductModel');
const config = require('../config/config');
const Common = require('../common/common');

// default projection
const DEFAULT_PROJECTION = 'image title price priceSale views category'

// common function get products
async function getProducts(query = {}, projection = null, sort = {}, paggingObj) {

  let skip = 0;
  let limit = Common.DEFAULT_RECORD_PER_PAGE;

  if (paggingObj) {
    skip = paggingObj.skip;
    limit = paggingObj.limit;
  }

  if (!projection) {
    projection = this.DEFAULT_PROJECTION;
  }

  // get list products
  let products = await ProductModel.find(query, projection, sort).skip(skip).limit(limit);

  return products;
}

/**
 * Count number of product
 */
async function countProducts(query = {}, projection = '_id') {
  // get total count
  // for pagging
  let productCount = await ProductModel.find(query, projection, {}).count();

  return productCount;
}

// common function get product details
async function getProduct(productId) {
  // get list products
  let product = await ProductModel.findById(productId);
  Common.customLog(null, 'Get product information: ', product);
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

    // check route to display
    if (req.isDashboardRoute) {
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

/**
 * Get product information by product id
 */
exports.getProduct = async function (req, res, next) {
  try {
    // get category name from request
    let productId = req.params.productId;

    // get product information
    let product = await getProduct(productId);

    // update view product
    let conditions = { _id: product._id };
    let updateView = { $inc: { views: 1 } }
    let options = { multi: false };

    ProductModel.update(conditions, updateView, options, (err, numEffected) => {
      if (err) {
        Common.customLog(req, 'Update view product', err);
      } else {
        Common.customLog(req, 'Number product view effected', numEffected);
      }
    });

    if (req.isDashboardRoute) {
      // if can not get category
      if (!product) {
        let error = Common.createObjError('', 'Sản phẩm');

        // render error
        Common.renderError(
          req,
          res,
          error,
          Common.PRODUCT_UPDATE_PATH_RENDER,
          Common.PRODUCT_UPDATE_TITLE
        );
      } else {
        res.render(Common.PRODUCT_UPDATE_PATH_RENDER, {
          title: Common.PRODUCT_UPDATE_TITLE,
          product: product,
          categories: req.categories
        });
      }
    } else {
      // output json
      res.json(product);
    }
  } catch (error) {
    Common.renderError(
      req,
      res,
      error,
      Common.PRODUCT_UPDATE_PATH_RENDER,
      Common.PRODUCT_UPDATE_TITLE
    );
  }
}

/**
 * Search product
 * search by category or title
 */
exports.searchProduct = async function (req, res, next) {
  try {
    Common.customLog(req, 'search product service START');
    // create object seach
    let queryObj = req.queryObj || {};
    let productTitle = req.query.q || req.body.q;

    Common.customLog(req, 'search product service query object', queryObj);

    // calculate total page
    let count = await countProducts(queryObj)
    let totalPage = Math.ceil(count / parseInt(req.perPage));

    // create pagging object
    let paggingObj = req.paggingObj;
    if (Common.isEmpty(paggingObj)) {
      paggingObj = Common.calculatePagging(req.page, req.perPage);
    }
    Common.customLog(req, 'search product service pagging', paggingObj);

    // sorting follow displayOrder
    // 1: asc: -1: desc
    let sortObj = req.sortObj || {};

    // projection
    let projection = req.projection || DEFAULT_PROJECTION;

    // search product
    let products = await getProducts(queryObj, projection, sortObj, paggingObj);
    Common.customLog(req, 'search product service total record', products.length);

    // check route to display
    if (req.isDashboardRoute) {
      res.render(Common.PRODUCT_PATH_RENDER, {
        title: Common.PRODUCT_TITLE,
        products: products,
        q: productTitle,
        page: req.page,
        totalPage: totalPage,
        url: Common.createUrlPagination(req)
      });
    } else {
      // set total page for paging
      res.set(config.HEADER_PRODUCT_PAGE_COUNT, totalPage);
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

/**
 * Add new product
 */
exports.addProduct = async function (req, res, next) {
  try {

    // get product from validate ok
    let product = new ProductModel(req.product);

    // save product
    let result = await product.save();

    // render screen
    // res.redirect('/dashboard/products');
    // render again
    let complete = Common.insertSuccess;
    complete['action'] = '/dashboard/products';
    res.render(Common.PRODUCT_ADD_PATH_RENDER, {
      title: Common.PRODUCT_ADD_TITLE,
      completed: complete,
    });

  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.PRODUCT_ADD_PATH_RENDER,
      Common.PRODUCT_ADD_TITLE,
      {
        categories: req.categories
      }
    );
  }
}

/**
 * Update product information
 */
exports.updateProduct = function (req, res, next) {

  // get product from validate ok
  let productUpdate = req.product;

  Common.customLog(req, 'product update', productUpdate);

  // save product
  ProductModel.findByIdAndUpdate(productUpdate._id, { $set: productUpdate }, {}, function (err, product) {
    if (err) {
      Common.renderError(
        req,
        res,
        err,
        Common.PRODUCT_UPDATE_PATH_RENDER,
        Common.PRODUCT_UPDATE_TITLE,
        {
          categories: req.categories
        }
      );
    } else {
      let complete = Common.updateSuccess;
      complete['action'] = '/dashboard/products';
      res.render(Common.PRODUCT_UPDATE_PATH_RENDER, {
        title: Common.PRODUCT_UPDATE_TITLE,
        completed: complete,
      });
    }
  });
}

/**
 * Update view product
 */
exports.updateProductView = function (req, res, next) {

  // get product from validate ok
  let productId = req.params.productId;

  let product = ProductModel.findById(productId);

  let newProduct = product.views + 1;

  Common.customLog(req, 'updateProductView', newProduct);

  // save product
  ProductModel.findByIdAndUpdate(productId, { $set: product }, {}, function (err, product) {
    if (err) {
      Common.customLog(null, 'updateProductView', err);
      res.json({
        error: 'updateFailed'
      });
    } else {
      res.json({
      });
    }
  });
}
/**
 * find product
 */
exports.findProducById = async function (req, res, next) {
  try {

    // get product id from request
    let productId = req.params.productId;

    // get product information
    let product = await ProductModel.findById(productId);

    // render screen
    req.product = product;

    next();

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

/**
 * Delete product
 */
exports.deleteProduct = async function (req, res, next) {
  try {

    // get product id from request
    let productId = req.params.productId;
    let complete = Common.deleteSuccess;

    // get product information
    let product = await ProductModel.findById(productId);

    if (!product) {
      complete = Common.failedAction;
      Common.customLog(req, 'deleteProduct', 'product not exits.');
    } else {
      // detete product
      let result = await ProductModel.findByIdAndRemove(productId);
      Common.customLog(req, 'deleteProduct', 'delete product', productId, result);
    }

    // render list again
    res.render(Common.PRODUCT_DELETE_PATH_RENDER, {
      title: Common.PRODUCT_DELETE_TITLE,
      completed: complete
    });

  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.PRODUCT_DELETE_PATH_RENDER,
      Common.PRODUCT_DELETE_TITLE
    );
  }
}

/**
 * Get portfolio only for API
 */
exports.getPortfolio = async function (req, res, next) {
  try {

    // sort desc by createDate, views
    let sort = {
      sort: {
        createDate: -1,
        views: -1,
        starts: -1
      }
    };
    // projection
    let projection = {
      title: 1,
      'image.$.pathImage': 1,
      price: 1,
      priceSale: 1
    };
    // get only product have image and default image
    let query = {
      image: {
        $gt: []
      },
      'image.defaultImage': true
    };

    // only get first 6 records
    let paggingObj = {
      skip: 0,
      limit: 6
    }

    // when route banner
    if (Common.isRoute(req, Common.BANNER)) {
      // get only product image that have setting banner
      query = { 'image.bannerImage': true };

      // only get 3 records
      paggingObj.limit = 3;

    }

    // get list products
    // find product that image have image
    let products = await getProducts(query, projection, sort);

    // output json
    res.json(products);
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
