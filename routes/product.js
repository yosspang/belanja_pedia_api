const { productHandler } = require('./handlers/product')

module.exports = [
  {
    method: 'GET',
    path: '/api/products',
    handler: productHandler.getProducts
  },
  {
    method: 'GET',
    path: '/api/products/image/{url}',
    handler: productHandler.getImage
  }
]
