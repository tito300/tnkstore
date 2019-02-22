import React from 'react';
import { Link } from 'react-router-dom'
import AddToCartButton from '../common/addToCart-button.jsx';
import propType from 'prop-types';


let jsUcfirst = function (string) {
    if (typeof string === 'string') {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        console.error('variable string is not a string. it is: ' + JSON.stringify(string));
        throw new Error('title is not a string at jsUcfirst');
    }
}

let ProductDetails = (props) => {

    let { success, failed, addItemToCartSuccess, color, size, gender, product } = props;

    let brand = (product.brand && product.brand !== "") ? product.brand : 'Not available';
    return (
        <>
            <h2 className='title' >{jsUcfirst(product.title)}</h2>
            <p className='brand' >{`brand: `}
                <span>{brand}</span>
            </p>
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

ProductDetails.prototype = {
    success: propType.bool,
    failed: propType.bool,
    addItemToCartSuccess: propType.func,
    color: propType.string,
    size: propType.string,
    gender: propType.string,
    product: propType.object,
}

export default ProductDetails;