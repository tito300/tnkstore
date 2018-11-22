import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import MainPage from './mainPage/mainPage';
import Header from './common/pageHeader';
import Footer from './common/footer';
import CartContent from './cart/2-cartContent';
import Products from './common/productsDisplay';
import LoginIcon from './common/loginIcon';
import Login from './login/login';
import './styles/scss/main.scss'


class Website extends Component {
    state = {

    }

    incrementCount = itemId => {
        const newItems = this.state.cartItems.map(item => {
            if (item.id === itemId) {
                item.count++; // eslint-disable-line
                return item;
            }
            return item;
        });
        this.setState({ cartItems: [...newItems] });
    };


    render() {
        return (
            <React.Fragment>
                <Header />
                <LoginIcon />
                <Switch>
                    <Route path="/products" component={Products} />
                    <Route path="/cart/main" render={(props) =>
                        <CartContent
                            {...props}
                            incrementCount={this.incrementCount}
                        />
                    } />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={MainPage} />
                </Switch>
                <Footer />

            </React.Fragment>
        );
    }
}

export default Website;