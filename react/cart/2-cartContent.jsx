import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartList from './3-cartList';
import CartHeader from './3-cartHeader';
import CartSummery from './3-CartSummery';

class CartContent extends Component {

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
  }

  render() {
    return (
      <div className="body-section">
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
    items: state.cartItems,
  }
}

export default connect(mapStateToProps)(CartContent);
