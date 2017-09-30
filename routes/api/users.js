var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config/config'); // config all system

// middleware to protected url /api/user
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.header[config.headerNameToken];

  // decode token
  if (token) {
    // verify token
    jwt.verify(token, config.secret, function(err, decode) {
      if (err) {
        res.json({
          success: false,
          message: 'Fail to authenticate token.'
        });
      } else {
        // save to request
        req.decoded = decoded;
      }
    });
  } else {
    // have not token
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

/* route to authenticate */
router.post('/authenticate', function(req, res, next) {

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
  User.findOne(query, projection, function(err, user) {
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
        let token = jwt.sign({user: user}, config.secret, {
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
});



module.exports = router;
