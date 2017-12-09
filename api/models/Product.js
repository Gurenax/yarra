const mongoose = require('./init')
const Schema = mongoose.Schema

const productSchema = new Schema({
  brandName: String, // e.g. Holden
  name: String, // e.g. Commodore
  categories: [{ type: Schema.ObjectId, ref: 'Category', default: [] }]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product