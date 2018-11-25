import React, { Component } from 'react';

class cartHeader extends Component {
  render() {
    return (
      <div className="cart-note cart-section">
        <p>
          There is{' '}
          <span style={{ color: 'red', fontWeight: '600' }}>
            {' '}
            {this.props.items.length}{' '}
          </span>{' '}
          products in your cart
        </p>
      </div>
    );
  }
}

export default cartHeader;
