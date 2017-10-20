const config = require('../config/config');

// define constant
exports.CATEGORY_PATH_RENDER = 'dashboard/category/index';
exports.CATEGORY_PATH_RENDER_UPDATE = 'dashboard/category/update';
exports.CATEGORY_TITLE = 'Category information';
exports.CATEGORY_TITLE_UPDATE = 'Update category information';

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

/**
 * write log value
 */
function customLog(req, ...value) {
  if (req) {
    console.log(req.method + ': ' + req.url);
  }

  for (val of value) {
    console.log(val);
  }
}

/**
 * Check route is from dashboard
 * to distinguish with api route
 */
function isDashboardRote(req) {
  // log url
  customLog(req, 'isDashboardRote', req.originalUrl);

  // if url contains dashboard
  if (req.originalUrl.indexOf(config.DASH_BOARD) > 0) {
    return true;
  }

  return false;
}

/**
 * handler common error
 * both web and api
 */
function renderError(req, res, err, pathRender, title) {

  // log error
  customLog(req, 'renderError', err);

  // set default title
  if (!title) {
    title = config.commonError.message;
  }

  // when fron dashboar route
  if (isDashboardRote(req)) {
    res.render(pathRender, {
      title: title,
      errorMessage: err
    });
  } else {
    // log error for api
    res.json(config.commonError);
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
 * validate object id of mongo
 */
function isValidObjectId(id) {
  if (!id) {
    return false;
  }

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    return true;
  }

  return false;
}

exports.customLog = customLog;

exports.isDashboardRote = isDashboardRote;

exports.rederError = renderError;

exports.isValidObjectId = isValidObjectId;