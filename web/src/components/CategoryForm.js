import React from 'react'

const CategoryForm = ({
  onSubmitCreateCategory
}) => {
  return (
    <div className="mt-3">
      <h2>Category Form</h2>
      <form onSubmit={ event => {
        event.preventDefault()
        const categoryName = event.target.categoryName.value
        console.log('Submit new category', categoryName)
        onSubmitCreateCategory({ name: categoryName  })
      }}>
        <label className="mb-2">
          <input type="text" name="categoryName" placeholder="Category Name" />
          <button className="btn btn-primary">Save</button>
        </label>
      </form>
    </div>
  ) 
}

export default CategoryForm