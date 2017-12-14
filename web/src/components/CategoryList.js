import React from 'react'

const CategoryList = ({
  categories,
  onChangeCategoryName,
  onClickUpdateCategory,
  onClickDeleteCategory
}) => {
  return (
    <div className="mt-3">
      <h2>Categories</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Products</th>
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {!!categories && (categories.map((category, index) => (
            <tr key={category._id}>
              <th scope="row">{index + 1}</th>
              <td><input type="text" value={category.name} name={index} onChange={onChangeCategoryName} /></td>
              <td>{category.products.map(product=>product.name).join(',')}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => onClickUpdateCategory(category._id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => onClickDeleteCategory(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )))
        }
        </tbody>
      </table>
      {!categories && <p>Loading categories...</p>}
    </div>
  )
}

export default CategoryList