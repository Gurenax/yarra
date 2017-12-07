import React from 'react'

const ProductsList = ({ products }) => (
  <div className="mt-3">
    { products.length>0 && products.length } Products
    <ul>
    {
      products.map( (product, index) => {
        return (
          <li key={`product-${index}`}>
            {product.brandName} {product.name}
          </li>
        )
      })
    }
    </ul>
  </div>
)

export default ProductsList