let UserModel = require('../models/UserModel');
let passport = require('passport');
const config = require('../config/config');
var jwt = require('jsonwebtoken');

function generateToken(user) {
  let token = jwt.sign({ user: user }, config.token.secret, {
    expiresIn: config.token.expiresIn
  });
  console.log(token);
  return token;
}

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

  try {
    // find user
    let user = await UserModel.findOne(query, projection);
    console.log(user);

    // check user exist and password is correct
    if (!user || !user.isValidPassword(password)) {
      res.json({
        success: false,
        message: 'Authentication failed. Username hoặc password không đúng.'
      });
    } else {

      // generate token
      let token = generateToken(user);

      // return json data
      res.json({
        success: true,
        token: token,
        user: {
          username: user.username,
          role: user.role
        }
      });
    }
  } catch (error) {
    console.log(err);
    res.json(config.commonError);
  }
}

exports.register = async function (req, res) {
  try {
    // get request paramter
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

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

    // generate token
    let token = generateToken(user);

    // return json data
    res.json({
      success: true,
      token: token
    });

    // Handler error
  } catch (err) {
    console.log(err);
    res.json(config.commonError);
  }
}

// check user exist in database
exports.isExistUser = async function (req) {
  try {
    // get request paramter
    let username = req.body.username;

    // check username exist
    const user = await UserModel.findOne({ username: username });

    // if exist username
    if (user) {
      return true;
    }
    return false;

  } catch (error) {
    console.log(err);
    res.json(config.commonError);
  }
}

/**
 * Get master role for use
 */
exports.getUserRoles = async function (req, res, next) {
  try {
    res.json({
      success: true,
      roles: config.userRoles
    });
  } catch (error) {
    console.log(err);
    res.json(config.commonError);
  }
}