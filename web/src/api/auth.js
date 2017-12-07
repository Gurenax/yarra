import api, { setToken } from './init'
import { getDecodedToken } from './token'

export const signIn = (data) => {
  return api.post('/auth', data)
    .then( res => {
      const token = res.data.token
      setToken(token)
      // Converts token back to a human readable JSON
      return getDecodedToken()
    })
    .catch(error => {
      console.error('error code', error.response.status)
      return {
        error: error.response.status
      }
    })
}

export const signOutNow = () => {
  setToken(null)
}

export const signUpNow = (data) => {
  return api.post('/auth/register', data)
    .then( res => {
      const token = res.data.token
      setToken(token)
      // Converts token back to a human readable JSON
      return getDecodedToken()
    })
}