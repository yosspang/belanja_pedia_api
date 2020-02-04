const { Product } = require('../../mongo/schema')
const Boom = require('@hapi/boom')

const productHandler = {
  getProducts: async (request, h) => {
    const productsList = await Product.find().lean()
    return h.response(productsList).code(200)
  },
  getImage: async (request, h) => {
    if (await Product.findOne({ image: request.params.url }) == null) {
      return Boom.notFound('Image not found')
    }
    return h.file(`${request.params.url}`).code(200)
  },
  filterProduct: async (request, h) => {
    const filterProduct = await Product.find({categories: request.params.categories})
    return h.response(filterProduct).code(200)
  }
}

module.exports = { productHandler }
