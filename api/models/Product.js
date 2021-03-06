const mongoose = require('./init')
const Category = require('./Category')
const Schema = mongoose.Schema

const productSchema = new Schema({
  brandName: { type: String, required : true }, // e.g. Holden
  name: { type: String, required : true }, // e.g. Commodore
  categories: [{ type: Schema.ObjectId, ref: 'Category', default: [] }]
})

// productSchema.pre('remove', next => {
//   console.log('PRODUCT PRE REMOVE')
//   Category.update(
//       { products : { $in : this._id } }, 
//       { $pull: { products: this._id } },
//       { multi: true })  //if reference exists in multiple documents 
//   .exec()
//   next()
// })

const Product = mongoose.model('Product', productSchema)

module.exports = Product