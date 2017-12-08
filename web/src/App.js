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
  updateProduct,
  deleteProduct
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
      signInError: null,
      productSaveError: null
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
        // this.loadProductsList() // use componentDidUpdate() instead to reload
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
      },
      errors: {
        productSaveError: null
      }
    })
  }

  onProductSave = data => {
    if (!data.brandName || !data.name) {
      this.setState({
        errors: {
          productSaveError: 'Invalid product'
        }
      })
      return
    }
    console.log('Saving product..', data)
    if (data.id) {
      updateProduct(data).then(product => {
        console.log('Product updated', product)
        this.setState(prevState => {
          const prevProducts = prevState.products
          const products = prevProducts.map(item => {
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
          return {
            products,
            currentProduct: {
              id: '',
              brandName: '',
              name: ''
            },
            errors: {
              productSaveError: null
            }
          }
        })
        // this.loadProductsList()
      })
    } else {
      addProduct(data).then(product => {
        console.log('Product added', product)
        this.setState(prevState => {
          const products = prevState.products.concat(product)
          return {
            products,
            currentProduct: {
              id: '',
              brandName: '',
              name: ''
            },
            errors: {
              productSaveError: null
            }
          }
        })
        // this.loadProductsList()
      })
    }
  }

  // Reloads product list with API data
  loadProductsList = () => {
    listProducts()
      .then(products => {
        console.log('loaded products', products)
        this.setState({
          products,
          currentProduct: {
            id: '',
            brandName: '',
            name: ''
          },
          errors: {
            productSaveError: null
          }
        })
      })
      .catch(error => {
        console.error('error loading products', error)
      })
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

  onProductDelete = event => {
    event.preventDefault()
    const productId = event.target.name
    console.log('Deleting product...', productId)
    deleteProduct(productId).then(currentProduct => {
      console.log('Deleted product', currentProduct)
      this.setState(prevState => {
        const prevProducts = prevState.products
        // Filter only products which are not deleted
        const products = prevProducts.filter(item => item._id !== productId)
        return {
          products,
          currentProduct: {
            id: '',
            brandName: '',
            name: ''
          },
          errors: {
            productSaveError: null
          }
        }
      })
      // this.loadProductsList()
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
                onClickDeleteProduct={this.onProductDelete}
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
              errorMessage={errors.productSaveError}
            />
          )}
        </div>
      </div>
    )
  }

  // WHen this App first appears on screen
  componentDidMount() {
    const { decodedToken } = this.state
    if (decodedToken) {
      this.loadProductsList()
    }
  }

  // When the state changes
  componentDidUpdate(prevProps, prevState) {
    console.log('Component Updated')
    if(this.state.decodedToken !== prevState.decodedToken) {
      this.loadProductsList()
    }
  }
}

export default App
