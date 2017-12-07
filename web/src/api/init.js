import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export const setToken = (token) => {
  // Set the authorization for all requests in the future
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api