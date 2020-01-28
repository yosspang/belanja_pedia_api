const { userHandler } = require('./handlers/users')

module.exports = [
  {
    method: 'GET',
    path: '/api/user/{email}',
    handler: userHandler.checkUser
  },
  {
    method: 'POST',
    path: '/api/register',
    handler: userHandler.newUser
  },
  {
    method: 'POST',
    path: '/api/login',
    handler: userHandler.loginUser
  }
]
