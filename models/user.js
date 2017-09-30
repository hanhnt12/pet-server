var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define schema for use model
var UserSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ['client', 'manager', 'admin'],
    default: 'client'
  }
});

// generate hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

// UserSchema.pre('save', function (next) {
//   var user = this;
//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, function (err, salt) {
//       if (err) {
//         return next(err);
//       }
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         if (err) {
//           return next(err);
//         }
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

module.exports = mongoose.model('User', UserSchema);
