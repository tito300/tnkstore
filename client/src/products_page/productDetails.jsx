import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AddToCartButton from '../common/addToCart-button.jsx';


class ProductDetails extends Component {

    jsUcfirst = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let { success, failed, addItemToCartSuccess, color, size, gender, handleOptions, product } = this.props;
        return (<div className='infoSection' >
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
                {/* <p className='discreptionTitle' >Details:</p> */}
                <p className='discreptionText' >{product.discreption}</p>
            </div>
            {/* <div className='optionsContainer' style={{ fontSize: '20px', margin: 'auto', width: '170px', marginTop: '60px', color: '#e2e2e2' }} >COMING SOON</div> */}
            <div className='optionsContainer'>
                <div>
                    <p className="optionsTitle">Color</p>
                    <div className="colorsContainer">
                        <span id="red" className={color === 'red' ? 'colorOption selectedColor' : 'colorOption'} title="color: Red" onClick={handleOptions} />
                        <span id="blue" className={color === 'blue' ? 'colorOption selectedColor' : 'colorOption'} title="color: Blue" onClick={handleOptions} />
                        <span id="green" className={color === 'green' ? 'colorOption selectedColor' : 'colorOption'} title="color: Green" onClick={handleOptions} />
                        <span id="black" className={color === 'black' ? 'colorOption selectedColor' : 'colorOption'} title="color: Black" onClick={handleOptions} />
                    </div>
                </div>
                <div>
                    <p className="optionsTitle">Size</p>
                    <select className="selectSize" value={size} onChange={handleOptions}>
                        <option value="s" >S</option>
                        <option value="L" >L</option>
                        <option value="M" >M</option>
                        <option value="XL" >XL</option>
                        <option value="XXL" >XXL</option>
                    </select>
                </div>
                <div>
                    <p className="optionsTitle">Gender</p>
                    <select className="selectGender" value={gender} onChange={handleOptions}>
                        <option value="s">Male</option>
                        <option value="L">Female</option>
                    </select>
                </div>
            </div>
        </div>)
    }
}

export default ProductDetails;