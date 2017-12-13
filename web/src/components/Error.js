import React from 'react'

const improveMessage = (message) => {
  if(/ 400/.test(message)) {
    return 'Please check the entered values'
  }
  else if(/ 401/.test(message)) {
    return 'Your credentials were incorrect of you must be signed in'
  }
  else if(/Network Error/i.test(message)) {
    return 'Cannot connect to API server'
  }
  return message
}

const Error = ({
  error
}) => {
  return (
    <div className="alert alert-danger" role="alert">
      { improveMessage(error.message) }
    </div>
  )
}

export default Error