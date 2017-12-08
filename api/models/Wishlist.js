const mongoose = require('./init')
const Schema = mongoose.Schema

const wishListSchema = new Schema({   // One to Many relationship
  // Belongs to user
  user: { type: Schema.ObjectId, ref: 'User', unique: true }, // One User
  // Has many products
  product: [{ type: Schema.ObjectId, ref: 'Product' }]  // Many products
})

const Wishlist = mongoose.model('Wishlist', wishListSchema)

module.exports = Wishlist
