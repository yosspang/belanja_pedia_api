const { User } = require('../../mongo/schema')

const getEmail = (email) => {
  return User.findOne({ email: email })
}

const userHandler = {
  checkUser: async (request, h) => {
    const userData = await getEmail(request.params.email)
    if (userData === null) {
      return h.response({ message: 'not found' }).code(404)
    }
    return h.response(userData).code(200)
  },
  newUser: async (request, h) => {
    const userData = await getEmail(request.payload.email)
    if (userData !== null) {
      return h.response({ message: 'username already taken' }).code(400)
    }
    const id = Math.floor(Math.random() * (10 ** 16))
    const currTime = Date.now()
    Object.assign(request.payload, { id: id, created_at: currTime })
    const newUser = new User(request.payload)
    await newUser.save()
    return h.response({ message: 'registration success', data: newUser }).code(200)
  }

}

module.exports = { userHandler }
