import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer-wrapper">
                <div className="footer">
                    <div className="footer__list nav-bar">
                        <ul className="footer__list__ul nav-bar__ul">
                            <li className="footer__list__ul__li nav-bar__ul__li"><a href="">Submit designs</a></li>
                            <li className="footer__list__ul__li nav-bar__ul__li"><a href="">contact us</a></li>
                            <li className="footer__list__ul__li nav-bar__ul__li"><a href="">News letter</a></li>
                            <li className="footer__list__ul__li nav-bar__ul__li"><a href="">Amazon store</a></li>
                        </ul>
                    </div>
                    <p className="footer__copywrite">T&K Quality &copy</p>

                </div>
            </footer>
        );
    }
}

export default Footer;