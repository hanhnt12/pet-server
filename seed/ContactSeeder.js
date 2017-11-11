let Contact = require('../models/ContactModel');
let mongoose = require('mongoose');
const dbUrl = require('../config/config').url

console.log('Connecting:' + dbUrl)
if (!dbUrl.startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}
mongoose.connect(dbUrl, {
  useMongoClient: true
});

var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var contact = new Contact({
  title: 'Hãy Liên Lạc!',
  caption: 'Sẵn sàng để sở hữu pets của bạn? Thật tuyệt! Hãy gọi cho chúng tôi hoặc gửi email cho chúng tôi và chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể!',
  name: 'Mr.CuongHim',
  phone: '0123456789',
  mobile: '0123456789',
  email: 'hanhnt@gmail.com'
});

// var done = 0;
// for (let i = 0; i < contact.length; i++) {
contact.save((err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`inserted: ${result}`)
  mongoose.disconnect();
});
// }