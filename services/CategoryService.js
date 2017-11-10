let CategoryModel = require('../models/CategoryModel');
const config = require('../config/config');
const Common = require('../common/common');

const DEFAULT_PROJECTION = 'imagePath name nameMenu title description amount display displayOrder'

/**
 * Get list categories name
 */
exports.getCategoryName = async function (req, res, next) {
  try {
    // query
    let query = { display: true };

    // only get name and _id
    let projection = 'name'

    // sorting follow displayOrder
    // 1: asc: -1: desc
    let sort = { sort: { displayOrder: 1 } };
    // use model to query db
    let categories = await CategoryModel.find(query, projection, sort);

    // set result to request
    req.categories = categories;

    // next handler
    next();

    // Handler error
  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.CATEGORY_PATH_RENDER,
      Common.CATEGORY_TITLE
    );
  }
}


/**
 * Get list categories
 */
exports.getCategories = async function (req, res) {
  try {
    // query from request or create
    let query = req.queryObj || {};

    // projection
    let projection = req.projection || DEFAULT_PROJECTION;

    // sort order
    let sort = req.sortObj || {};

    // use model to query db
    let categories = await CategoryModel.find(query, projection, sort);

    if (!req.isDashboardRoute) {
      // output json
      res.json(categories);
    } else {
      res.render(Common.CATEGORY_PATH_RENDER, {
        title: Common.CATEGORY_TITLE,
        categories: categories
      });
    }
    // Handler error
  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.CATEGORY_PATH_RENDER,
      Common.CATEGORY_TITLE
    );
  }
}

/**
 * Get information to confirm category (for dashboard)
 */
exports.updateCategoryGet = async function (req, res, next) {
  try {
    // get category id
    let categoryId = req.params.categoryId

    // use model to query db
    let category = await CategoryModel.findById(categoryId);
    Common.customLog(req, 'updateCategoryGet', category);

    // if can not get category
    if (!category) {
      // create error object
      let error = Common.createObjError('', 'Category');

      // render error
      Common.renderError(
        req,
        res,
        error,
        Common.CATEGORY_PATH_RENDER_UPDATE,
        Common.CATEGORY_TITLE_UPDATE
      );
    } else {
      res.render(Common.CATEGORY_PATH_RENDER_UPDATE, {
        title: Common.CATEGORY_TITLE_UPDATE,
        category: category
      });
    }
  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.CATEGORY_PATH_RENDER_UPDATE,
      Common.CATEGORY_TITLE_UPDATE
    );
  }
}

/**
 * Update category (for dashboard)
 */
exports.updateCategoryPost = async function (req, res, next) {
  try {

    // create object to update
    let category = req.category;

    // get category id
    let categoryId = category._id;

    // log value to update
    Common.customLog(req, 'update category updateCategoryPost', 'value to update', category);

    // Update category
    let result = await CategoryModel.findByIdAndUpdate(categoryId, category, {});

    if (!result) {
      Common.customLog(req, 'update category', 'Update failed', result);
      // render again with error
      res.render(Common.CATEGORY_PATH_RENDER_UPDATE, {
        title: Common.CATEGORY_TITLE_UPDATE,
        category: category,
        completed: Common.failedAction
      });
    } else {

      // render again
      res.render(Common.CATEGORY_PATH_RENDER_UPDATE, {
        title: Common.CATEGORY_TITLE_UPDATE,
        category: category,
        completed: Common.updateSuccess
      });
    }

  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.CATEGORY_PATH_RENDER_UPDATE,
      Common.CATEGORY_TITLE_UPDATE
    );
  }
}
