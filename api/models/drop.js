const Product = require('./Product')
const Category = require('./Category')

Category.deleteMany()
.then( () => {
  console.log('Deleted product categories')
})

Product.deleteMany()
  .then( () => {
    console.log('Deleted products')
  })