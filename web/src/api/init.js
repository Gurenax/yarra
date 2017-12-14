import axios from 'axios'
import { rememberToken, getValidToken } from './token'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const setToken = (token) => {
  rememberToken(token)

  if (token) {
    // Set the authorization for all requests in the future
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Validates the token, and if it's invalid, remove from local storage
// (e.g. expired, modified)
setToken(getValidToken())

export default api