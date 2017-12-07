import React from 'react'

const SignInForm = ({ onSignIn }) => {
  return (
    <form
      onSubmit={event => {
        // Prevent old-school form submission
        event.preventDefault() // Turn off the 90s
        // console.log('form submitted', event.target)
        const form = event.target
        const elements = form.elements // Allows looking up fields using their 'name' attributes
        // Get entered values from fields
        const email = elements.email.value
        const password = elements.password.value
        // console.log({ email, password })
        // Pass this information along to the parent component
        onSignIn({ email, password })
      }}
    >
      <label className="mb-2">
        {'Email: '}
        <input type="email" name="email" />
      </label>

      <label className="mb-2">
        {'Password: '}
        <input type="password" name="password" />
      </label>

      <button className="btn btn-primary">Sign In</button>
    </form>
  )
}

export default SignInForm
