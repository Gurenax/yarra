import React from 'react'

const ProductCreate = ({ onProductAdd }) => (
  <div className="mt-3">
    <h2>Create Product</h2>
    <form onSubmit={event => {
        // Prevent old-school form submission
        event.preventDefault() // Turn off the 90s
        // console.log('form submitted', event.target)
        const form = event.target
        const elements = form.elements // Allows looking up fields using their 'name' attributes
        // Get entered values from fields
        const brandName = elements.brandName.value
        const name = elements.name.value
        // console.log({ email, password })
        // Pass this information along to the parent component
        onProductAdd({ brandName, name })
      }}
    >
      <label className="mb-2">
        {'Brand Name: '}
        <input type="text" name="brandName" />
      </label>
      <label className="mb-2">
        {'Name: '}
        <input type="text" name="name" />
      </label>
      <button className='btn btn-primary'>
        Add Product
      </button>
    </form>
  </div>
)

export default ProductCreate