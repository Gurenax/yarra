const Product = require('./Product')
const Category = require('./Category')

// Category.create([
//   {
//     name: 'Lightside',
//     products: []
//   },
//   {
//     name: 'Darkside',
//     products: []
//   }
// ])
// .then(categories => {
//   console.log('Created categories', categories)
// })
// .catch(error => {
//   console.error('Error', error)
// })

Product.create([
  {
    brandName: 'Saber Forge',
    name: 'Acolyte',
    categories: ['5a2a2a0bfebf7bb6407c2392']
  },
  {
    brandName: 'Saber Forge',
    name: 'Bastion',
    categories: ['5a2a2a0bfebf7bb6407c2392']
  },
  {
    brandName: 'Saber Forge',
    name: 'Forsaken',
    categories: ['5a2a2a0bfebf7bb6407c2392']
  },
  {
    brandName: 'Vader\'s Vault',
    name: 'Tempest Elite',
    categories: []
  },
  {
    brandName: 'Vader\'s Vault',
    name: 'Ardent',
    categories: []
  },
  {
    brandName: 'Vader\'s Vault',
    name: 'Brawler',
    categories: []
  }
])
  .then(products => {
    console.log('Created products', products)
  })
  .catch(error => {
    console.error('Error', error)
  })