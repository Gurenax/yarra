import React from 'react'
import ProductItem from './ProductItem'

const Wishlist = ({
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
          </tr>
        </thead>
        <tbody>
        {
          !!wishlist && (wishlist.products.map( (product, index) => {
            const inWishlist = productIDInWishlist(product._id)
            return (
              <ProductItem
                key={`wishlist-${product._id}`}
                product={product}
                wishlist={wishlist}
                index={index}
                onClickGetProduct={onClickGetProduct}
                onClickEditProduct={onClickEditProduct}
                onClickDeleteProduct={onClickDeleteProduct}
                onClickRemoveFromWishlist={ inWishlist ? onClickRemoveFromWishlist : null }
              />
          )
          }))
        }
        </tbody>
      </table>
      { !wishlist && <p>Loading wishlist…</p> }
    </div>
  )
}

export default Wishlist
