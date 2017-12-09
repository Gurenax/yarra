const mongoose = require('./init')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: { type: String, unique: true }, // e.g. Cars
  products: [{ type: Schema.ObjectId, ref: 'Product', default: [] }]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category