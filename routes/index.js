const users = require('./users')
const product = require('./product')
const cart = require('./cart')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.response('Root path of Belanja Pedia API').code(200)
    }
  }
].concat(users, product, cart)
