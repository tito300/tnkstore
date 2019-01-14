import React, { Component } from 'react';
import CartItem from './4-cartItem';
import propTypes from 'prop-types';

class CartList extends Component {

  static propTypes = {
    items: propTypes.array,
  }

  render() {
    const { items } = this.props;
    return (
      <div className="cart-list-cont cart-section">
        <ul className="cart-list">
          {items.length ? items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              incrementCount={this.props.incrementCount}
            />
          ))
            : <h3 style={{ color: '#fc2d2d' }}>your cart is empty!</h3>}
        </ul>
      </div>
    );
  }
}

export default CartList;
