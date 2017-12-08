const mongoose = require('./init')
const Schema = mongoose.Schema

const Product = mongoose.model('Product', {
  brandName: String, // e.g. Holden
  name: String, // e.g. Commodore
  categories: [{ type: Schema.ObjectId, ref: 'Category', default: [] }]
})

module.exports = Product