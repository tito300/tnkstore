import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AddToCartButton from '../common/addToCart-button.jsx';


class ProductDetails extends Component {

    jsUcfirst = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let { success, failed, addItemToCartSuccess, color, size, gender, handleOptions, product } = this.props;
        return (
            <>
                <h2 className='title' >{this.jsUcfirst(product.title)}</h2>
                <p className='brand' >Brand: {product.brand ?
                    (<span>{product.brand}</span>) : 'Not available'}</p>
                <div className='priceContainer' >
                    <span className='price' >Price: <span className='priceNumber' >${product.price}</span></span>
                    {(!success && !failed) ?
                        <AddToCartButton
                            item={product}
                            addItemToCartSuccess={addItemToCartSuccess}
                            options={{ color, size, gender }}
                        />
                        : (!success && failed) ?
                            <div style={{ width: '108px' }}>
                                <AddToCartButton
                                    item={product}
                                    addItemToCartSuccess={addItemToCartSuccess}
                                    options={{ color, size, gender }}
                                />
                                <p className='addToCartWarning' style={{
                                    position: 'relative'
                                }}>
                                    {'Make sure to select\n color'}
                                </p>
                            </div>

                            : <div>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                                </svg>
                                <Link to='/cart/main'><p className="success">View Cart</p></Link>
                            </div>
                    }
                </div>
                <div className='discreptionContainer' >
                    <p className='discreptionText' >{product.discreption}</p>
                </div>

            </>)
    }
}

export default ProductDetails;