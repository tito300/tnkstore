import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartList from './3-cartList';
import CartHeader from './3-cartHeader';
import CartSummery from './3-CartSummery';
import propType from 'prop-types';

class CartContent extends Component {

  static propType = {
    items: propType.array,
  }

  render() {
    return (
      <div className="body-section">
        <h1 className="page-title">CART</h1>
        <div className="cart-container">
          <div className="cart-wrapper">
            <CartHeader items={this.props.items} />
            <CartList
              incrementCount={this.props.incrementCount}
              items={this.props.items}
            />
            <CartSummery items={this.props.items} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.cartItems,
  }
}

export default connect(mapStateToProps)(CartContent);
