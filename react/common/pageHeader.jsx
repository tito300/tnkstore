import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class pageHeader extends Component {
  state = {};

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
                {this.props.items && this.props.items.length}
              </i>
            </Link>
          </li>

        </ul>
      </div>

    );
  }
}

export default pageHeader;
