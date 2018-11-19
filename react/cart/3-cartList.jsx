import React, { Component } from 'react';
import CartItem from './4-cartItem';

class CartList extends Component {


  render() {
    return (
      <div className="cart-list-cont cart-section">
        <ul className="cart-list">
          {this.props.items.map(item => (
            <CartItem
              key={item.id}
              akey={item.id}
              item={item}
              incrementCount={this.props.incrementCount}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default CartList;
