const mongoose = require('mongoose')
const mongoUrl = 'mongodb+srv://hapiUser:belanja%5Fpedia123@clusterbp-mrpsm.mongodb.net/belanjapedia?retryWrites=true&w=majority'
// const mongoUrl = 'mongodb://hapiUser:belanja%5Fpedia123@clusterbp-shard-00-01-mrpsm.mongodb.net:27017/belanjapedia?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.set('debug', true)

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

const Users = mongoose.model('users', userSchema)

module.exports = { Users }
