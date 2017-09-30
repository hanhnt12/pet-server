let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  imagePath: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  category: {
    id: {type: Schema.ObjectId, ref: 'category'},
    name: {type: String, ref: 'category.name'},
  },
  views: {type: Number, default: 0},
  starts: {type: Number, default: 1},
  amount: {type: Number, default: 1},
});

schema
.virtual('url')
.get(function() {
    return '/product/' + this._id;
});

schema
.virtual('urlCategory')
.get(function() {
    return '/product/' + this.category;
});

module.exports = mongoose.model('products', schema);