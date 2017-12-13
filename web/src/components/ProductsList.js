import React from 'react'
import { Link } from 'react-router-dom'
// import ProductForm from './ProductForm'
import ProductItem from './ProductItem'

const ProductsList = ({
  products,
  wishlist,
  onClickGetProduct,
  onClickEditProduct,
  onClickDeleteProduct,
  onClickAddToWishlist,
  onClickRemoveFromWishlist,
  currentProduct,
  categories,
  onProductSave,
  onProductFormCancel,
  onInputChange,
  onToggleCheckbox
}) => {
  const productIDInWishlist = (productID) => {
    if (!wishlist) return false
    return wishlist.products.some((product) => product._id === productID)
  }
  return (
    <div className="mt-3">
      <h2>{!!products && products.length > 0 && products.length} Products</h2>
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
          { products && (products.map((product, index) => {
            const inWishlist = productIDInWishlist(product._id)
            return (
              <ProductItem
                key={product._id}
                product={product}
                wishlist={wishlist}
                index={index}
                onClickGetProduct={onClickGetProduct}
                onClickEditProduct={onClickEditProduct}
                onClickDeleteProduct={onClickDeleteProduct}
                onClickAddToWishlist={!inWishlist ? onClickAddToWishlist : null}
                onClickRemoveFromWishlist={inWishlist ? onClickRemoveFromWishlist : null}
              />
            )
          }))
          }
        </tbody>
      </table>
      { !products && <p>Loading products…</p> }
      <Link className="btn btn-primary" to="/products/admin">
        New Product
      </Link>
    </div>
  )
}

export default ProductsList
