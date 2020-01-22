const { Users } = require('./mongo/schema')

const getEmail = (email) => {
  return Users.findOne({ email: email })
}

const userHandler = {
  getUser: async (request, h) => {
    try {
      const userData = await getEmail(request.params.email)
      if (userData !== null) {
        return h.response(userData).code(200)
      } else {
        return h.response({ message: 'not found' }).code(404)
      }
    } catch (err) {
      return h.response({ message: 'failed' }).code(400)
    }
  }
}

module.exports = { userHandler }
