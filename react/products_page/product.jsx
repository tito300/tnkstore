import React, { Component } from 'react';
import AddToCartButton from '../common/addToCart-button.jsx';
import { Link } from 'react-router-dom'

export default class Product extends Component {
    state = {
        success: false,
    }

    jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    addItemToCartSuccess = () => {
        this.setState({ success: true });
    }


    render() {
        let { props } = this;
        return (
            <div className='productSubContainer' >
                <div className='TopSection' >

                    <div className='photoSection' >
                        <div className='photoContainer' >
                            <img src={`/${props.product.photo}`} className='photo' alt="" />
                        </div>
                        <div className='gallerySection' >
                            <div>
                                <i className="fa fa-angle-left" aria-hidden="true"></i>
                            </div>
                            <div className='galleryContainer' >
                                <div className='imgContainer' >
                                    <img className='galleryPhoto' src={`/${props.product.photo}`} />
                                </div>
                                <div className='imgContainer' >
                                    <img className='galleryPhoto' src={`/${props.product.photo}`} />
                                </div>
                                <div className='imgContainer' >
                                    <img className='galleryPhoto' src={`/${props.product.photo}`} />
                                </div>
                            </div>
                            <div>
                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>

                    <div className='infoSection' >
                        <h2 className='title' >{this.jsUcfirst(props.product.title)}</h2>
                        <p className='brand' >Brand: {props.product.brand ?
                            (<span>{props.product.brand}</span>) : 'Not available'}</p>
                        <div className='priceContainer' >
                            <span className='price' >Price: <span className='priceNumber' >${props.product.price}</span></span>
                            {this.state.success === false ?
                                <AddToCartButton item={props.product} addItemToCartSuccess={this.addItemToCartSuccess} />
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
                            <p className='discreptionText' >{props.product.discreption}</p>
                        </div>
                        <div className='optionsContainer' style={{ fontSize: '20px', margin: 'auto', width: '170px', marginTop: '60px', color: '#ebebeb' }} >COMING SOON</div>
                    </div>
                </div>

                <div className='BottomSection' style={{ fontSize: '20px', margin: 'auto', width: '170px', color: '#ebebeb', paddingTop: '30px' }}>COMING SOON</div>
            </div>
        )
    }
}