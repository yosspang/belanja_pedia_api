const users = require('./users')
const product = require('./product')
const cart = require('./cart')

module.exports = [
  {
    method: 'GET',
    path: '/api',
    options: {
      handler: function (request, h) {
        return h.response('Root path of Belanja Pedia API').code(200)
      },
      description: 'Belanja Pedia API root path',
      notes: 'Returns root path',
      tags: ['api', '/root'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Get root path succeeded'
            }
          }
        }
      }
    }
  }
].concat(users, product, cart)
