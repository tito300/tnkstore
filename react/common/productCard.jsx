import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ProductCard extends Component {

    componentDidUpdate(prevProps, prevState) {
        /* used header to sync cart instead of this here - to be removed  */
        // if (this.props.i < 1) {
        //     if (this.props.loggedin) {
        //         axios(`/api/users/cart/updateCart`, {
        //             method: 'post',
        //             headers: { Authorization: `bearer ${localStorage.getItem('jwt')}` },
        //             data: {
        //                 items: this.props.cartItems,
        //             }
        //         })
        //             .then((res) => console.log('synched cart successfully'));
        //     }
        // }

    }

    addItemToCart = (event) => {
        event.preventDefault();
        const id = event.target.dataset.id;
        // this.props.addItemToCart(id)
        // should be implemented when backend is ready
        this.props.addItemToCart(id);
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
                <div className="flash-success">
                    <p className="flash-s-msg">Item added to cart</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.user.active,
        cartItems: state.cartItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (id) => {
            dispatch({ type: 'ADD_ITEM_TO_CART', id: id })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);