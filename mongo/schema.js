const mongoose = require('mongoose')
const mongoUrl = 'mongodb+srv://apiAdmin:admin123@clusterbp-mrpsm.mongodb.net/belanjapedia?retryWrites=true&w=majority'

const server = async () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

mongoose.set('debug', false)

const Schema = mongoose.Schema
const userSchema = new Schema({
  id: Number,
  email: { type: String, unique: true },
  password: String,
  first_name: String,
  last_name: String,
  address: String,
  created_at: Date
})

const productSchema = new Schema({
  id: Number,
  image: String,
  name: String,
  price: Number,
  description: String,
  stock: Number
})

const cartSchema = new Schema({
  id: Number,
  email: String,
  product_id: Number,
  quantity: Number
})

const User = mongoose.model('users', userSchema)
const Product = mongoose.model('products', productSchema)
const Cart = mongoose.model('carts', cartSchema)

module.exports = { User, Product, Cart, server }
