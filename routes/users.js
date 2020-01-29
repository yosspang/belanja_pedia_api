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
      validate: {
        payload: Joi.object({
          email: Joi.string().email()
            .required(),
          password: Joi.string().required(),
          first_name: Joi.string().min(5).required(),
          last_name: Joi.string().min(5).required(),
          address: Joi.string().required()
        })
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
      validate: {
        payload: Joi.object({
          email: Joi.string().email()
            .required(),
          password: Joi.string().required()
        })
      }
    }
  }
]
