const { Products } = require('../../mongo/schema')

const productHandler = {
  getProducts: async (request, h) => {
    const productsList = await Products.find().lean()
    return h.response(productsList).code(200)
  }
}

module.exports = { productHandler }
