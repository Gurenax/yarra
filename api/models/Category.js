const mongoose = require('./init')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: { type: String, unique: true, required : true }, // e.g. Cars
  products: [{ type: Schema.ObjectId, ref: 'Product', default: [] }]
})

categorySchema.pre('remove', next => {
  Product.update(
      { categories : { $in : this._id } }, 
      { $pull: { categories: this._id } },
      { multi: true })  //if reference exists in multiple documents 
  .exec();
  next()
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category