import React from 'react'

const ProductsList = ({ products, onClickGetProduct }) => (
  <div className="mt-3">
    <h2>{ !!products && products.length>0 && products.length } Products</h2>
    <ul>
    {
      products.map( (product, index) => (
          <li key={product._id}>
            <a onClick={onClickGetProduct} name={product._id} href="#">{product.brandName} {product.name}</a>
          </li>
        )
      )
    }
    </ul>
  </div>
)

export default ProductsList