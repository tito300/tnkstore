import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import jwtDecoded from 'jwt-decode'

class Login extends Component {
    constructor(props) {
        super(props);
        this.formRoot = React.createRef();
        this.registerFormRoot = React.createRef();
        this.signupError = React.createRef();
        this.signinError = React.createRef();
    }

    state = {
        email: '',
        password: '',
        name: '',
        phone: ''
    }

    handleClick = (e) => {
        e.preventDefault();
        if (e.target.classList.contains('signup')) {
            this.formRoot.current.style.display = 'none';
            this.registerFormRoot.current.style.display = 'block';
        } else if (e.target.classList.contains('signin')) {
            this.registerFormRoot.current.style.display = 'none';
            this.formRoot.current.style.display = 'block';
        } else if (e.target.classList.contains('google-login')) {
            fetch('/aoth/google', {
                method: 'GET',
            });
        }
    }

    handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                const email = e.target.value;
                this.setState({ email });
                break;
            case 'password':
                const password = e.target.value;
                this.setState({ password });
                break;
            case 'name':
                const name = e.target.value;
                this.setState({ name });
                break;
            default: return;
        }
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/users/login`, {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.data.jwt) {
                localStorage.setItem('jwt', res.data.jwt);
                this.props.login(res.data.jwt);
                this.props.history.push({ pathname: '/', state: { from: '/login' } });
            } else {
                console.warn('something went wrong please try again. HINT: jwt was not sent back');
            }

        })
            .catch(err => {
                this.signinError.current.innerText = err.response.data.message;
                this.signinError.current.style.display = 'block';
            });
    }

    handleSignupSubmit = (e) => {

        let self = this;

        e.preventDefault();
        axios.post('/api/users/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.password
        }).then(res => {
            if (res.data.jwt) {
                // debugger;
                localStorage.setItem('jwt', res.data.jwt);
                this.props.login(res.data.jwt);
                fetch('/api/users/cart/updateCart?login=true', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ items: self.props.cart })
                });
                this.props.history.push('/');
            } else {
                // TODO: inform user that they need to sign in since jwt was not sent.
                console.warn('something went wrong please try again. HINT: jwt was not sent back');
            }
        }).catch((err) => {
            this.signupError.current.innerText = err.response.data.message;
            this.signupError.current.style.display = 'block';

        });
    }

    render() {
        return (
            <div className="body-section section" id="0">

                <div ref={this.registerFormRoot} className="register-form_div" style={{ display: 'none' }}>
                    <p className="register-form_title">Register</p>
                    <form onSubmit={this.handleSignupSubmit} action="/api/login" className="register-form" name="register-form" method="POST" >
                        <div ref={this.signupError} className="login-error" style={{ fontSize: '16px', display: 'none', margin: '10px 0px', padding: '10px 15px', backgroundColor: '#f75d5d', color: 'white' }}></div>

                        <label htmlFor="name">Name</label>
                        <input onChange={this.handleChange} id="name" name="name" placeholder="full name" />
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handleChange} id="email" name="email" placeholder="email" />
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" id="password" name="password" placeholder="password" />
                        <label htmlFor="phone">Phone number</label>
                        <input onChange={this.handleChange} id="phone" name="phone" placeholder="phone#" />

                        <input type="submit" className="submit-register-temp" value="Submit" />

                    </form>
                    <p className="form-meta">already have an account? <a href="#" onClick={this.handleClick} className="signin">click here to signin</a></p>
                </div>

                <div ref={this.formRoot} className="login-form_div">
                    <p className="register-form_title">Login</p>
                    <form onSubmit={this.handleLoginSubmit} action="/api/users/login" className="login-form" name="register-form" method="POST">
                        <div ref={this.signinError} className="login-error" style={{ fontSize: '16px', display: 'none', margin: '10px 0px', padding: '10px 15px', backgroundColor: '#f75d5d', color: 'white' }}></div>

                        <label htmlFor="lemail">Email</label>
                        <input onChange={this.handleChange} id="lemail" name="email" placeholder="email" value={this.state.email} />
                        <label htmlFor="lpassword">Password</label>
                        <input onChange={this.handleChange} type="password" id="lpassword" name="password" placeholder="password" value={this.state.password} />

                        <input type="submit" className="submit-register-temp" value="Submit" />
                    </form>
                    <p className="form-meta">Don't have an account? <a href="" onClick={this.handleClick} className="signup">click here to signup</a></p>
                </div>

                <div className="login-container">
                    <h2 className="login-header">Login through: </h2>
                    {/* <form method="get" action="/aoth/google" className="google-form">
                        <input type="submit" className="google-login" value="Google+" />
                    </form> */}
                    <a href="http://localhost:3001/aoth/google" className="google-login">Google</a>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (jwt) => {
            const payload = jwtDecoded(jwt);
            dispatch({ type: 'LOGIN', payload });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartItems,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);