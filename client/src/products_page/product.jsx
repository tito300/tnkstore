import React, { Component } from 'react';
import AddToCartButton from '../common/addToCart-button.jsx';
import { Link } from 'react-router-dom'
import { throws } from 'assert';

export default class Product extends Component {

    state = {
        success: false,
        activePicture: '',
        gender: 'male',
        size: 'L',
        color: '',
    }
    componentDidMount() {
        this.setState({ activePicture: this.props.product.photo });

    }

    jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    addItemToCartSuccess = (bool) => {
        this.setState({ success: bool, failed: !bool });
    }
    handleSelectPhoto = (e) => {
        const index = parseInt(e.target.attributes.photoindex.value);
        this.setState({ activePicture: this.props.product.secondaryPhotos[index] });
    }
    handleOptions = (e) => {
        if (e.target.className === 'selectGender') {
            this.setState({ gender: e.target.value });
        } else if (e.target.className === 'selectSize') {
            this.setState({ size: e.target.value });
        } else if (e.target.classList.contains('colorOption')) {
            if (e.target.id === this.state.color) return this.setState({ color: '' });
            else this.setState({ color: e.target.id });
        };
    }

    render() {
        let { props } = this;
        let { color, size, gender } = this.state;

        return (
            <div className='productSubContainer' >
                <div className='TopSection' >

                    <div className='photoSection' >
                        <div className='photoContainer' >
                            <img src={`/${this.state.activePicture}`} className='photo' alt="" />
                        </div>
                        <div className='gallerySection' >
                            <div>
                                <i className="fa fa-angle-left" aria-hidden="true"></i>
                            </div>
                            <div className='galleryContainer' >
                                <div className='imgContainer' >
                                    <img className='galleryPhoto' src={`/${props.product.secondaryPhotos[0]}`} photoindex='0' onClick={this.handleSelectPhoto} alt='product' />
                                </div>
                                <div className='imgContainer' >
                                    <img className='galleryPhoto' src={`/${props.product.secondaryPhotos[1]}`} photoindex='1' onClick={this.handleSelectPhoto} alt='product' />
                                </div>
                                <div className='imgContainer' >
                                    <img className='galleryPhoto' src={`/${props.product.secondaryPhotos[2]}`} photoindex='2' onClick={this.handleSelectPhoto} alt='product' />
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
                            {(!this.state.success && !this.state.failed) ?
                                <AddToCartButton
                                    item={props.product}
                                    addItemToCartSuccess={this.addItemToCartSuccess}
                                    options={{ color, size, gender }}
                                />
                                : (!this.state.success && this.state.failed) ?
                                    <div style={{ width: '108px' }}>
                                        <AddToCartButton
                                            item={props.product}
                                            addItemToCartSuccess={this.addItemToCartSuccess}
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
                            <p className='discreptionText' >{props.product.discreption}</p>
                        </div>
                        {/* <div className='optionsContainer' style={{ fontSize: '20px', margin: 'auto', width: '170px', marginTop: '60px', color: '#e2e2e2' }} >COMING SOON</div> */}
                        <div className='optionsContainer'>
                            <div>
                                <p className="optionsTitle">Color</p>
                                <div className="colorsContainer">
                                    <span id="red" className={this.state.color === 'red' ? 'colorOption selectedColor' : 'colorOption'} title="color: Red" onClick={this.handleOptions} />
                                    <span id="blue" className={this.state.color === 'blue' ? 'colorOption selectedColor' : 'colorOption'} title="color: Blue" onClick={this.handleOptions} />
                                    <span id="green" className={this.state.color === 'green' ? 'colorOption selectedColor' : 'colorOption'} title="color: Green" onClick={this.handleOptions} />
                                    <span id="black" className={this.state.color === 'black' ? 'colorOption selectedColor' : 'colorOption'} title="color: Black" onClick={this.handleOptions} />
                                </div>
                            </div>
                            <div>
                                <p className="optionsTitle">Size</p>
                                <select className="selectSize" value={this.state.size} onChange={this.handleOptions}>
                                    <option value="s" >S</option>
                                    <option value="L" >L</option>
                                    <option value="M" >M</option>
                                    <option value="XL" >XL</option>
                                    <option value="XXL" >XXL</option>
                                </select>
                            </div>
                            <div>
                                <p className="optionsTitle">Gender</p>
                                <select className="selectGender" value={this.state.gender} onChange={this.handleOptions}>
                                    <option value="s">Male</option>
                                    <option value="L">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='BottomSection' style={{ fontSize: '20px', margin: 'auto', width: '170px', color: '#ebebeb', paddingTop: '30px' }}>COMING SOON</div> */}
                <div className='BottomSection'>
                    <p className='similarItems'>Similar Products</p>
                    <div className='bottomGallery'>
                        <div>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                        </div>
                        <div className="bottomPhotosGallery">
                            <div className="bottomItem">
                                <img className='galleryPhoto' src={`/${props.product.photo}`} />
                            </div>
                            <div className="bottomItem">
                                <img className='galleryPhoto' src={`/${props.product.photo}`} />
                            </div>
                            <div className="bottomItem">
                                <img className='galleryPhoto' src={`/${props.product.photo}`} />
                            </div>
                            <div className="bottomItem">
                                <img className='galleryPhoto' src={`/${props.product.photo}`} />
                            </div>
                            <div className="bottomItem">
                                <img className='galleryPhoto' src={`/${props.product.photo}`} />
                            </div>
                        </div>
                        <div>
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}