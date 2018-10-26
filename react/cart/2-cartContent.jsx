import React, { Component } from 'react';
import CartList from './3-cartList';
import CartHeader from './3-cartHeader';
import CartSummery from './3-CartSummery';

class CartContent extends Component {
  state = {};

  render() {
    return (
      <div className="body-section">
        <div className="cart-container">
          <div className="cart-wrapper">
            <CartHeader items={this.props.items} />
            <CartList
              items={this.props.items}
              deleteElement={this.props.deleteElement}
              incrementCount={this.props.incrementCount}
              changeCount={this.props.changeCount}
            />
            <CartSummery items={this.props.items} />
          </div>
        </div>
      </div>
    );
  }
}

export default CartContent;
