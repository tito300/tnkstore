import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { throws } from 'assert';

class CartItem extends Component {
  state = {
    expand: null,
  }

  componentDidMount() {
    setImmediate(() => {
      this.setState({ expand: 'expand' });
    })
  }


  handleDelete = (e) => {
    this.props.deleteItem(this.props.item.id);
  }

  createOptions = item => {
    const content = []; // will not work if it was initiated as a string because of JSX

    for (var i = 1; i <= 10; i++) {
      content.push(
        <option key={Math.random().toString()} value={i} data-name={item.name}>
          {i}
        </option>
      );
    }
    return content;
  };

  render() {
    const { item, akey, changeCount } = this.props;
    return (
      <li key={akey} className={`cart-item ${this.state.expand}`} style={{}}>
        <img
          src={item.img}
          style={{ height: "80px", width: "80px" }} // eslint-disable-line
          alt=""
        />
        <div className="cart-item-details">
          <div className="cart-main">
            <h3 className="cart-item-title">{item.name}</h3>
            <i
              onClick={this.handleDelete}
              className="fa fa-times-circle"
              aria-hidden="true"
            />
          </div>

          <div className="cart-variables">
            <div className="qty-dropdown">
              <span>Qty: </span>
              <select
                data-qty="4"
                name="Qty"
                id="12395930095"
                className="cart-item-var"
                data-item={item.name}
                value={item.count}
                onChange={changeCount}
              >
                {this.createOptions(item)}
              </select>
            </div>

            <var className="cart-item-var">
              Price: $<span className="price">{item.price}</span>
            </var>
          </div>
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => { dispatch({ type: 'DELETE_CART-ITEM', id: id }) },
    changeCount: (event) => { dispatch({ type: 'CHANGE_ITEM-COUNT', event: event }) }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(CartItem));
