const config = require('../config/config');
const Common = require('../common/common');

/**
 * validate category id
 */
exports.validateCategoryId = function (req, res, next) {

  // get parameter
  let categoryId = req.params.categoryId;

  // validate category id
  if (!Common.isValidObjectId(categoryId)) {
    // define error
    let error = Common.createObjError('', 'Category', false);

    // render screen error
    Common.renderError(
      req,
      res,
      error,
      Common.CATEGORY_PATH_RENDER,
      Common.CATEGORY_TITLE
    );
  } else {
    next();
  }
}

/**
 * validate when post update category
 */
exports.validateUpdatePost = function (req, res, next) {

  // validate data
  Common.checkBodyRequestLength(req, 'name');
  Common.checkBodyRequestLength(req, 'title', 10, 100);
  Common.checkBodyRequestLength(req, 'description', 10, 4000);
  Common.checkBodyRequestLength(req, 'display', 1, 1);

  // santize
  req.sanitize('categoryId').escape();
  req.sanitize('categoryId').trim();
  req.sanitize('name').escape();
  req.sanitize('name').trim();
  req.sanitize('title').escape();
  req.sanitize('title').trim();
  req.sanitize('description').escape();
  req.sanitize('description').trim();
  req.sanitize('display').escape();
  req.sanitize('display').trim();

  // validate error
  let errors = req.validationErrors();

  // when validate have error
  if (errors) {

    // log error
    Common.customLog(req, 'validateUpdatePost', 'error', errors);

    // create object to keep data
    let category = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      display: req.body.display === "1",
      _id: req.body.categoryId
    };

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
    next();
  }
}