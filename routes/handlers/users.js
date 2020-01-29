const { User } = require('../../mongo/schema')
const Boom = require('@hapi/boom')
const getEmail = (email) => {
  return User.findOne({ email: email })
}

const userHandler = {
  checkUser: async (request, h) => {
    const userData = await getEmail(request.params.email)
    if (userData === null) {
      return Boom.notFound()
    }
    return h.response(userData).code(200)
  },
  newUser: async (request, h) => {
    const userData = await getEmail(request.payload.email)
    if (userData !== null) {
      return Boom.badRequest('Email already taken')
    }
    const id = Math.floor(Math.random() * (10 ** 16))
    const currTime = Date.now()
    Object.assign(request.payload, { id: id, created_at: currTime })
    const newUser = new User(request.payload)
    await newUser.save()
    return h.response({ message: 'Registration success', data: newUser }).code(200)
  },
  loginUser: async (request, h) => {
    const userData = await getEmail(request.payload.email)
    if (userData === null) {
      return Boom.notFound('Email is not registered')
    }
    if (userData.password !== request.payload.password) {
      return Boom.unauthorized('Invalid password')
    }
    return h.response({ message: 'Login success' }).code(200)
  }
}

module.exports = { userHandler }
