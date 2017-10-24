const config = require('../config/config');
const Common = require('../common/common');

/**
 * validate id get from params is correct 
 */
exports.validateObjectId = function (req, res, next) {

  // santize
  Common.santizeItem('categoryId');
  Common.santizeItem('productId');

  // get parameter
  let categoryId = req.params.categoryId;
  let productId = req.params.productId;

  let id = categoryId || productId;

  // validate category id
  if (!Common.isValidObjectId(id)) {

    Common.customLog(req, 'validateObjectId', 'Id không đúng.');

    // define error
    let error = Common.createObjError('', 'ID', false);

    let pathRender = Common.DASHBOARD_PATH_RENDER;
    let pathTitle = Common.DASHBOARD_TITLE;

    if (req.originalUrl.indexOf('product') > 0) {
      pathRender = Common.PRODUCT_UPDATE_PATH_RENDER;
      pathTitle = Common.PRODUCT_UPDATE_TITLE;
    } else if (req.originalUrl.indexOf('categor') > 0) {
      pathRender = Common.CATEGORY_PATH_RENDER_UPDATE;
      pathTitle = Common.CATEGORY_TITLE_UPDATE;
    }

    // render screen error
    Common.renderError(
      req,
      res,
      error,
      pathRender,
      pathTitle
    );
  } else {
    next();
  }
}