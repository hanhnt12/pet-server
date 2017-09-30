var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find({}, (err, docs) => {
    res.json({error: 'notFound'});
  });
});

module.exports = router;
