import React from 'react'
import ProductItem from './ProductItem'

const Wishlist = ({
  products,
  wishlist,
  onClickGetProduct,
  onClickEditProduct,
  onClickDeleteProduct,
  onClickRemoveFromWishlist
}) => {
  const productIDInWishlist = (productID) => {
    if (!wishlist) return false
    return wishlist.products.some((product) => product._id === productID)
  }
  
  return (
    <div className="mt-3">
      <h2>Wishlist</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col" />
            <th scope="col" />
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
        {
          products.map( (product, index) => {
            const inWishlist = productIDInWishlist(product._id)
            return (
              <ProductItem
                product={product}
                wishlist={wishlist}
                index={index}
                onClickGetProduct={onClickGetProduct}
                onClickEditProduct={onClickEditProduct}
                onClickDeleteProduct={onClickDeleteProduct}
                onClickRemoveFromWishlist={ inWishlist ? onClickRemoveFromWishlist : null }
              />
          )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default Wishlist
