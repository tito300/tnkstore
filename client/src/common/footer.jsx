import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContactUsModel from './contactus__model';

class Footer extends Component {
    state = {
        contact: false,
    }

    handleContactClick = () => {
        this.setState({ contact: true })
    }
    handleCloseClick = () => {
        this.setState({ contact: false })
    }
    render() {
        const { contact } = this.state;
        return (
            <footer className="footer-wrapper">
                <div className="footer">
                    <div className="footer__list nav-bar">
                        <ul className="footer__list__ul nav-bar__ul">
                            <li className="footer__list__ul__li nav-bar__ul__li"><Link to="/aboutus">About us</Link></li>
                            <li className="footer__list__ul__li nav-bar__ul__li" onClick={this.handleContactClick}><a href="#">contact us</a></li>
                            <li className="footer__list__ul__li nav-bar__ul__li"><a href="#">News letter</a></li>
                            <li className="footer__list__ul__li nav-bar__ul__li"><a href="#">Amazon store</a></li>
                        </ul>
                    </div>
                    <p className="footer__copywrite">T&K Quality &copy</p>
                </div>
                <ContactUsModel show={contact ? 'true' : null} handleClick={this.handleCloseClick} />
            </footer>
        );
    }
}

export default Footer;