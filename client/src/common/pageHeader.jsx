import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import jwtDecoded from 'jwt-decode';
import axios from "axios";
import ContactUsModel from './contactus__model';

class pageHeader extends Component {
  state = {
    contact: false,
    menuOpen: false,
  }

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

  handleClick = (e) => {
    let { contact } = this.state;
    if (e.target.className.includes('contact') ||
      e.currentTarget.className.includes('contact-us-li') ||
      e.target.className.search(/^x$/) !== -1) {
      contact = !contact;
      this.setState({ contact });
    } else if (e.target.tagName === 'A' && !e.target.nextElementSibling) {
      this.setState({
        menuOpen: false,
      })
    }
  }

  handleMenuOpen = () => {
    this.setState({
      menuOpen: true,
    })
  }

  handleMenuClose = () => {
    this.setState({
      menuOpen: false,
    })
  }

  render() {
    let { contact, menuOpen } = this.state;

    return (

      <div className={`nav-bar ${menuOpen ? 'open' : ''}`} onClick={this.handleClick}>
        <i class={`fas fa-bars fa-2x ${menuOpen ? 'open' : ''}`} onClick={this.handleMenuOpen}></i>
        <i class={`fas fa-times fa-lg ${menuOpen ? 'open' : ''}`} onClick={this.handleMenuClose}></i>
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
                  <Link to="/products/category/tshirts">T-Shirts</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/sweaters">Sweaters</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="#">Hoodies <span style={{ fontSize: '8px', color: '#ec6363', letterSpacing: '1px' }}>(coming soon)</span></Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/shirts">Long Sleeve shirts</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Hats <span style={{ fontSize: '8px', color: '#ec6363', letterSpacing: '1px' }}>(coming soon)</span></Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="">Stickers <span style={{ fontSize: '8px', color: '#ec6363', letterSpacing: '1px' }}>(coming soon)</span></Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-bar__ul__li">
            <Link to="#">Categories</Link>
            <div className="sub-menu">
              <ul className="sub-menu__ul">
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/topsellers">Top Sellers</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/newdesigns">New Designs</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/trending">Trending now <span style={{ fontSize: '8px', color: '#ec6363', letterSpacing: '1px' }}>(coming soon)</span></Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/children">children</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/holidays">Holidays</Link>
                </li>
                <li className="sub-menu__ul__li">
                  <Link to="/products/category/animals">animals</Link>
                </li>
              </ul>
            </div>{' '}
          </li>
          <li className="nav-bar__ul__li contact-us-li" onClick={this.handleClick}>
            <Link to="#" /* onClick={this.handleClick} */ className="contact">
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

        <ContactUsModel show={contact ? 'true' : null} handleClick={this.handleClick} />
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
