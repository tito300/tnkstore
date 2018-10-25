import React, { Component } from 'react';

class pageHeader extends Component {
  state = {};

  render() {
    return (
      <div className="header-section section" id="0">
        <div className="nav-bar">
          <ul className="nav-bar__ul listFix">
            <li className="nav-bar__ul__li">
              <a href="/">Home</a>
            </li>
            <li className="nav-bar__ul__li">
              <a href="#">Profile</a>
            </li>
            <li className="nav-bar__ul__li">
              <a href="#">Products</a>
              <div className="sub-menu">
                <ul className="sub-menu__ul">
                  <li className="sub-menu__ul__li">
                    <a href="">T-Shirts</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Hoodies</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Sweaters</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Long Sleeves</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Hats</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Stickers</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-bar__ul__li">
              <a href="#">Categories</a>
              <div className="sub-menu">
                <ul className="sub-menu__ul">
                  <li className="sub-menu__ul__li">
                    <a href="/top-sellers">Top Sellers</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">New Designs</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Trending now</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Politics</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Holidays</a>
                  </li>
                  <li className="sub-menu__ul__li">
                    <a href="">Pets</a>
                  </li>
                </ul>
              </div>{' '}
            </li>
            <li className="nav-bar__ul__li ">
              <a href="#" className="contact">
                Contact us
              </a>
            </li>
            <li className="nav-bar__ul__li ">
              <a href="/cart/main" className="cart">
                <i className="fa fa-shopping-cart" aria-hidden="true">
                  {this.props.items && this.props.items.length}
                </i>
              </a>
            </li>

          </ul>
        </div>
      </div>
    );
  }
}

export default pageHeader;
