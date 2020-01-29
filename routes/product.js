const { productHandler } = require('./handlers/product')
const Joi = require('@hapi/joi')

module.exports = [
  {
    method: 'GET',
    path: '/api/products',
    options: {
      handler: productHandler.getProducts,
      description: 'Get products list',
      notes: 'Returns list of all products',
      tags: ['api', 'product']
    }
  },
  {
    method: 'GET',
    path: '/api/products/image/{url}',
    options: {
      handler: productHandler.getImage,
      description: 'Get product image',
      notes: 'Returns product image',
      tags: ['api', 'product'],
      validate: {
        params: Joi.object({
          url: Joi.string()
            .required().description('image filename (example: indomie-goreng.jpg)')
        })
      }
    }
  }
]
