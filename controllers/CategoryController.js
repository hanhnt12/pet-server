const config = require('../config/config');
const Common = require('../common/common');

/**
 * validate when post update category
 */
exports.validateUpdatePost = function (req, res, next) {

  // validate data
  Common.checkBodyRequestLength(req, 'name');
  Common.checkBodyRequestLength(req, 'nameMenu', 4, 50);
  Common.checkBodyRequestLength(req, 'title', 10, 100);
  Common.checkBodyRequestLength(req, 'description', 10, 500);
  Common.checkBodyRequestLength(req, 'display', 1, 1);

  // santize
  Common.santizeItem('categoryId');
  Common.santizeItem('name');
  Common.santizeItem('nameMenu');
  Common.santizeItem('title');
  Common.santizeItem('description');
  Common.santizeItem('display');

  // validate error
  let errors = req.validationErrors();

  // create object to keep data
  let category = {
    name: req.body.name,
    nameMenu: req.body.nameMenu,
    title: req.body.title,
    description: req.body.description,
    display: req.body.display === "1",
    _id: req.params.categoryId
  };

  // when validate have error
  if (errors) {

    // log error
    Common.customLog(req, 'category update validateUpdatePost', 'error', errors);

    // render screen error
    Common.renderError(
      req,
      res,
      errors,
      Common.CATEGORY_PATH_RENDER_UPDATE,
      Common.CATEGORY_TITLE_UPDATE,
      category
    );
  } else {
    // set to update
    req.category = category;
    next();
  }
}

/**
 * prepare get category
 * prepare object query, sort, projection
 */
exports.getCategoriesAPI = function (req, res, next) {

  // create query object
  // only get category is set display true
  let queryObj = {
    display: true
  };

  // projection
  let projection = 'imagePath name nameMenu title description';

  // sorting follow displayOrder
  // 1: asc: -1: desc
  let sortObj = {
    sort: { 
      displayOrder: 1 
    }
  };

  // set all object to request
  Common.setQueryToRequest(req, queryObj, projection, sortObj)

  next();
}