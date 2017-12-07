import decodeJWT from 'jwt-decode'

const key = 'userToken'

export const rememberToken = (token) => {
  if (token) localStorage.setItem(key, token) // Remember the token
  else localStorage.removeItem(key) // Clear the remembered token
}

export const getValidToken = () => {
  const token = localStorage.getItem(key)
  try {
    const decodedToken = decodeJWT(token)
    const now = Date.now() / 1000
    // Check if token has expired
    if (now > decodedToken.exp) {
      return null
    }
    // Valid token
    return token
  }
  catch(error) {
    // Invalid token
    return null
  }
}

export const getDecodedToken = () => {
  try {
    return decodeJWT(getValidToken())
  }
  catch (error) {
    return null
  }
  // const validToken = getValidToken()
  // if (validToken) {
  //   return decodeJWT(token)
  // }
  // else {
  //   return null
  // }
}