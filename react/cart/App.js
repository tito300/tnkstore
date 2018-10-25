import React, { Component } from 'react';
import CartPage from './components/1-cartPage';
// import '../../public/styles/scss/main.scss'

class App extends Component { // eslint-disable-line
  render() {
    return (
      <div className="App">
        <CartPage />
      </div>
    );
  }
}

export default App;
