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
      tags: ['api', 'product'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Get product list success',
              schema: Joi.object({
              })
            },
            404: {
              description: 'User data not found'
            }
          }
        }
      },
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
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Get static image succeeded'
            },
            404: {
              description: 'Image url not found'
            }
          }
        }
      },
      validate: {
        params: Joi.object({
          url: Joi.string()
            .required().description('image filename (example: indomie-goreng.jpg)')
        })
      }
    }
  }
]
