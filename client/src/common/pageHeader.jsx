import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import jwtDecoded from 'jwt-decode';
import axios from "axios";
import { throws } from 'assert';

class pageHeader extends Component {

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    if (jwt && jwt.length > 1) {
      this.props.login(jwt);
    }

    /* 
    * Below ensures that if a user makes a hard refresh they have access to items 
    * added to cart. 
    * */
    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.props.populateCartItems(localCartItems);
  }

  componentDidUpdate() {
    localStorage.setItem('cartItems', JSON.stringify(this.props.cartItems));
    if (localStorage.getItem('jwt')) {
      axios(`/api/users/cart/updateCart`, {
        method: 'post',
        headers: { Authorization: `bearer ${localStorage.getItem('jwt')}` },
        data: {
          items: this.props.cartItems,
        }
      })
        .then((res) => console.log('synched cart successfully'))
        .catch(err => console.log(err));
    }
  }

  render() {


    return (

      <div className="nav-bar">
        <ul className="nav-bar__ul listFix">
          <li className="nav-bar__ul__li">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-bar__ul__li">
            <Link to="#">Profile</Link>
          </li>
          <li className="nav-bar__ul__li">
            <Link to="#">Products</Link>
            <div className="sub-menu">
              <ul className="sub-menu__ul">
                <li className="sub-menu__ul__li">
                  <Link to="">T-Shirts</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Hoodies</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Sweaters</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Long Sleeves</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Hats</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Stickers</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-bar__ul__li">
            <Link to="#">Categories</Link>
            <div className="sub-menu">
              <ul className="sub-menu__ul">
                <li className="sub-menu__ul__li">
                  <Link to="/products">Top Sellers</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">New Designs</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Trending now</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Politics</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Holidays</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Pets</Link>
                </li>
              </ul>
            </div>{' '}
          </li>
          <li className="nav-bar__ul__li ">
            <Link to="#" className="contact">
              Contact us
              </Link>
          </li>
          <li className="nav-bar__ul__li ">
            <Link to="/cart/main" className="cart">
              <i className="fa fa-shopping-cart" aria-hidden="true">
                {this.props.count != false && this.props.count}
              </i>
            </Link>
          </li>

        </ul>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.cart.cartItems.length,
    cartItems: state.cart.cartItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (jwt) => {
      const payload = jwtDecoded(jwt);
      dispatch({ type: 'LOGIN', payload });
    },
    populateCartItems: (items) => {
      dispatch({ type: 'POPULATE_CARTITEMS', data: items });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(pageHeader);
