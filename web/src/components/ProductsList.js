import React from 'react'

const ProductsList = ({
  products,
  onClickGetProduct,
  onClickDeleteProduct,
  onClickAddToWishlist
}) => (
  <div className="mt-3">
    <h2>{!!products && products.length > 0 && products.length} Products</h2>
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Brand Name</th>
          <th scope="col">Name</th>
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
              <button
                className="btn btn-primary"
                onClick={onClickGetProduct}
                name={product._id}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary"
                name={product._id}
                onClick={onClickDeleteProduct}
              >
                Delete
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary"
                name={product._id}
                onClick={onClickAddToWishlist}
              >
                Add to Wishlist
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default ProductsList
