let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    phone: { type: String, required: true },
    mobile: { type: String, required: true},
    email: { type: String, required: true, lowercase: true },
});

module.exports = mongoose.model('contact', schema);