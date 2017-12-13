import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductsList from './components/ProductsList'
import ProductForm from './components/ProductForm'
import CategoryForm from './components/CategoryForm'
import CategoryList from './components/CategoryList'
import Wishlist from './components/Wishlist'
import PrimaryNav from './components/PrimaryNav'
import Error from './components/Error'
import { signIn, signOutNow, signUpNow } from './api/auth'
import {
  listProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct
} from './api/product'
import {
  listWishlistProducts,
  addProductToWishlist,
  deleteProductFromWishlist
} from './api/wishlist'
import {
  listCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  addProductToCategory,
  removeProductFromCategory
} from './api/category'
import { getDecodedToken } from './api/token'
// import { setToken } from './api/init'
import './App.css'

const removeItemIDFromArray = (id, array) => {
  const index = array.map(val => val._id).indexOf(id)
  console.log('removing index', index)
  return array.splice(index, 1)
}

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    // showSignUpForm: false,
    products: null,
    categories: null,
    wishlist: null,
    currentProduct: {
      id: '',
      brandName: '',
      name: '',
      categories: []
    },
    error: null
  }

  onSignIn = data => {
    console.log('App received', data)
    console.log('Sign In', data.email, data.password)
    // if (data.email === '' || data.password === '') {
    //   this.setState({
    //     errors: {
    //       signInError: 'Invalid username/password'
    //     }
    //   })
    //   return
    // }

    signIn(data)
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({
          decodedToken,
          error: null
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null, error: null })
  }

  onSignUp = data => {
    signUpNow(data)
      .then(decodedToken => {
        console.log('signed up', decodedToken)
        this.setState(prevState => {
          return {
            decodedToken //,
            // showSignUpForm: false
          }
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  resetProductForm = event => {
    this.setState({
      currentProduct: {
        id: '',
        brandName: '',
        name: '',
        categories: []
      },
      error: null
    })
  }

  onProductSave = data => {
    console.log('Saving product..', data)
    data = { ...data, categories: this.state.currentProduct.categories }
    if (data.id) {
      console.log('Updating product..', data)
      updateProduct(data)
        .then(product => {
          console.log('Product updated', product)
          product.categories.map(category => {
            console.log('Updating category', category)
            addProductToCategory(category, product._id)
              .then(updatedCategory => {
                console.log('Updated category', updatedCategory)
              })
              .catch(error => {
                console.error(error)
              })
            return null
          })

          this.setState(prevState => {
            const prevProducts = prevState.products
            const products = prevProducts.map(item => {
              // If product being edited is found
              if (item._id === product._id) {
                const copy = {
                  ...item,
                  name: product.name,
                  brandName: product.brandName,
                  categories: product.categories
                }
                return copy
              } else {
                return item
              }
            })
            return {
              products,
              error: null
            }
          })
          // this.loadProductsList()
        })
        .then(() => {
          // Reload categories list
          this.loadCategoriesList()
        })
        .catch(error => {
          this.setState({ error })
        })
    } else {
      console.log('Adding new product..', data)
      addProduct(data)
        .then(product => {
          console.log('Product added', product)
          product.categories.map(category => {
            console.log('Updating category', category)
            addProductToCategory(category, product._id)
              .then(updatedCategory => {
                console.log('Updated category', updatedCategory)
              })
              .catch(error => {
                console.error(error)
              })
            return null
          })

          this.setState(prevState => {
            const products = prevState.products.concat(product)
            return {
              products,
              currentProduct: {
                id: '',
                brandName: '',
                name: '',
                categories: []
              },
              error: null
            }
          })
          // this.loadProductsList()
        })
        .then(() => {
          // Reload categories list
          this.loadCategoriesList()
        })
        .catch(error => {
          this.setState({ error })
        })
    }
  }

  // Reload category list
  loadCategoriesList = () => {
    listCategories()
      .then(categories => {
        console.log('loaded categories', categories)
        this.setState({
          categories
        })
      })
      .catch(error => {
        console.error('error loading categories', error)
      })
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
            name: '',
            categories: []
          },
          error: null
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onProductGet = productId => {
    // console.log('Getting product...', productId)
    getProduct(productId)
      .then(currentProduct => {
        // console.log('Found product', currentProduct)
        this.setState({
          currentProduct
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onProductEdit = productId => {
    getProduct(productId)
      .then(currentProduct => {
        this.setState({
          currentProduct
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onProductDelete = productId => {
    console.log('Deleting product...', productId)
    deleteProduct(productId)
      .then(currentProduct => {
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
              name: '',
              categories: []
            },
            error: null
          }
        })
        // this.loadProductsList()
      })
      .then(() => {
        this.loadCategoriesList()
      })
      .catch(error => {
        this.setState({ error })
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

  onAddToWishlist = productID => {
    console.log('Adding to wishlist', productID)
    addProductToWishlist(productID)
      .then(newWishlist => {
        console.log('Product added to wishlist', newWishlist)
        this.setState(prevState => {
          const wishlist = Object.assign({}, newWishlist)
          return {
            wishlist
          }
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onRemoveFromWishlist = event => {
    event.preventDefault()
    const productID = event.target.name
    console.log('Deleting form wishlist', productID)
    deleteProductFromWishlist(productID).then(newWishlist => {
      console.log('Product deleted from wishlist', newWishlist)
      this.setState({
        wishlist: newWishlist
      })
    })
  }

  onCategorySave = data => {
    addCategory(data)
      .then(category => {
        console.log('Category added', category)
        this.setState(prevState => {
          const categories = prevState.categories.concat(category)
          return {
            categories
          }
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onCategoryDelete = categoryID => {
    deleteCategory(categoryID)
      .then(category => {
        console.log('Category deleted', category)
        this.setState(prevState => {
          const categories = prevState.categories.filter(item => {
            return item._id !== category._id
          })
          return {
            categories
          }
        })
      })
      .then(() => {
        this.loadProductsList()
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onToggleCheckbox = event => {
    const categoryId = event.target.name
    getCategory(categoryId).then(category => {
      this.setState(prevState => {
        const currentProduct = prevState.currentProduct
        let categories = currentProduct.categories
        const categoryIDs = categories.map(val => val._id)
        if (categoryIDs.indexOf(categoryId) > -1) {
          // Update UI
          categories = removeItemIDFromArray(category._id, categories)

          // Update API
          removeProductFromCategory(category, currentProduct._id).then(
            result => {
              console.log('Removed product from category', result)
            }
          )
        } else {
          categories.push(category)
        }
        return {
          currentProduct
        }
      })
    })
  }

  onCategoryNameChanged = event => {
    const index = event.target.name
    const value = event.target.value

    this.setState(prevState => {
      const categories = prevState.categories
      categories[index].name = value
      return {
        categories
      }
    })
  }

  toggleUpdateButton = event => {
    const index = event.target.name
    console.log(index)
  }

  onCategoryUpdate = categoryID => {
    const { categories } = this.state
    const category = categories.filter(c => c._id === categoryID)[0]
    updateCategory(category)
      .then(result => {
        console.log('Updated category', result)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const {
      decodedToken,
      // products,
      // categories,
      // wishlist,
      currentProduct,
      error
    } = this.state
    const signedIn = !!decodedToken

    const requireAuth = render => props =>
      !signedIn ? <Redirect to="/signin" /> : render(props)
    /* Equivalent to */
    // function requireAuth(render) {
    //   return function renderThatChecksSignedIn({ match }) {
    //     return (
    //       signedIn ? (
    //         render()
    //       ) : (
    //         <Redirect to='/signin' />
    //       )
    //     )
    //   }
    // }

    const renderAlreadySignedIn = render => props =>
      !!signedIn ? <Redirect to="/products" /> : render(props)

    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            render={() => (
              <Fragment>
                <div className="jumbotron bg-primary text-light">
                  <h1 className="display-3">Yarra</h1>
                  <p className="lead">
                    Now Delivering: Shipping trillions of new products
                  </p>
                </div>
              </Fragment>
            )}
          />

          <div className="App-content container-fluid">
            <Route
              path="/"
              render={() => (
                <Fragment>
                  <PrimaryNav signedIn={signedIn} />
                  {!!error && <Error error={error} />}
                </Fragment>
              )}
            />

            <Switch>
              <Route
                path="/signin"
                exact
                render={renderAlreadySignedIn(() => (
                  <Fragment>
                    <div className="mt-3">
                      <h2>Sign In</h2>
                      <SignInForm
                        onSignIn={this.onSignIn}
                        // onRegister={this.toggleSignUp}
                      />
                    </div>
                  </Fragment>
                ))}
              />

              <Route
                path="/signup"
                exact
                render={renderAlreadySignedIn(() => (
                  <Fragment>
                    <div className="mt-3">
                      <h2>Sign Up</h2>
                      <SignUpForm
                        onSignUp={this.onSignUp}
                        // onBackToSignIn={this.toggleSignUp}
                      />
                    </div>
                  </Fragment>
                ))}
              />

              <Route
                path="/account"
                exact
                render={requireAuth(() => (
                  <Fragment>
                    {signedIn && (
                      <div className="alert alert-success mt-3" role="alert">
                        <h4 className="alert-heading">
                          Signed in as: {decodedToken.email}
                        </h4>
                        <hr />
                        <p>
                          Signed in at:{' '}
                          {new Date(decodedToken.iat * 1000).toISOString()}
                        </p>
                        <p className="mb-0">
                          Expired at:{' '}
                          {new Date(decodedToken.exp * 1000).toISOString()}
                        </p>
                        <hr />
                        <button
                          className="btn btn-success"
                          onClick={this.onSignOut}
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </Fragment>
                ))}
              />

              <Route
                path="/products"
                exact
                render={() => (
                  <Fragment>
                    {/* {!!products ? ( */}
                      <ProductsList
                        products={ this.dataForSection('products') }
                        wishlist={ this.dataForSection('wishlist') }
                        categories={ this.dataForSection('categories') }
                        onClickGetProduct={signedIn && this.onProductGet}
                        onClickEditProduct={signedIn && this.onProductEdit}
                        onClickDeleteProduct={signedIn && this.onProductDelete}
                        onClickAddToWishlist={signedIn && this.onAddToWishlist}
                        onClickRemoveFromWishlist={signedIn && this.onRemoveFromWishlist}
                        onProductSave={this.onProductSave}
                        onProductFormCancel={this.resetProductForm}
                        currentProduct={currentProduct}
                        onInputChange={this.onInputChange}
                        onToggleCheckbox={this.onToggleCheckbox}
                      />
                    {/* ) : (
                      !error && <span>Loading...</span>
                    )} */}
                  </Fragment>
                )}
              />

              <Route
                path="/products/admin"
                exact
                render={requireAuth(() => (
                  <Fragment>
                    {signedIn && (
                      <ProductForm
                        categories={ this.dataForSection('categories') }
                        onProductSave={this.onProductSave}
                        onProductFormCancel={this.resetProductForm}
                        currentProduct={currentProduct}
                        onInputChange={this.onInputChange}
                        onToggleCheckbox={this.onToggleCheckbox}
                      />
                    )}
                  </Fragment>
                ))}
              />

              <Route
                path="/wishlist"
                exact
                render={requireAuth(() => (
                  <Fragment>
                    {signedIn &&
                      <Wishlist
                        wishlist={ this.dataForSection('wishlist') }
                        onClickGetProduct={this.onProductGet}
                        onClickEditProduct={this.onProductEdit}
                        onClickDeleteProduct={this.onProductDelete}
                        onClickRemoveFromWishlist={this.onRemoveFromWishlist}
                      />
                    }
                  </Fragment>
                ))}
              />

              <Route
                path="/categories"
                exact
                render={requireAuth(() => (
                  <Fragment>
                    {signedIn &&
                      <CategoryList
                        categories={ this.dataForSection('categories') }
                        onChangeCategoryName={this.onCategoryNameChanged}
                        onClickUpdateCategory={this.onCategoryUpdate}
                        onClickDeleteCategory={this.onCategoryDelete}
                      />
                    }
                    {signedIn && (
                      <CategoryForm
                        onSubmitCreateCategory={this.onCategorySave}
                      />
                    )}
                  </Fragment>
                ))}
              />

              <Route
                render={({ location }) => {
                  return (
                    location.pathname !== '/' && (
                      <h2>Page not Found: {location.pathname}</h2>
                    )
                  )
                }}
              />
              
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  sections = {
    products: {
      requireAuth: false,
      load: listProducts,
    },
    wishlist: {
      requireAuth: true,
      load: listWishlistProducts,
    },
    categories: {
      requireAuth: true,
      load: listCategories,
    }
  }

  loadSection(section) {
    const { pending, requireAuth, load } = this.sections[section]
    // If already loading
    if (pending) {
      return
    }
    // If requires authentication and not signed in
    if (requireAuth && this.state.decodedToken == null) {
      return
    }
    // If already loaded
    if (this.state[section]) {
      return
    }
    this.sections[section].pending = true
    
    load()
      .then((data) => {
        this.setState({
          [section]: data
        })
      })
      .catch((error) => {
        this.setState({
          error
        })
      })
  }

  dataForSection(section) {
    this.loadSection(section)
    return this.state[section]
  }

  loadWishlist = () => {
    console.log('Loading wishlist...')
    listWishlistProducts()
      .then(wishlist => {
        console.log('loaded wishlist', wishlist)
        this.setState({
          wishlist: wishlist
        })
      })
      .catch(error => {
        console.error('error loading wishlist', error)
      })
  }


  // // WHen this App first appears on screen
  // componentDidMount() {
  //   this.loadProductsList()

  //   const { decodedToken } = this.state
  //   if (decodedToken) {
  //     this.loadCategoriesList()
  //     this.loadWishlist()
  //   }
  // }

  // // When the state changes
  // componentDidUpdate(prevProps, prevState) {
  //   // If the user token changes
  //   if (this.state.decodedToken !== prevState.decodedToken) {
  //     this.loadProductsList()
  //     this.loadCategoriesList()
  //     this.loadWishlist()
  //   }
  // }
}

export default App
