import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import propType from 'prop-types';
import Button from '../common/button';


class ProductCard extends Component {

    state = {
        success: null,
    }

    static propType = {
        item: propType.object.isRequired,
        i: propType.number.isRequired,
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
                    <Button
                        id={this.props.item.id}
                        text='View Item'
                        to={`/product/${this.props.item.id}`} />
                </div>
                <div className={`flash-success ${this.state.success}`}>
                    <p className="flash-s-msg">Item added to cart</p>
                </div>
            </div>
        )
    }
}


export default withRouter(ProductCard);