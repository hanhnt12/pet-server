let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  imagePath: {type: String, required: true},
  name: {type: String, required: true, lowercase: true, unique: true},
  title: {type: String, required: true, lowercase: true},
  description: {type: String, required: true},
  amount: {type: Number, required: true, default: 0},
});

module.exports = mongoose.model('category', schema);