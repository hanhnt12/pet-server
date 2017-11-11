const config = require('../config/config');
const Common = require('../common/common');

/**
 * validate id get from params is correct 
 */
exports.validateObjectId = function (req, res, next) {

  // santize
  Common.santizeItem('categoryId');
  Common.santizeItem('productId');
  Common.santizeItem('contactId');

  // get parameter
  let categoryId = req.params.categoryId;
  let productId = req.params.productId;
  let contactId = req.params.contactId;

  let id = categoryId || productId || contactId;

  // validate category id
  if (!Common.isValidObjectId(id)) {

    Common.customLog(req, 'validateObjectId', 'Id không đúng.');
    if (req.isDashboardRote) {
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
      } else if (req.originalUrl.indexOf('contact') > 0) {
        pathRender = Common.CONTACT_UPDATE_PATH_RENDER;
        pathTitle = Common.CONTACT_UPDATE_TITLE;
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
      res.json({
        error: 'errorID'
      });
    }
  } else {
    next();
  }
}