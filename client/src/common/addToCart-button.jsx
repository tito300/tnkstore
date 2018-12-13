import React, { Component } from 'react';
import { connect } from 'react-redux'
import { throws } from 'assert';

class AddToCartButton extends Component {

    addItemToCart = (event) => {
        event.preventDefault();
        const { size, gender, color } = this.props.options;
        if (size && gender && color) {
            if (this.props.addItemToCartSuccess) {
                this.props.addItemToCartSuccess(true);
            }
            const id = event.target.dataset.id;
            this.props.addItemToCart(id, this.props.options);
        } else {
            this.props.addItemToCartSuccess(false);
        }
    }

    render() {
        return (

            <a href="#" onClick={this.addItemToCart} className="add-btn" data-id={this.props.item.id}>add to cart</a>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (id, options) => {
            /* 
             * the dispatch method below takes a function instead of an object so that the thunk middleware
             * would recognize it and pass the get state object to it. this way reducers can share 
             * state when needed.
             * */
            dispatch((dispatch, getState) => {
                console.log(getState().products)
                dispatch({ type: 'ADD_ITEM_TO_CART', id: id, products: getState().products.products, options });

            }
            );

        }
    }
}

export default connect(null, mapDispatchToProps)(AddToCartButton);