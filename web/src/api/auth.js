import api, { setToken } from './init'
import { getDecodedToken } from './token'

export const signIn = data => {
  return api
    .post('/auth', data)
    .then(res => {
      const token = res.data.token
      setToken(token)
      // Converts token back to a human readable JSON
      return getDecodedToken()
    })
    .catch(error => {
      if (/ 401/.test(error.message)) {
        error = new Error('The email/password combination were incorrect')
      }
      throw error
    })
}

export const signOutNow = () => {
  setToken(null)
}

export const signUpNow = data => {
  return api
    .post('/auth/register', data)
    .then(res => {
      const token = res.data.token
      setToken(token)
      // Converts token back to a human readable JSON
      return getDecodedToken()
    })
    .catch(error => {
      throw error
    })
}
