const config = require('../config/config');
const UserService = require('../services/UserService');

// authenticate user
exports.authenticate = async function (req, res, next) {

}

// validate when submit register
exports.register = function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let role = req.body.role;

  let error = false;
  let item = '';
  let message = '';

  if (!username) {
    error = true;
    item = 'username';
    message = 'Vui lòng nhập username.';
  }

  if (!error && !password) {
    error = true;
    item = 'password';
    message = 'Vui lòng nhập password.';
  }

  if (!error && (username.length < 4 || username.length > 50)) {
    error = true;
    item = 'username';
    message = 'Username phải có ít nhất 4 ký tự và không được vượt quá 50 ký tự.';
  }

  if (!error && password.length < 4) {
    error = true;
    item = 'password';
    message = 'Password phải có ít nhất 4 ký tự.';
  }

  // validate character
  const regex = /^[a-zA-Z0-9]{4,50}$/
  if (!error && !regex.test(username)) {
    error = true;
    item = 'username';
    message = 'Username phải là số hoặc chữ.';
  }

  // check role exist in master
  if (!error && (!role || config.userRoles.indexOf(role) < 0)) {
    error = true;
    item = 'role';
    message = 'Role không tồn tại.';
  }

  // check exist user
  if (UserService.isExistUser(username)) {
    error = true;
    message: 'Username đã tồn tại.'
  }

  // if have not any error
  if (error) {
    res.json({
      success: false,
      item: item,
      message: message
    });
  } else {
    next();
  }
}