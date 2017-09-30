let UserModel = require('../models/UserModel');
let passport = require('passport');
const config = require('../config/config');

// authenticate user
exports.authenticate = async function (req, res, next) {

  // get request paramter
  let username = req.body.username;
  let password = req.body.password;

  // query object
  let query = {
    username: username,
  };
  // projection
  let projection = 'username password role';

  console.log(query);

  // find user
  User.findOne(query, projection, function (err, user) {
    // handle error
    if (err) {
      next(err);
    }

    // if user is not exist then response
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not exist.'
      });
    } else {
      // create token
      console.log('get token');
      console.log(user);

      // check match password
      if (!user.isValidPassword(req.body.password)) {
        res.json({
          success: false,
          message: 'Authentication failed. password not correct.'
        });
      } else {
        let token = jwt.sign({ user: user }, config.secret, {
          expiresIn: 60 * 60 * 3 // expires in 3 hours
        });
        console.log(token);

        // return json data
        res.json({
          success: true,
          message: '',
          token: token
        });
      }
    }
  });
}

exports.register = async function (req, res) {
  try {
    // get request paramter
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    // check username exist
    const user = await UserModel.findOne({ username: username });
    console.log(user);

    // if exist username
    if (user) {
      res.json({
        success: false,
        message: 'Username đã tồn tại'
      });
    }

    // create the user
    var newUser = new UserModel();

    // set the user's local credentials
    newUser.username = username;
    newUser.password = newUser.generateHash(password);
    if (role) {
      newUser.role = role;
    }

    // save the user
    await newUser.save();

    res.json({
      success: true,
      message: ''
    });

  // Handler error
  } catch (err) {
    console.log(err);
    res.json(config.commonError);
  }
}