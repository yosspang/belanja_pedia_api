const { Cart } = require('../../mongo/schema')
const Boom = require('@hapi/boom')

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
      return h.response({ message: 'Success add to cart', data: cartData }).code(200)
    }
    const updateData = await Cart.findOneAndUpdate({ email: request.payload.email, product_id: request.payload.product_id }, { $inc: { quantity: 1 } }, { new: true })
    return h.response({ message: 'Success add to cart', data: updateData }).code(200)
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
      return Boom.notFound()
    }
    const deletedData = await Cart.findOneAndRemove({ email: request.payload.email, product_id: request.payload.product_id })
    return h.response({ message: 'Delete cart item success', data: deletedData }).code(200)
  },
  updateQuantity: async (request, h) => {
    const id = parseInt(request.payload.product_id)
    const counter = request.payload.counter
    console.log('id di handler', id)
    console.log('counter di handler', counter)
    if (counter === 'plus') {
      const inc = await Cart.findOneAndUpdate({ product_id: id }, { $inc: { quantity: 1 } }, { new: true })
      const result = inc.quantity
      return h.response(result).code(200)
    } else if (counter === 'minus') {
      const dec = await Cart.findOneAndUpdate({ product_id: id }, { $inc: { quantity: -1 } }, { new: true })
      const result = dec.quantity
      return h.response(result).code(200)
    }
  }
}

module.exports = { cartHandler }
