import api from './init'

export const listCategories = () => {
  return api.get('/categories').then(res => res.data)
}

export const getCategory = (categoryId) => {
  return api.get(`/categories/${categoryId}`).then(res => res.data)
}

export const addCategory = (category) => {
  return api.post('/categories', category)
    .then( res => {
      const newCategory = res.data
      return newCategory
    })
}

export const updateCategory = (category) => {
  return api.patch(`/categories/${category.id}`, { name: category.name})
    .then( res => {
      const newCategory = res.data
      return newCategory
    })
}

export const deleteCategory = (categoryId) => {
  return api.delete(`/categories/${categoryId}`).then(res => res.data)
}