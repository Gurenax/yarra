import React from 'react'

const ProductForm = ({ currentProduct, onProductSave, onInputChange }) => {
  return (
  <div className="mt-3">
    <h2>Product Form</h2>
    <form onSubmit={event => {
        // Prevent old-school form submission
        event.preventDefault() // Turn off the 90s
        // console.log('form submitted', event.target)
        const form = event.target
        const elements = form.elements // Allows looking up fields using their 'name' attributes
        // Get entered values from fields
        const id = elements.id.value
        const brandName = elements.brandName.value
        const name = elements.name.value
        // console.log({ email, password })
        // Pass this information along to the parent component
        onProductSave({ id, brandName, name })
      }}
    >
      <input type="hidden" name="id" value={currentProduct && currentProduct._id} onChange={onInputChange} />
      <label className="mb-2">
        {'Brand Name: '}
        <input type="text" name="brandName" value={currentProduct && currentProduct.brandName} onChange={onInputChange} />
      </label>
      <label className="mb-2">
        {'Name: '}
        <input type="text" name="name" value={currentProduct && currentProduct.name} onChange={onInputChange} />
      </label>
      <button className='btn btn-primary'>
        Save Product
      </button>
    </form>
  </div>
  )
}

export default ProductForm