const { Users } = require('../../mongo/schema')

const getEmail = (email) => {
  return Users.findOne({ email: email })
}

const userHandler = {
  getUser: async (request, h) => {
    const userData = await getEmail(request.params.email)
    if (userData === null) {
      return h.response({ message: 'not found' }).code(404)
    }
    return h.response(userData).code(200)
  }
}

module.exports = { userHandler }
