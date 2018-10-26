import React, { Component } from 'react';
import CartContent from './2-cartContent';
import PageHeader from '../../common/pageHeader';
import Footer from '../../common/footer'

class CartPage extends Component {
  state = {
    items: [
      {
        name: 'shirt-1',
        price: 19,
        id: 1,
        count: 1,
        img: '/imgs/christmas-1.jpg',
      },
      {
        name: 'shirt-2',
        price: 15,
        id: 2,
        count: 2,
        img: '/imgs/hunting-1.jpg',
      },
      {
        name: 'shirt-3',
        price: 10,
        id: 3,
        count: 1,
        img: '/imgs/coding-1.jpg',
      },
    ],
  };

  deleteElement = itemId => {
    const newItems = this.state.items.filter(item => item.id !== itemId);
    this.setState({ items: [...newItems] });
  };

  incrementCount = itemId => {
    const newItems = this.state.items.map(item => {
      if (item.id === itemId) {
        item.count++; // eslint-disable-line
        return item;
      }
      return item;
    });
    this.setState({ items: [...newItems] });
  };

  changeCount = event => {
    const items = [...this.state.items];
    const newState = items.map(item => {
      const newItem = { ...item };
      if (
        newItem.name ===
        event.target.options[event.target.selectedIndex].dataset.name
      ) {
        newItem.count = parseInt(event.target.value);
        return newItem;
      }
      return newItem;
    });
    this.setState({ items: newState });
  };

  render() {
    if (this.state.items.length === 0)
      return <h1>There are no items in your cart</h1>;

    return (
      <div className="body-section section">
        <PageHeader items={this.state.items} />
        <CartContent
          items={this.state.items}
          deleteElement={this.deleteElement}
          incrementCount={this.incrementCount}
          changeCount={this.changeCount}
        />
        <Footer />
      </div>
    );
  }
}

export default CartPage;
