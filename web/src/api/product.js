import api from './init'

export const listProducts = () => {
  return api.get('/products').then(res => res.data)
}
