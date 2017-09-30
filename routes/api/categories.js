var express = require('express');
var router = express.Router();
let Category = require('../../models/category');

/* get list categories */
router.get('/', function (req, res, next) {
  // use model to query db
  Category.find({}, (err, docs) => {
    res.json(docs);
  });
});

module.exports = router;
