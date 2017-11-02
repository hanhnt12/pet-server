// config to all system
module.exports = {
  url: 'mongodb://localhost:27017/petshop', // URL connect to database
  token: {
    secret: '$hanh12ntZZA<>"', // secret key to encode/decode token
    expiresIn: 60 * 60 * 3 * 1000, // expires in 3 hours 
    name: 'sessionID' // session name
  },
  headerNameToken: 'xxx-token-access',  // header to store token
  userRoles: ['admin', 'manager', 'client'], // user roles
  defaultUserRole: 'client' // default user roles when create
}