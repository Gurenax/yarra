import api, { setToken } from './init'
import { getDecodedToken } from './token'

export const signIn = ({ email, password }) => {
  return api.post('/auth', { email, password })
    .then( res => {
      const token = res.data.token
      setToken(token)
      // Converts token back to a human readable JSON
      return getDecodedToken()
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