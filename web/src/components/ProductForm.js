import React from 'react'
import { Link } from 'react-router-dom'

const ProductForm = ({
  currentProduct,
  categories,
  onProductSave,
  onProductFormCancel,
  onInputChange,
  onToggleCheckbox
}) => {
  return (
    <div className="mt-3">
      <h2>Product Form</h2>
      <form
        onSubmit={event => {
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
        <input
          type="hidden"
          name="id"
          value={currentProduct._id || ''}
          onChange={onInputChange}
        />
        <label className="mb-2">
          {'Brand Name: '}
          <input
            type="text"
            name="brandName"
            value={currentProduct.brandName || ''}
            onChange={onInputChange}
          />
        </label>
        <label className="mb-2">
          {'Name: '}
          <input
            type="text"
            name="name"
            value={currentProduct.name || ''}
            onChange={onInputChange}
          />
        </label>

        {/* <label className="mb-2">
          {'Categories: '}
          <input
            type="text"
            name="categories"
            value={
              (!!currentProduct.categories && currentProduct.categories.reduce( (categories, category, index) => {
                categories += index<currentProduct.categories.length-1 ? category.name + ',' : category.name
                return categories
              }, '' )) || ''}
            onChange={onInputChange}
          />
        </label> */}
        <div className="mb-2">
          {'Categories: '}
          {!!categories && categories.map( (category, index) => (
            <div className="form-check mt-2" key={category._id}>
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" name={category._id} checked={ !!currentProduct.categories && currentProduct.categories.map(val=>val._id).indexOf(category._id)!==-1 ? true : false } onChange={onToggleCheckbox}/>
                {category.name}
              </label>
            </div>
          ))}
        </div>

        <button className="btn btn-primary mr-1">Save</button>
        <Link to='/products' onClick={onProductFormCancel} className="btn btn-primary">
          Cancel
        </Link>
      </form>
    </div>
  )
}

export default ProductForm
