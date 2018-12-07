import React, { Component } from 'react';

class CartSummery extends Component {

  getTotal = items => {
    const finalTotal = items.reduce(
      (total, { price, count }) => total + price * count,
      0
    );
    return finalTotal.toFixed(2);
  };

  render() {
    return (
      <div className="totals-cont cart-section">
        <div className="total-item">
          <span>Tax: </span>
          <var className="total-item">$0.00</var>
        </div>
        <div className="total-item">
          <span>Total Price: </span>
          <var className="total-item">
            <span className="price">
              ${this.getTotal(this.props.items)}
            </span>
          </var>
        </div>

        <a href="/cart/checkout" className="checkout-btn">
          Proceed to Checkout
        </a>
      </div>
    );
  }
}

export default CartSummery;
