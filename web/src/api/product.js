import api from './init'

export const listProducts = () => {
  return api.get('/products').then(res => res.data)
}

export const addProduct = (product) => {
  return api.post('/products', product)
    .then( res => {
      const newProduct = res.data
      return newProduct
    })
}