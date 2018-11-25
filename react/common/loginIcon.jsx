import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginIcon extends Component {

    handleSignout = (e) => {
        if (e.target.innerText === 'Logout') {
            this.props.signout();
        }
    }
    render() {
        return (
            <div className="login">

                {this.props.loggedin ? <div onClick={this.handleSignout} className="login__input">Logout</div>
                    : <Link to='/login' className="login__input">Login</Link>}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.user.active,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => {
            localStorage.removeItem('jwt');
            dispatch({ type: 'SIGNOUT' });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginIcon));