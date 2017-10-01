var express = require('express');
var router = express.Router();
let CategoryService = require('../../services/CategoryService');

/* get list categories */
router.get('/', CategoryService.getCategories);

module.exports = router;
