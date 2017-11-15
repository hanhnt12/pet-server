let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    title: { type: String, required: true, max: 50 },
    caption: { type: String, required: true, max: 500 },
    name: { type: String, required: true, max: 50 },
    phone: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    facebookLink: { type: String },
    categoryHome: { type: String, max: 50 },
    categoryProduct: { type: String, max: 50 }
});

module.exports = mongoose.model('contact', schema);