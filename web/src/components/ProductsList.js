import React from 'react'
import { Link } from 'react-router-dom'
import ProductForm from './ProductForm'

const ProductsList = ({
  products,
  onClickGetProduct,
  onClickEditProduct,
  onClickDeleteProduct,
  onClickAddToWishlist,
  currentProduct,
  categories,
  onProductSave,
  onProductFormCancel,
  onInputChange,
  onToggleCheckbox
}) => (
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
        {products.map((product, index) => (
          <tr key={product._id}>
            <th scope="row">{index + 1}</th>
            <td>{product.brandName}</td>
            <td>{product.name}</td>
            <td>
              {
                product.categories.map( (category, index) => (
                  <span key={product._id+category._id}>{index<product.categories.length-1 ? category.name+', ' : category.name}</span>
                ))
              }
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => onClickEditProduct(product._id)}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => onClickDeleteProduct(product._id)}
              >
                Delete
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => onClickAddToWishlist(product._id)}
              >
                Add to Wishlist
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    { !!currentProduct._id ? (
      <ProductForm
        onProductSave={onProductSave}
        onProductFormCancel={onProductFormCancel}
        currentProduct={currentProduct}
        categories={categories}
        onInputChange={onInputChange}
        onToggleCheckbox={onToggleCheckbox}
      />
    ) : (
      <Link className="btn btn-primary" to='/products/admin'>
        New Product
      </Link>
    )}
  </div>
)

export default ProductsList
