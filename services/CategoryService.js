let CategoryModel = require('../models/CategoryModel');
const config = require('../config/config');
const Common = require('../common/common');

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
    // query
    let query = { display: true };
    let dashboardF = false;

    // projection
    let projection = 'imagePath name title description amount'

    // when route from dashboard, query all and projection all
    if (Common.isDashboardRote(req)) {
      dashboardF = true;
      query = {};
      projection = '';
    }

    // sorting follow displayOrder
    // 1: asc: -1: desc
    let sort = { sort: { displayOrder: 1 } };
    // use model to query db
    let categories = await CategoryModel.find(query, projection, sort);
    console.log(categories);

    if (!dashboardF) {
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
 * Get information to confirm category
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
 * Update category
 */
exports.updateCategoryPost = async function (req, res, next) {
  try {
    // get category id
    let categoryId = req.params.categoryId

    // create object to update
    let category = new CategoryModel({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      display: req.body.display === "1",
      _id: categoryId
    });

    // log value to update
    Common.customLog(req, 'updateCategoryPost', 'value to update', category);

    // Update category
    let result = await CategoryModel.findByIdAndUpdate(categoryId, category, {});

    // log result update
    Common.customLog(null, 'updateCategoryPost', 'Result update', result);

    // render again
    res.render(Common.CATEGORY_PATH_RENDER_UPDATE, {
      title: Common.CATEGORY_TITLE_UPDATE,
      category: category,
      completed: Common.updateSuccess
    });

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
