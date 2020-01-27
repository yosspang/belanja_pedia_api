const { userHandler } = require('./handlers/users')
const { productHandler } = require('./handlers/product')
const { cartHandler } = require('./handlers/cart')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.response('Root path of Belanja Pedia API').code(200)
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
  },
  {
    method: 'POST',
    path: '/api/login',
    handler: userHandler.loginUser
  },
  {
    method: 'GET',
    path: '/api/products',
    handler: productHandler.getProducts
  },
  {
    method: 'GET',
    path: '/api/products/image/{url}',
    handler: productHandler.getImage
  },
  {
    method: 'POST',
    path: '/api/cart',
    handler: cartHandler.addProductToCart
  },
  {
    method: 'GET',
    path: '/api/cart/{email}',
    handler: cartHandler.getCart
  },
  {
    method: 'DELETE',
    path: '/api/cart',
    handler: cartHandler.removeProductFromCart
  }
]
