let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    imagePath: { type: String, required: true },
    name: { type: String, required: true, lowercase: true, unique: true },
    nameMenu: { type: String, required: true},
    title: { type: String, required: true, lowercase: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    createDate: { type: Date, default: Date.now },
    display: { type: Boolean, default: true },
    displayOrder: { type: String, lowercase: true, default: '' },
});

schema
    .virtual('url')
    .get(function () {
        return '/category/' + this._id;
    });

schema
    .virtual('imageSrc')
    .get(function () {
        return '/images/' + this.imagePath;
    });

// create url to update category
schema
    .virtual('urlUpdate')
    .get(function () {
        return '/dashboard/category/' + this._id + '/update';
    });

// create url to delete category
schema
    .virtual('urlDelete')
    .get(function () {
        return '/dashboard/' + this._id + '/delete';
    });

// status display, non display
schema
    .virtual('status')
    .get(function () {
        if (this.display) {
            return 'Hiển thị'
        }

        return 'Không hiển thị'
    });

// status display, non display
schema
    .virtual('productCategory')
    .get(function () {
        return '/products/' + this.name;
    });

module.exports = mongoose.model('category', schema);