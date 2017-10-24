const config = require('../config/config');
const Common = require('../common/common');

/**
 * validate search condition
 */
exports.validateSearch = function (req, res, next) {

  // santize
  req.sanitize('category').escape();
  req.sanitize('category').trim();
  req.sanitize('q').escape();
  req.sanitize('q').trim();

  next();
}

function validateCategory(req) {
  // get category from master
  let categories = req.categories;

  // get category from request
  let categoryRequest = req.body.category;
  let category = {};

  // if exist from request and master
  if (categoryRequest && categories) {
    // extract data
    let arrCategory = categoryRequest.split(',');
    category._id = arrCategory[0];
    category.name = arrCategory[1];

    // check category request exist on master
    // if not exist then return false
    // else return category
    if (!categories.indexOf(category)) {
      return false;
    } else {
      return category;
    }
  } else {
    return false;
  }
}

/**
 * validate when post update category
 */
exports.validateAddPost = function (req, res, next) {

  // validate data
  Common.checkBodyRequestLength(req, 'title', 10, 100);
  Common.checkBodyRequestLength(req, 'description', 10, 4000);
  // Common.checkBodyRequestNumber(req, 'category');
  // Common.checkBodyRequestNumber(req, 'amount');
  // Common.checkBodyRequestNumber(req, 'price');
  // Common.checkBodyRequestNumber(req, 'priceSale');

  // santize
  Common.santizeItem(req, 'title');
  Common.santizeItem(req, 'description');

  // validate error
  let errors = req.validationErrors() || [];

  // validate category exist in master
  let category = validateCategory(req);

  // if have error when validate
  // push to error common
  if (!category) {
    let error = Common.createObjError(null, 'Loại sản phẩm');
    error["param"] = 'category';
    errors.push(error);
  }

  let images = Common.createImageObject(req);

  // create object to keep data
  let product = {
    title: req.body.title,
    image: images,
    category: category,
    description: req.body.description,
    amount: req.body.amount,
    price: req.body.price,
    priceSale: req.body.priceSale,
    categories: req.categories
  };

  // when validate have error
  if (errors && errors.length > 0) {

    // log error
    Common.customLog(req, 'validateAddPost', 'error', errors);

    // render screen error
    Common.renderError(
      req,
      res,
      errors,
      Common.PRODUCT_ADD_PATH_RENDER,
      Common.PRODUCT_ADD_TITLE,
      product
    );
  } else {
    // add to request to perform save to db
    req.product = product;
    next();
  }
}