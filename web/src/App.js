import React, { Component } from 'react';
import SignInForm from './components/SignInForm'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron bg-primary text-light">
          <h1 className="display-3">Yarra</h1>
          <p className="lead">Now Delivering: Shipping trillions of new products</p>
        </div>
        <div className="App container-fluid">
          

          <SignInForm />

        </div>
      </div>
    );
  }
}

export default App;
