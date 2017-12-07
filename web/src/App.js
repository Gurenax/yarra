import React, { Component } from 'react';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listProducts } from './api/product'
import { setToken } from './api/init'
import './App.css';

class App extends Component {
  state = {
    decodedToken: null
  }

  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then( decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  render() {
    const { decodedToken } = this.state

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
              </div>
            ) : (
              <SignInForm
                onSignIn={ this.onSignIn }
              />
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
      })
      .catch( error => {
        console.error('error loading products', error)
      })
  }
}

export default App;
