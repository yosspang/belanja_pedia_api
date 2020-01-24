const { Product } = require('../../mongo/schema')

const productHandler = {
  getProducts: async (request, h) => {
    const productsList = await Product.find().lean()
    return h.response(productsList).code(200)
  },
  getImage: async (request, h) => {
    return h.file(`${request.params.url}`).code(200)
  }
}

module.exports = { productHandler }
