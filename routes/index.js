const { userHandler } = require('./handlers/users')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.response('Hello World!').code(200)
    }
  },
  {
    method: 'GET',
    path: '/api/user/{email}',
    handler: userHandler.checkUser
  },
  {
    method: 'POST',
    path: '/api/register',
    handler: userHandler.newUser
  }
]
