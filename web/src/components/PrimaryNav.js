import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const PrimaryNav = ({
  signedIn
}) => {
  return (
    <nav className="primary">
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link" to='/'>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/products'>
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/categories'>
            Categories
          </Link>
        </li>
        {
          signedIn ? (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to='/wishlist'>
                  Wishlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/account'>
                  Account
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to='/signin'>
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/signup'>
                  Sign Up
                </Link>
              </li>
            </Fragment>
          )
        }
      </ul>
    </nav>
  )
}

export default PrimaryNav