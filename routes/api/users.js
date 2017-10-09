var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/UserController');
var UserService = require('../../services/UserService');
var jwt = require('jsonwebtoken');
// var config = require('../../config/config'); // config all system

// middleware to protected url /api/user
// router.use(function(req, res, next) {
//   var token = req.body.token || req.query.token || req.header[config.headerNameToken];

//   // decode token
//   if (token) {
//     // verify token
//     jwt.verify(token, config.secret, function(err, decode) {
//       if (err) {
//         res.json({
//           success: false,
//           message: 'Fail to authenticate token.'
//         });
//       } else {
//         // save to request
//         req.decoded = decoded;
//       }
//     });
//   } else {
//     // have not token
//     res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//   }
// });

/**
 *  route to authenticate
 */
router.post('/authenticate', UserController.authenticateValidate, UserService.authenticate);

/**
 * route to register
 */ 
router.post('/register', UserController.validateRegister, UserService.register);

/**
 * get master user roles
 */
router.get('/roles', UserService.getUserRoles);

module.exports = router;
