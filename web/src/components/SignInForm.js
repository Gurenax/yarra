import React from 'react'

const SignInForm = ({}) => {
  return (
    <form>
      <label className='mb-2'>
        {'Email: '}
        <input type="email" name="email" />
      </label>

      <label className='mb-2'>
        {'Password: '}
        <input type="password" name="password" />
      </label>

      <button className='btn btn-primary'>
        Sign In
      </button>
    </form>
  )
}

export default SignInForm
