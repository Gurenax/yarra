import React from 'react'

const Wishlist = ({
  products,
  onClickRemoveFromWishlist
}) => {
  return (
    <div className="mt-3">
      <h2>Wishlist</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {
          products.map( (product, index) => {
            return (
            <tr key={product._id}>
              <th scope="row">{index+1}</th>
              <td>{product.brandName}</td>
              <td>{product.name}</td>
              <td><button className="btn btn-primary" name={product._id} onClick={onClickRemoveFromWishlist}>Remove</button></td>
            </tr>
          )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default Wishlist
