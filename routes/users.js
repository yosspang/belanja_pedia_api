const { userHandler } = require('./handlers/users')
const Joi = require('@hapi/joi')

module.exports = [
  {
    method: 'GET',
    path: '/api/user/{email}',
    options: {
      handler: userHandler.checkUser,
      description: 'Get user info',
      notes: 'Returns user information',
      tags: ['api', 'user'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Get user data succeeded',
              schema: Joi.object({
                _id: Joi.string(),
                id: Joi.number(),
                email: Joi.string(),
                password: Joi.string(),
                first_name: Joi.string(),
                last_name: Joi.string(),
                address: Joi.string()
              }).label('UserModel')
            },
            404: {
              description: 'User data not found'
            },
            400: {
              description: 'Invalid payload data format'
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
    method: 'POST',
    path: '/api/register',
    options: {
      handler: userHandler.newUser,
      description: 'Register new user',
      notes: 'Submit user registration data',
      tags: ['api', 'user'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Register new user succeeded',
              schema: Joi.object({
                message: Joi.string(),
                data: Joi.object()
              })
            },
            400: {
              description: 'Email already taken'
            }
          }
        }
      },
      validate: {
        payload: Joi.object({
          email: Joi.string().email()
            .required(),
          password: Joi.string().required(),
          first_name: Joi.string().min(5).required(),
          last_name: Joi.string().min(5).required(),
          address: Joi.string().required()
        }).label('RegisterModel')
      }
    }
  },
  {
    method: 'POST',
    path: '/api/login',
    options: {
      handler: userHandler.loginUser,
      description: 'User login',
      notes: 'Submit user login credentials',
      tags: ['api', 'user'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Login success',
              schema: Joi.object({
                message: Joi.string()
              })
            },
            400: {
              description: 'Invalid payload data format'
            },
            401: {
              description: 'Incorrect password'
            },
            404: {
              description: 'Email is not registered in the system'
            }
          }
        }
      },
      validate: {
        payload: Joi.object({
          email: Joi.string().email()
            .required(),
          password: Joi.string().required()
        }).label('LoginModel')
      }
    }
  }
]
