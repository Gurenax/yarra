import api from './init'

export const listProducts = () => {
  return api.get('/products').then(res => res.data)
}

export const getProduct = (productId) => {
  return api.get(`/products/${productId}`).then(res => res.data)
}

export const addProduct = (product) => {
  return api.post('/products', product)
    .then( res => {
      const newProduct = res.data
      return newProduct
    })
}

export const updateProduct = (product) => {
  return api.patch(`/products/${product.id}`, { brandName: product.brandName, name: product.name})
    .then( res => {
      const newProduct = res.data
      return newProduct
    })
}