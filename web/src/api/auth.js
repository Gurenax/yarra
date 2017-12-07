import api from './init'
import decodeJWT from 'jwt-decode'

export const signIn = ({ email, password }) => {
  return api.post('/auth', { email, password })
    .then( res => {
      const token = res.data.token
      // Converts token back to a human readable JSON
      const decodedToken = decodeJWT(token)
      return decodedToken
    })
}