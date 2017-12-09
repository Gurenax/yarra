const Product = require('./Product')
const Category = require('./Category')

Category.create([
  {
    name: 'Lightside'
  },
  {
    name: 'Darkside'
  }
])
.then(categories => {
  console.log('Created categories', categories)
})
.catch(error => {
  console.error('Error', error)
})

Product.create([
  {
    brandName: 'Saber Forge',
    name: 'Acolyte'
  },
  {
    brandName: 'Saber Forge',
    name: 'Bastion'
  },
  {
    brandName: 'Saber Forge',
    name: 'Forsaken'
  },
  {
    brandName: 'Vader\'s Vault',
    name: 'Tempest Elite'
  },
  {
    brandName: 'Vader\'s Vault',
    name: 'Ardent'
  },
  {
    brandName: 'Vader\'s Vault',
    name: 'Brawler'
  }
])
  .then(products => {
    console.log('Created products', products)
  })
  .catch(error => {
    console.error('Error', error)
  })