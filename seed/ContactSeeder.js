let Contact = require('../models/ContactModel');
let mongoose = require('mongoose');
const dbUrl = require('../config/config').url

mongoose.connect(dbUrl);

var contact = [
  new Contact({
    phone: '0123456789',
    mobile: '0123456789',
    email: 'hanhnt@gmail.com'
  })
]

var done = 0;
for (let i = 0; i < contact.length; i++) {
  contact[i].save((err, result) => {
    done++;
    console.log(`inserted: ${result}`)
    if (done === contact.length) {
      mongoose.disconnect();
    }
  })
}