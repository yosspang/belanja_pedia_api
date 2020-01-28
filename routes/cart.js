const { cartHandler } = require('./handlers/cart')

module.exports = [
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
  },
  {
    method: 'PUT',
    path: '/api/cart',
    handler: cartHandler.updateQuantity
  }
]
