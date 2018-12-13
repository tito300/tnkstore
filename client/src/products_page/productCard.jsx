import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import AddToCartButton from '../common/addToCart-button'


class ProductCard extends Component {

    state = {
        success: null,
    }


    addItemToCart = (event) => {
        this.setState({ success: 'added' })
        setTimeout(() => {
            this.setState({ success: null });
        }, 2000);
    }

    handleProductClick = (e) => {
        this.props.history.push(`/product/${this.props.item.id}`)
    }

    render() {
        return (
            <div key={this.props.item.id}
                className={`products__card card-${this.props.i}`}>
                <div onClick={this.handleProductClick} className="products__card__img-cont">
                    <img src={this.props.item.photo} alt="" className="card-img"></img>
                </div>
                <div className="products__card__details">
                    <h3 onClick={this.handleProductClick} className="products__card__details__title">{this.props.item.title}</h3>
                    <p className="products__card__details__disc">{this.props.item.discreption}</p>
                </div>
                <div className="products__card__btn">
                    <p className="products__card__btn__price">${this.props.item.price}</p>
                    {/* this button below does not work currently because component was changed and now requires
                        options to be passed in. this component should be replaced with view Item button instead. */}
                    <AddToCartButton addItemToCartSuccess={this.addItemToCart} item={this.props.item} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductCard));