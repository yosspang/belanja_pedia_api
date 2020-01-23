const mongoose = require('mongoose')
const mongoUrl = 'mongodb://apiAdmin:admin123@clusterbp-shard-00-00-mrpsm.mongodb.net:27017,clusterbp-shard-00-01-mrpsm.mongodb.net:27017,clusterbp-shard-00-02-mrpsm.mongodb.net:27017/belanjapedia?ssl=true&replicaSet=ClusterBP-shard-0&authSource=admin&retryWrites=true&w=majority'

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

const Users = mongoose.model('users', userSchema)

module.exports = { Users, server }
