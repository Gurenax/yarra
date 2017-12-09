const mongoose = require('./init')
const Schema = mongoose.Schema

const Category = mongoose.model('Category', {
  name: { type: String, unique: true }, // e.g. Cars
  products: [{ type: Schema.ObjectId, ref: 'Product', default: [] }]
})

module.exports = Category