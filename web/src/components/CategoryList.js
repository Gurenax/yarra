import React from 'react'

const CategoryList = ({
  categories,
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
          {categories.map((category, index) => (
            <tr key={category._id}>
              <th scope="row">{index + 1}</th>
              <td>{category.name}</td>
              <td>{category.products.map(product=>product.name).join(',')}</td>
              <td>
                <button
                  className="btn btn-primary"
                  name={category._id}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  name={category._id}
                  onClick={onClickDeleteCategory}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryList