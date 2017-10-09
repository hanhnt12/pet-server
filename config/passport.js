var passport = require('passport');
var User = require('../models/UserModel');
var LocalStrategy = require('passport-local').Strategy;
// var passportJWT = require("passport-jwt");
// var ExtractJwt = passportJWT.ExtractJwt;
// var Strategy = passportJWT.Strategy;
// var config = require('./config');

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local.register', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
}, function (req, username, password, done) {

  // asynchronous
  // User.findOne wont fire unless data is sent back
  // process.nextTick(function () {

  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  User.findOne({ 'username': username }, function (err, user) {
    // if there are any errors, return the error
    if (err) {
      return done(err);
    }

    // check to see if theres already a user with that email
    if (user) {
      return done(null, false, { message: 'username đã tồn tại.' });
    }

    // if there is no user with that email
    // create the user
    var newUser = new User();

    // set the user's local credentials
    newUser.username = username;
    newUser.password = newUser.generateHash(password);

    // save the user
    newUser.save(function (err) {
      if (err) {
        // throw err;
        return done(err);
      }
      return done(null, newUser);
    });

  });

  // });

}));

passport.use('local.login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
}, function (req, username, password, done) {

  User.findOne({ 'username': username }, function (err, user) {
    // if there are any errors, return the error
    if (err) {
      return done(err);
    }

    // check to see if has not user or password invalid
    if (!user || !user.isValidPassword(password)) {
      return done(null, false, { message: 'username hoặc password không đúng.' });
    }

    // normal
    done(null, user);
  });

  // });

}));

/**
 * passport strategy for api
 */
// var params = {
//   secretOrKey: config.token.secret,
//   jwtFromRequest: ExtractJwt.fromAuthHeader()
// };

// var strategy = new Strategy(params, function (payload, done) {
//   var user = User[payload.id] || null;
//   if (user) {
//     return done(null, {
//       id: user.id
//     });
//   } else {
//     return done(new Error("User not found"), null);
//   }
// });

// passport.use('api.login', strategy);