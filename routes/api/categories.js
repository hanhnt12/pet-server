var express = require('express');
var router = express.Router();
let CategoryService = require('../../services/CategoryService');
let CategoryController = require('../../controllers/CategoryController');

/* get list categories */
router.get('/', CategoryController.getCategoriesAPI, CategoryService.getCategories);

module.exports = router;
