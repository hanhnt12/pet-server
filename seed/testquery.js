let Product = require('../models/product');
let Category = require('../models/category');
let mongoose = require('mongoose');
const dbUrl = require('../config/db').url

mongoose.connect(dbUrl);

Product.find({'category.name': 'pet'}, (err, docs) => {
  docs.forEach((doc) => {
    console.log(doc);
  })
});