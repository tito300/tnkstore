import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ProductCard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.flash = React.createRef();
    // }
    state = {
        success: null,
    }

    addItemToCart = (event) => {
        event.preventDefault();
        const id = event.target.dataset.id;
        this.props.addItemToCart(id);
        this.setState({ success: 'added' })
        setTimeout(() => {
            this.setState({ success: null });
        }, 2000);
    }

    render() {
        return (
            <div key={this.props.item.id}
                className={`products__card card-${this.props.i}`}>
                <div className="products__card__img-cont">
                    <img src={this.props.item.photo} alt="" className="card-img"></img>
                </div>
                <div className="products__card__details">
                    <h3 className="products__card__details__title">{this.props.item.title}</h3>
                    <p className="products__card__details__disc">{this.props.item.discreption}</p>
                </div>
                <div className="products__card__btn">
                    <p className="products__card__btn__price">${this.props.item.price}</p>
                    <a href="#" onClick={this.addItemToCart} className="add-btn" data-id={this.props.item.id}>add to cart</a>
                </div>
                <div className={`flash-success ${this.state.success}`}>
                    <p className="flash-s-msg">Item added to cart</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.user.active,
        cartItems: state.cart.cartItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (id) => {
            /* 
             * this first dispatch returns a function instead of an object so that the thunk middleware
             * would recognize it and pass the get state object to it. this way reducers can share 
             * state when needed.
             * */
            dispatch((dispatch, getState) => {
                dispatch({ type: 'ADD_ITEM_TO_CART', id: id, products: getState().products.products });
            }
            );

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);