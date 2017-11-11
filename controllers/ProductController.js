const config = require('../config/config');
const Common = require('../common/common');

/**
 * validate search condition
 * set query to request
 */
exports.validateSearch = function (req, res, next) {

  // santize
  Common.santizeItem(req, 'category');
  Common.santizeItem(req, 'q');

  // get category name from request
  let categoryName = req.params.category || req.query.category || req.body.category;
  let productTitle = req.params.q || req.query.q || req.body.q;
  let page = req.query.page || req.body.page || 1;
  let perPage = req.query.perPage || req.body.perPage || Common.DEFAULT_RECORD_PER_PAGE;
  Common.customLog(req, 'create query search', `categoryName: ${categoryName}`, `productTitle: ${productTitle}`);

  // define object search
  let queryCategory = {};
  let queryTitle = {};
  let queryObj = {};
  let paggingObj = {};

  // if search by category
  if (categoryName) {
    queryCategory = { 'category.name': categoryName };
  }

  // if search by title
  if (productTitle) {
    queryTitle.title = {
      $regex: productTitle,
      $options: 'i'
    };
  }

  // create query object
  if (categoryName && productTitle) {
    queryObj = { $and: [queryCategory, queryTitle] };
  } else if (categoryName) {
    queryObj = queryCategory;
  } else if (productTitle) {
    queryObj = queryTitle;
  } else {
    queryObj = {};
  }

  // projection
  let projection = 'image title price priceSale views category';

  // sorting follow displayOrder
  // 1: asc: -1: desc
  let sortObj = {
    sort: {
      displayOrder: -1
    }
  };

  // get most view product
  if (categoryName === 'most_view') {
    Common.customLog(req, 'get most view product', queryCategory)
    // sort desc by views
    sortObj = { sort: { views: -1 } };
    queryObj = {};
    paggingObj = {
      skip: 0,
      limit: 3
    }
  }

  // set all object to request
  Common.setQueryToRequest(req, queryObj, projection, sortObj, paggingObj);
  req.page = page;
  req.perPage = perPage;

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
  Common.checkBodyRequestNumber(req, 'amount');
  Common.checkBodyRequestNumber(req, 'price');
  Common.checkBodyRequestNumber(req, 'priceSale');

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
  let freeItems = Common.createFreeItems(req);

  // create object to keep data
  let product = {
    title: req.body.title,
    image: images,
    category: category,
    description: req.body.description,
    freeItems: freeItems,
    amount: req.body.amount,
    price: req.body.price,
    priceSale: req.body.priceSale,
    _id: req.params.productId
  };

  // when validate have error
  if (errors && errors.length > 0) {

    // add category to return 
    product.categories = req.categories

    // log error
    Common.customLog(req, 'validateAddPost', 'error', errors);

    let pathRender = Common.PRODUCT_ADD_PATH_RENDER;
    let pathTitle = Common.PRODUCT_ADD_TITLE;

    if (req.originalUrl.indexOf('update') > 0) {
      pathRender = Common.PRODUCT_UPDATE_PATH_RENDER;
      pathTitle = Common.PRODUCT_UPDATE_TITLE;
    }

    // render screen error
    Common.renderError(
      req,
      res,
      errors,
      pathRender,
      pathTitle,
      product
    );
  } else {
    // add to request to perform save to db
    req.product = product;
    next();
  }
}