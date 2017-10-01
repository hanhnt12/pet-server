let CategoryModel = require('../models/CategoryModel');
const config = require('../config/config');

// get list categories
exports.getCategories = async function (req, res) {
  try {
    // query
    let query = { display: true };
    // projection
    let projection = 'imagePath name title description amount'
    // sorting follow displayOrder
    // 1: asc: -1: desc
    let sort = { sort: { displayOrder: 1 } };
    // use model to query db
    let categories = await CategoryModel.find(query, projection, sort);

    // output json
    res.json(categories);
    // Handler error
  } catch (err) {
    console.log(err);
    res.json(config.commonError);
  }
}
