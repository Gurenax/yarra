import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({
  product,
  wishlist,
  index,
  onClickGetProduct,
  onClickEditProduct,
  onClickDeleteProduct,
  onClickAddToWishlist,
  onClickRemoveFromWishlist
}) => (
  <tr key={product._id}>
    <th scope="row">{index + 1}</th>
    <td>{product.brandName}</td>
    <td>{product.name}</td>
    <td>
      {product.categories.map((category, index) => (
        <span key={product._id + category._id}>
          {index < product.categories.length - 1
            ? category.name + ', '
            : category.name}
        </span>
      ))}
    </td>
    <td>
      {!!onClickEditProduct && (
        <Link
          to="/products/admin"
          className="btn btn-primary"
          onClick={() => onClickEditProduct(product._id)}
        >
          Edit
        </Link>
      )}
    </td>
    <td>
      {!!onClickDeleteProduct && (
        <button
          className="btn btn-primary"
          onClick={() => onClickDeleteProduct(product._id)}
        >
          Delete
        </button>
      )}
    </td>
    <td>
        {
          (!!onClickAddToWishlist && (
            <button
              className="btn btn-primary"
              onClick={() => onClickAddToWishlist(product._id)}
            >
              Add to Wishlist
            </button>
          ))
        }
        {
          (!!onClickRemoveFromWishlist && (
            <button
              className="btn btn-danger"
              name={product._id}
              onClick={onClickRemoveFromWishlist}
            >
              Remove from Wishlist
            </button>
          ))
        }
    </td>
  </tr>
)

export default ProductItem
