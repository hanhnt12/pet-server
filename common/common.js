const config = require('../config/config');

// define constant
const DASH_BOARD = 'dashboard';
// define banner route
exports.BANNER = 'banner';

// for dashboard
exports.DASHBOARD_PATH_RENDER = 'dashboard/index';
exports.DASHBOARD_TITLE = 'Welcome to System dashboard';
// for category
exports.CATEGORY_PATH_RENDER = 'dashboard/category/index';
exports.CATEGORY_PATH_RENDER_UPDATE = 'dashboard/category/update';
exports.CATEGORY_TITLE = 'Category information';
exports.CATEGORY_TITLE_UPDATE = 'Update category information';

// for product
exports.PRODUCT_PATH_RENDER = 'dashboard/product/index';
exports.PRODUCT_TITLE = 'Danh sách sản phẩm';
exports.PRODUCT_ADD_PATH_RENDER = 'dashboard/product/add';
exports.PRODUCT_ADD_TITLE = 'Thêm mới sản phẩm';
exports.PRODUCT_DELETE_PATH_RENDER = 'dashboard/product/delete';
exports.PRODUCT_DELETE_TITLE = 'Xóa sản phẩm';
exports.PRODUCT_UPDATE_PATH_RENDER = 'dashboard/product/update';
exports.PRODUCT_UPDATE_TITLE = 'Update sản phẩm';

// for contact
exports.CONTACT_UPDATE_PATH_RENDER = 'dashboard/contact';
exports.CONTACT_UPDATE_TITLE = 'Update thông tin liên hệ';

// record per page products
exports.DEFAULT_RECORD_PER_PAGE = 6;

// status sucess update
exports.updateSuccess = {
  success: true,
  message: 'Update thành công'
}

// status sucess update
exports.insertSuccess = {
  success: true,
  message: 'Insert thành công'
}

// status sucess delete
exports.deleteSuccess = {
  success: true,
  message: 'Đã xóa'
}

// status sucess delete
exports.failedAction = {
  success: false,
  message: 'Id không tồn tại'
}

// default message error
exports.commonError = {
  success: false,
  msg: 'Chúng tôi rất đông đúc. <br />Vui lòng quay lại sau.'
}

/**
 * write log value
 */
function customLog(req, ...value) {
  if (config.GET_LOG_DEBUG) {
    if (req) {
      console.log(new Date() + req.method + '--------- Request for: ' + req.originalUrl);
    }

    for (val of value) {
      console.log(val);
    }
  }
}

/**
 * Check route access
 */
function isRoute(req, routePattern) {
  // if url contains dashboard
  if (req.originalUrl.indexOf(routePattern) > 0) {
    return true;
  }
  return false;
}

/**
 * handler common error
 * both web and api
 */
function renderError(req, res, err, pathRender, title, dataError) {

  var errors = [];

  // if error is object have msg property
  if (err && err.msg) {
    errors.push(err);
  }

  // if error can not handler
  // only display first error by break in for loop
  if (!err || (err.constructor !== Array && !err.msg)) {
    customLog(null, 'renderError', '++++++++++++++++++++++++FATAL ERROR++++++++++++++++++++++++ ', err);
    errors.push(createObjError('Chúng tôi rất đông đúc. <br/> Vui lòng quay lại sau.'));
    customLog(null, 'renderError', '++++++++++++++++++++++++FATAL ERROR++++++++++++++++++++++++ ');
  } else {
    for (let i = 0; i < err.length; i++) {
      // only display the first error
      if (err[i].msg) {
        errors.push(err[i]);
      } else {
        customLog(req, 'renderError', '++++++++++++++++++++++++FATAL ERROR++++++++++++++++++++++++ ');
        errors.push(createObjError('Undefined message error.'));
        customLog(req, 'renderError', '++++++++++++++++++++++++FATAL ERROR++++++++++++++++++++++++ ');
      }
      break;
    }
    // errors = err;
  }

  // set default title
  if (!title) {
    title = 'Error';
  }

  // when fron dashboar route
  if (req.isDashboardRoute) {
    res.render(pathRender, {
      title: title,
      errors: errors,
      dataError: dataError
    });
  } else {
    // log error for api
    res.json(this.commonError);
  }
}

/**
 * check length of item
 */
exports.checkBodyRequestLength = (req, item, min = 4, max = 50) => {

  // log param
  // customLog(req, 'checkBodyRequestLength', `item: ${item}`, `min: ${min}`, `max: ${max}`)

  // convert min, max to number
  min = parseInt(min);
  max = parseInt(max);

  // if not set item then return
  if (!item || !min || !max) {
    return;
  }

  // create message error
  let message = `${item} phải có ít nhất ${min} ký tự`

  if (max !== min || max > min) {
    message += ` và nhiều nhất ${max} ký tự`;
  }

  message += '.';

  // validate
  req.checkBody(item, message).isLength({ min: min, max: max });
}

/**
 * check item is number
 */
exports.checkBodyRequestNumber = (req, item) => {
  // if not set item then return
  if (!item) {
    return;
  }

  // create message error
  let message = `${item} phải là kiểu số.`;

  // validate
  req.checkBody(item, message).isNumeric();
}

/**
 * santize item
 */
