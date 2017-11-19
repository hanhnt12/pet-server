let DB = require('./db');

const connectionString = 'mongodb://'
  + DB.user
  + ':'
  + DB.password
  + '@'
  + DB.host
  + ':'
  + DB.port
  + '/'
  + DB.dbName;

// config to all system
module.exports = {
  url: process.env.DB_URL || connectionString,//'mongodb://localhost:27017/petshop', // URL connect to database
  token: {
    secret: '$hanh12ntZZA<>"', // secret key to encode/decode token
    expiresIn: 60 * 60 * 3 * 1000, // expires in 3 hours 
    name: 'sessionID' // session name
  },
  headerNameToken: 'xxx-token-access',  // header to store token
  HEADER_PRODUCT_PAGE_COUNT: 'xxx-total-count',  // header to store token,
  GET_LOG_DEBUG: process.env.DB_URL || true,    // get log in common js
  userRoles: ['admin', 'manager', 'client'], // user roles
  defaultUserRole: 'client' // default user roles when create
}