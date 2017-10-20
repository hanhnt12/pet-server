let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Common = require('../common/common');

let schema = new Schema({
  imagePath: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    id: { type: Schema.ObjectId, ref: 'category' },
    name: { type: String, ref: 'category.name' },
  },
  views: { type: Number, default: 0 },
  starts: { type: Number, default: 1 },
  amount: { type: Number, default: 1 },
  createDate: { type: Date, default: Date.now },
});

schema
  .virtual('url')
  .get(function () {
    return '/product/' + this._id;
  });

schema
  .virtual('urlCategory')
  .get(function () {
    return '/product/' + this.category;
  });

// cut character description
schema
  .virtual('descriptionDisplay')
  .get(function () {
    return Common.cutCharacter(this.description, 200);
  });

// url details product and update
schema
  .virtual('urlUpdate')
  .get(function () {
    return '/dashboard/product/' + this._id + '/update';
  });

// url details product and delete
schema
  .virtual('urlDelete')
  .get(function () {
    return '/dashboard/product/' + this._id + '/delete';
  });

module.exports = mongoose.model('products', schema);