exports.santizeItem = (req, item) => {
  // if not set item then return
  if (!item) {
    return;
  }
  req.sanitize(item).escape();
  req.sanitize(item).trim();
}

/**
 * validate object id of mongo
 */
function isValidObjectId(id) {
  // if (!id) {
  //   return false;
  // }

  if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    return true;
  }

  return false;
}

/**
 * function to create common object error
 * @param {string} msg 
 */
function createObjError(msg, itemName, exist) {

  // if exist message, render it
  if (msg) {
    message = msg;
  } else {

    // if not exist message, create new message
    message = `${itemName}`;
    // if error about exist data
    if (!exist) {
      message += ` không tồn tại.`;
    } else {
      message = ` đã có lỗi xảy ra`
    }
  }
  // return common error object
  return {
    msg: message
  }
}

/**
 * Cut characters before display
 * input: string, length after cut
 */
function cutCharacter(strInput, length) {

  // if input doesn't exist return empty string
  if (!strInput) {
    return '';
  }

  // cut character
  if (strInput.length > length) {
    return strInput.slice(0, length) + '...'
  } else {
    return strInput
  }
}

/**
 * create pagging object
 */
function calculatePagging(page, perPage) {

  // set default page
  if (!Number.isInteger(parseInt(page)) || page < 1) {
    page = 1;
  }

  // set default page
  if (!Number.isInteger(parseInt(perPage)) || perPage < this.DEFAULT_RECORD_PER_PAGE) {
    perPage = this.DEFAULT_RECORD_PER_PAGE;
  }

  // calculate pagging
  let limit = perPage;
  let skip = limit * (page - 1);

  customLog(null, 'commmon calculate pagging', 'page: ' + page, 'per_page: ' + perPage);

  // create paging object
  return {
    skip: skip,
    limit: limit
  }
}

/**
 * check object is empty
 */
function isEmpty(obj) {

  if (!obj) {
    return true;
  }

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

/**
 * create url for pagging
 * @param {request} req 
 */
function createUrlPagination(req) {
  let qs = require('querystring');
  let params = req.query;

  delete params.page

  customLog(null, 'createUrlPagination', params, req.url, qs.stringify(params));

  if (isEmpty(params)) {
    return '';
  }

  return qs.stringify(params);
}

/**
 * Create image object
 * @param {request} req 
 */
function createImageObject(req) {
  let image = [];

  // if request 1 image
  if (req.body.imagePath && typeof req.body.imagePath === 'string') {
    let imgObj = {};
    // if exist image path then create image object
    if (req.body.imagePath) {
      imgObj.pathImage = req.body.imagePath;
      imgObj.defaultImage = true;
      image.push(imgObj);
    }

    // set default banner
    if (req.body.bannerImage) {
      imgObj.bannerImage = true;
    } else {
      imgObj.bannerImage = false;
    }
  } else if (req.body.imagePath.length > 0) {
    // loop images request
    for (let i = 0; i < req.body.imagePath.length; i++) {
      let imgObj = {};
      // if exist image path then create image object 
      if (req.body.imagePath[i]) {
        imgObj.pathImage = req.body.imagePath[i];
        // set default image
        if (req.body.defaultImage == (i + 1)) {
          imgObj.defaultImage = true;
        } else {
          imgObj.defaultImage = false
        }

        // set display banner
        if (req.body.bannerImage == (i + 1)) {
          imgObj.bannerImage = true;
        } else {
          imgObj.bannerImage = false
        }
        image.push(imgObj);
      }
    }
    customLog(null, 'default image', req.body.defaultImage);
  }

  customLog(null, 'create image object', image);

  return image;
}

/**
 * Create free items
 * @param {request} req 
 */
function createFreeItems(req) {
  let freeItems = [];

  // max 5 free items, start from 1
  for (let i = 1; i <= 5; i++) {
    let itemTitle = "freeTitle" + i;
    let itemValue = "freeValue" + i;

    // santize
    this.santizeItem(req, itemTitle);
    this.santizeItem(req, itemValue);

    // get title and name of free item from request
    let title = req.body[itemTitle];
    let value = req.body[itemValue];

    let freeObj = {};

    // create object free item
    if (title && value) {
      freeObj.title = title
      freeObj.value = value
    }

    // if free item have value and title then add to array
    if (!isEmpty(freeObj)) {
      freeItems.push(freeObj);
    }
  }

  return freeItems;
}

/**
 * Set query, projectin, sort to request
 * @param {*} req 
 * @param {*} queryObj 
 * @param {*} projection 
 * @param {*} sortObj 
 * @param {*} isDashboardRoute 
 */
function setQueryToRequest(req, queryObj = {}, projection = '', sortObj = {}, paggingObj = {}) {
  req.queryObj = queryObj;
  req.projection = projection;
  req.sortObj = sortObj;
  paggingObj.paggingObj = paggingObj;
}

exports.customLog = customLog;

exports.isRoute = isRoute;

exports.renderError = renderError;

exports.isValidObjectId = isValidObjectId;

exports.createObjError = createObjError;

exports.cutCharacter = cutCharacter;

exports.calculatePagging = calculatePagging;

exports.createUrlPagination = createUrlPagination;

exports.isEmpty = isEmpty;

exports.createImageObject = createImageObject;

exports.createFreeItems = createFreeItems;

exports.setQueryToRequest = setQueryToRequest;