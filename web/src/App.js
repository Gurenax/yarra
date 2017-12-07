import React, { Component } from 'react'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductsList from './components/ProductsList'
import ProductForm from './components/ProductForm'
import { signIn, signOutNow, signUpNow } from './api/auth'
import {
  listProducts,
  addProduct,
  getProduct,
  updateProduct
} from './api/product'
import { getDecodedToken } from './api/token'
// import { setToken } from './api/init'
import './App.css'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    showSignUpForm: false,
    products: null,
    currentProduct: {
      id: '',
      brandName: '',
      name: ''
    },
    errors: {
      signInError: null
    }
  }

  onSignIn = data => {
    console.log('App received', data)
    console.log('Sign In', data.email, data.password)
    if (data.email === '' || data.password === '') {
      this.setState({
        errors: {
          signInError: 'Invalid username/password'
        }
      })
      return
    }

    signIn(data).then(decodedToken => {
      if (!decodedToken.error) {
        console.log('signed in', decodedToken)
        this.setState({
          decodedToken,
          errors: {
            signInError: ''
          }
        })
        this.loadProductsList()
      } else {
        this.setState({
          errors: {
            signInError: 'Invalid username/password'
          }
        })
        return
      }
    })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onSignUp = data => {
    signUpNow(data).then(decodedToken => {
      console.log('signed up', decodedToken)
      this.setState(prevState => {
        return {
          decodedToken,
          showSignUpForm: false
        }
      })
    })
  }

  onProductNew = event => {
    console.log('New product..')
    event.preventDefault()
    this.setState({
      currentProduct: {
        id: '',
        brandName: '',
        name: ''
      }
    })
  }

  onProductSave = data => {
    console.log('Saving product..', data)
    if (data.id) {
      updateProduct(data).then(product => {
        this.setState(prevState => {
          const prevProducts = prevState.products
          const updatedProducts = prevProducts.map(item => {
            // If product being edited is found
            if (item._id === product._id) {
              const copy = {
                ...item,
                name: product.name,
                brandName: product.brandName
              }
              return copy
            } else {
              return item
            }
          })
          console.log('saved products', updatedProducts)
          return {
            products: updatedProducts,
            currentProduct: {
              id: '',
              brandName: '',
              name: ''
            }
          }
        })
        // this.loadProductsList()
      })
    } else {
      addProduct(data).then(product => {
        this.setState(prevState => {
          const newProducts = [...prevState.products, product]
          console.log('saved products', newProducts)
          return {
            products: newProducts,
            currentProduct: {
              id: '',
              brandName: '',
              name: ''
            }
          }
        })
        // this.loadProductsList()
      })
    }
  }

  onProductGet = event => {
    event.preventDefault()
    const productId = event.target.name
    console.log('Getting product...', productId)
    getProduct(productId).then(currentProduct => {
      console.log('Found product', currentProduct)
      this.setState({
        currentProduct
      })
    })
  }

  onInputChange = event => {
    const { name, value } = event.target
    switch (name) {
      case 'name':
        this.setState(prevState => {
          const oldCurrentProduct = prevState.currentProduct
          return { currentProduct: { ...oldCurrentProduct, name: value } }
        })
        break
      case 'brandName':
        this.setState(prevState => {
          const oldCurrentProduct = prevState.currentProduct
          return { currentProduct: { ...oldCurrentProduct, brandName: value } }
        })
        break
      default:
        break
    }
  }

  toggleSignUp = event => {
    console.log('Signing up..')
    event.preventDefault()
    // showSignUpForm()
    this.setState(prevState => {
      const signedUpShown = prevState.showSignUpForm
      return {
        showSignUpForm: !signedUpShown,
        errors: {
          signInError: ''
        }
      }
    })
  }

  loadProductsList = () => {
    listProducts()
      .then(products => {
        console.log('loaded products', products)
        this.setState({
          products
        })
      })
      .catch(error => {
        console.error('error loading products', error)
      })
  }

  render() {
    const {
      decodedToken,
      showSignUpForm,
      products,
      currentProduct,
      errors
    } = this.state

    return (
      <div>
        <div className="jumbotron bg-primary text-light">
          <h1 className="display-3">Yarra</h1>
          <p className="lead">
            Now Delivering: Shipping trillions of new products
          </p>
        </div>
        <div className="App container-fluid">
          {!!decodedToken ? (
            <div>
              <p>Email: {decodedToken.email}</p>
              <p>
                Signed in at: {new Date(decodedToken.iat * 1000).toISOString()}
              </p>
              <p>
                Expired at: {new Date(decodedToken.exp * 1000).toISOString()}
              </p>
              <button className="btn btn-primary" onClick={this.onSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
            !showSignUpForm && (
              <div>
                <SignInForm
                  onSignIn={this.onSignIn}
                  onRegister={this.toggleSignUp}
                  errorMessage={errors.signInError}
                />
              </div>
            )
          )}

          {!!showSignUpForm && (
            <div>
              <SignUpForm
                onSignUp={this.onSignUp}
                onBackToSignIn={this.toggleSignUp}
              />
            </div>
          )}

          {!!decodedToken &&
            (!!products ? (
              <ProductsList
                products={products}
                onClickGetProduct={this.onProductGet}
              />
            ) : (
              <span>Loading...</span>
            ))}

          {!!decodedToken && (
            <ProductForm
              onProductNew={this.onProductNew}
              onProductSave={this.onProductSave}
              currentProduct={currentProduct}
              onInputChange={this.onInputChange}
            />
          )}
        </div>
      </div>
    )
  }

  // WHen this App first appears on screen
  componentDidMount() {
    const {decodedToken} = this.state
    if(decodedToken) {
      this.loadProductsList()
    }
  }
}

export default App
