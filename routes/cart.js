const { cartHandler } = require('./handlers/cart')
const Joi = require('@hapi/joi')

module.exports = [
  {
    method: 'POST',
    path: '/api/cart',
    options: {
      handler: cartHandler.addProductToCart,
      description: 'Add product to cart',
      notes: 'Submit email and product id to Cart',
      tags: ['api', 'cart'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Add product to cart succeeded',
              schema: Joi.object({
                message: Joi.string(),
                data: Joi.object()
              })
            }
          }
        }
      },
      validate: {
        payload: Joi.object({
          email: Joi.string().email()
            .required(),
          product_id: Joi.number().min(1).required()
        }).label('CartModel')
      }
    }
  },
  {
    method: 'GET',
    path: '/api/cart/{email}',
    options: {
      handler: cartHandler.getCart,
      description: 'Get cart data of one user',
      notes: 'Returns cart information of one user',
      tags: ['api', 'cart'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Get cart data succeeded',
              schema: Joi.object([])
            },
            404: {
              description: 'User data not found'
            }
          }
        }
      },
      validate: {
        params: Joi.object({
          email: Joi.string().email()
            .required().description('the email address of specific user')
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/cart',
    options: {
      handler: cartHandler.removeProductFromCart,
      description: 'Remove product from cart',
      notes: 'Remove from Cart by email and product id',
      tags: ['api', 'cart'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Delete cart data succeeded',
              schema: Joi.object({
                message: Joi.string(),
                data: Joi.object()
              })
            },
            404: {
              description: 'Cart data not found'
            }
          }
        }
      },
      validate: {
        payload: Joi.object({
          email: Joi.string().email()
            .required(),
          product_id: Joi.number().min(1).required()
        }).label('DeleteCartModel')
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/cart',
    handler: cartHandler.updateQuantity
  }
]
