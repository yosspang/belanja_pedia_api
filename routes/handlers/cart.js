const { Cart } = require('../../mongo/schema')

const addNewCart = (request) => {
  const id = Math.floor(Math.random() * (10 ** 16))
  Object.assign(request.payload, { id: id, quantity: 1 })
  const newCart = new Cart(request.payload)
  return newCart.save()
}

const cartHandler = {
  addProductToCart: async (request, h) => {
    let cartData = await Cart.findOne({ email: request.payload.email, product_id: request.payload.product_id })
    if (cartData === null) {
      cartData = await addNewCart(request)
      return h.response({ message: 'success add to cart', data: cartData }).code(200)
    }
    const updateData = await Cart.findOneAndUpdate({ email: request.payload.email, product_id: request.payload.product_id }, { $inc: { quantity: 1 } }, { new: true })
    return h.response({ message: 'success add to cart', data: updateData }).code(200)
  },
  getCart: async (request, h) => {
    if (Cart.findOne({ email: request.params.email }) === null) {
      return h.response([]).code(200)
    }
    const cartData = await Cart.aggregate([
      { $match: { email: request.params.email } },
      {
        $lookup: {
          from: 'products',
          localField: 'product_id',
          foreignField: 'id',
          as: 'product_details'
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: ['$$ROOT', { $arrayElemAt: ['$product_details', 0] }] } }
      },

      {
        $project: {
          product_details: 0
        }
      }
    ])
    return h.response(cartData).code(200)
  },
  removeProductFromCart: async (request, h) => {
    const cartData = await Cart.findOne({ email: request.payload.email, product_id: request.payload.product_id })
    if (cartData === null) {
      return h.response({ message: 'Not Found' }).code(404)
    }
    const deletedData = await Cart.findOneAndRemove({ email: request.payload.email, product_id: request.payload.product_id })
    return h.response({ message: 'Delete cart item success', data: deletedData }).code(200)
  }
}

module.exports = { cartHandler }
