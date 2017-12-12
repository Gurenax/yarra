import api from './init'

export const listWishlistProducts = () => {
  return api
    .get('/wishlist')
    .then(res => res.data)
    .catch(error => {
      throw error
    })
}

export const addProductToWishlist = productID => {
  return api
    .post(`/wishlist/products/${productID}`)
    .then(res => {
      const wishlist = res.data
      return wishlist
    })
    .catch(error => {
      throw error
    })
}

export const deleteProductFromWishlist = productID => {
  return api
    .delete(`/wishlist/products/${productID}`)
    .then(res => {
      const wishlist = res.data
      return wishlist
    })
    .catch(error => {
      throw error
    })
}
