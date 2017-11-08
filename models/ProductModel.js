let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Common = require('../common/common');

let schema = new Schema({
  title: { type: String, required: true, min: 10, max: 100 },
  image: [
    {
      pathImage: { type: String, required: true, min: 10 },
      defaultImage: { type: Boolean, default: false }
    }
  ],
  category: {
    id: { type: Schema.ObjectId, ref: 'category' },
    name: { type: String, ref: 'category.name' },
  },
  description: { type: String, required: true, min: 10, max: 4000 },
  price: { type: Number, default: 0 },
  priceSale: { type: Number, default: 0 },
  amount: { type: Number, default: 1 },
  freeItems: [
    {
      title: { type: String, max: 50},
      value: { type: String, max: 50}
    }
  ],
  display: { type: Boolean, required: true, default: true },
  views: { type: Number, default: 1 },
  starts: { type: Number, default: 1 },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
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

// src of image display
schema
  .virtual('imagePath')
  .get(function () {
    if (this.image && this.image.length > 0) {
      for (let i = 0; i < this.image.length; i++) {
        if (this.image[i].defaultImage) {
          return this.image[i].pathImage;
        }
      }
    }
    return '';
  });

module.exports = mongoose.model('products', schema);