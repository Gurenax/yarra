import React, { Component } from 'react';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductsList from './components/ProductsList'
import { signIn, signOutNow, signUpNow } from './api/auth'
import { listProducts } from './api/product'
import { getDecodedToken } from './api/token'
// import { setToken } from './api/init'
import './App.css';

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    showSignUpForm: false,
    products: []
  }

  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then( decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onSignUp = (data) => {
    signUpNow(data)
      .then( decodedToken => {
        console.log('signed up', decodedToken)
        this.setState( prevState => {
          return {
            decodedToken,
            showSignUpForm: false
          }
        })
      })
  }

  toggleSignUp = () => {
    console.log('Signing up..')
    // showSignUpForm()
    this.setState( prevState => {
      const signedUpShown = prevState.showSignUpForm
      return { showSignUpForm: !signedUpShown }
    })
  }

  render() {
    const { decodedToken, showSignUpForm, products } = this.state

    return (
      <div>
        <div className="jumbotron bg-primary text-light">
          <h1 className="display-3">Yarra</h1>
          <p className="lead">Now Delivering: Shipping trillions of new products</p>
        </div>
        <div className="App container-fluid">
          {
            !!decodedToken ? (
              <div>
                <p>Email: { decodedToken.email }</p>
                <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
                <p>Expired at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
                <button className='btn btn-primary' onClick={ this.onSignOut } >Sign Out</button>
              </div>
            ) : (
              !showSignUpForm && (
              <div>
                <SignInForm
                  onSignIn={ this.onSignIn }
                />
                <button className="mt-1 btn btn-primary" onClick={ this.toggleSignUp } >
                  Register
                </button>
              </div>
              )
            )
          }
          
          {
            !!showSignUpForm && (
              <div>
                <SignUpForm onSignUp={this.onSignUp} />
                <button className="mt-1 btn btn-primary" onClick={ this.toggleSignUp } >
                  Back to Sign In
                </button>
              </div>
            )
          }

          {
            !!decodedToken && !!products && (
              <ProductsList products={products} />
            )
          }
        </div>
      </div>
    );
  }

  // WHen this App first appears on screen
  componentDidMount() {
    listProducts()
      .then( products => {
        console.log('loaded products', products)
        this.setState({
          products
        })
      })
      .catch( error => {
        console.error('error loading products', error)
      })
  }
}

export default App;
