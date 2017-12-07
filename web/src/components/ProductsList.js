import React from 'react'

const ProductsList = ({ products, onClickGetProduct, onClickDeleteProduct }) => (
  <div className="mt-3">
    <h2>{ !!products && products.length>0 && products.length } Products</h2>
    <ul>
    {
      products.map( (product, index) => (
          <li key={product._id}>
            <a onClick={onClickGetProduct} name={product._id} href="#">{product.brandName} {product.name}</a> | <a href="#" name={product._id} onClick={onClickDeleteProduct}>Delete</a>
          </li>
        )
      )
    }
    </ul>
  </div>
)

export default ProductsList