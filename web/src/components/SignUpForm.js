import React from 'react'

const SignUpForm = ({ onSignUp, onBackToSignIn }) => {
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
        const firstName = elements.firstName.value
        const lastName = elements.lastName.value
        const password = elements.password.value
        // console.log({ email, password })
        // Pass this information along to the parent component
        onSignUp({ email, firstName, lastName, password })
      }}
    >
      <label className="mb-2">
        {'Email: '}
        <input type="email" name="email" />
      </label>

      <label className="mb-2">
        {'First Name: '}
        <input type="text" name="firstName" />
      </label>

      <label className="mb-2">
        {'Last Name: '}
        <input type="text" name="lastName" />
      </label>

      <label className="mb-2">
        {'Password: '}
        <input type="password" name="password" />
      </label>

      <button className="btn btn-primary mr-1">Sign Up</button>
      <button
        className="btn btn-primary"
        onClick={onBackToSignIn}
      >
        Back to Sign In
      </button>
    </form>
  )
}

export default SignUpForm
