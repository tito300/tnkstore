import React, { Component } from 'react';
import validator from 'validator'
import axios from 'axios';

export default class Model extends Component {
    state = {
        email: '',
        message: '',
        success: false,
        fail: false,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                email: '',
                message: '',
                success: false,
                fail: false,
                errMessage: null,
            })
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        })
    }
    handleMessageChange = (e) => {
        this.setState({
            message: e.target.value,
        })
    }
    handleSubmit = async (e) => {
        const { email, message } = this.state
        e.preventDefault();

        let emailValid = validator.isEmail(email) ? email : false;
        let messageValid = message.length > 5 ? message : false;

        if (!emailValid || !messageValid) {
            let errMessage = !emailValid ? 'please enter a valid email'
                : !messageValid ? 'message must be provided'
                    : 'your inputs is not correct';
            return this.setState({
                fail: true,
                errMessage
            })
        }

        try {
            let response = await axios.post('/contactus', { email, message })
            this.setState({
                success: true,
                fail: false,
            })
        } catch (err) {
            console.error(err);
            this.setState({
                fail: true,
                success: false,
                errMessage: 'message was not delivered, try again shortly'
            })
        }
    }

    render() {
        const { show, handleClick } = this.props;
        const { email, message, success, fail, errMessage } = this.state

        return (
            <div className="model contact-us" style={show && show === 'true' ? { display: 'flex' } : { display: 'none' }}>

                <div className="model__box">
                    <span className="x" onClick={handleClick}>X</span>
                    <div className={success ? 'model__box__text-area success' : 'model__box__text-area'}>
                        {!success ?
                            <>
                                <p className="title">Contact us</p>
                                {fail ?
                                    <p className="error">{errMessage}</p>
                                    : ''
                                }
                                <form className="text-area__box-form" action="" onSubmit={this.handleSubmit}>
                                    <input type="email" placeholder=" Enter your email.." value={email} onChange={this.handleEmailChange}></input>
                                    <textarea placeholder=" Enter message.." value={message} onChange={this.handleMessageChange}></textarea>
                                    <button className="flexible-btn btn-2">Send</button>
                                </form>
                            </>
                            :
                            <div>
                                <svg className="success-check" style={{ width: '150px' }} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                                </svg>
                                <p className="success-message">your message has been delivered, we will get back to you shortly</p>
                            </div>}
                    </div>
                    <div className="model__box__img img-1"></div>

                </div>
            </div>
        )
    }
}