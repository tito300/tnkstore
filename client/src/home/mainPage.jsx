import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookie from 'js-cookie';
import jwtDecoded from 'jwt-decode';
import Banner from './banner';
import AboutUsModel from './aboutus__model';
import Scroll from './scrollElements';
import ImgSection from './imgSection';
import CardsDisplay from './cardsDisplay';



class MainPage extends Component {

    componentDidMount() {
        /* 
         * js file is required here because it requires some elements to be mounted to
         * function properly. deleting require cashe to allow for selecting freshly mounted 
         * component elements everytime user leaves main page and come back. otherwise
         * original js selectors will not work because they have stale data.
         *  */
        if (process.env.NODE_ENV !== 'test') {
            delete require.cache[require.resolve('../scripts/index')];
            require('../scripts/index');
        }


        let jwt = Cookie.get('jwt');

        if (jwt) {
            if ((this.props.location.state && this.props.location.state.from === '/login') || this.props.location.pathname === '/aoth/google') {
                // debugger;
                console.log('FIRED: componentDidMount in mainPage');
                axios(`/api/users/cart/updateCart?login=true`, {
                    method: 'post',
                    /* token is set in cookies and will be sent automatically */
                    // headers: { Authorization: `bearer ${localStorage.getItem('jwt')}` },
                    data: {
                        items: this.props.cartItems,
                    }
                })
                    .then((res) => {
                        if (res.data instanceof Array) {

                            this.props.populateCartItems(res.data);
                        }
                    });
            } else if (!this.props.loggedin && jwt) {
                localStorage.setItem('jwt', jwt);
                this.props.login(jwt);
            }
        }
    }
    render() {
        return (
            <>
                <div className="home-banner section tnk" id="0">
                    <Banner />
                    <AboutUsModel />
                    <Scroll />
                </div>

                <div className="part2 section" id="1">
                    <ImgSection />
                </div>

                <div className="section" id="2">
                    <CardsDisplay />
                </div>
            </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.user.active,
        cartItems: state.cart.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateCartItems: (items) => {
            dispatch({ type: 'POPULATE_CARTITEMS', data: items });
        },
        login: (jwt) => {
            const payload = jwtDecoded(jwt);
            dispatch({ type: 'LOGIN', payload });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);