// config to all system
module.exports = {
  url: 'mongodb://localhost:27017/petshop', // URL connect to database
  secret: 'hanhnt', // secret key to encode/decode token
  headerNameToken: 'xxx-token-access',  // header to store token
  userRoles: ['admin', 'manager', 'client'], // user roles
  defaultUserRole: 'client', // default user roles when create
  // default message error
  commonError: {
    success: false,
    message: 'Chúng tôi rất đông đúc. Vui lòng quay lại sau.'
  }
}