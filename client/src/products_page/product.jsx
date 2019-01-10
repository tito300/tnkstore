import React, { Component } from 'react';
import propType from 'prop-types';
import ProductImage from './productImage';
import ProductDetails from './productDetails';
import ProductOptions from './productOptions'
import DisplaySimilarProducts from './displaySimilarProducts'
// import { PromiseProvider } from 'mongoose';

export default class Product extends Component {

    state = {
        success: false,
        activePicture: '',
        gender: 'male',
        size: null,
        color: null,
        variants: {
            male: [
                {
                    color: 'red', sizes: [
                        { size: 'l', price: 29.99 },
                        { size: 'm', price: 25.99 },
                    ]
                },
                {
                    color: 'blue', sizes: [
                        { size: 's', price: 29.99 },
                        { size: 'xl', price: 25.99 },
                    ]
                }
            ],
            female: [
                {
                    color: 'green', sizes: [
                        { size: 'xxl', price: 29.99 },
                        { size: 'xs', price: 25.99 },
                    ]
                },
                {
                    color: 'blue', sizes: [
                        { size: 'm', price: 29.99 },
                        { size: 'l', price: 25.99 },
                    ]
                }
            ],
        }
    }

    static propType = {
        product: propType.object.isRequired,
    }

    componentDidMount() {
        this.setState({ activePicture: this.props.product.photo });

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
            this.setState({ gender: e.target.value.toLowerCase() });
        } else if (e.target.className === 'selectSize') {
            this.setState({ size: e.target.value });
        } else if (e.target.classList.contains('colorOption')) {
            if (e.target.id === this.state.color) return this.setState({ color: '' });

            // size is set here so that the value attribute of <select> in the size section is not null 
            // therefore allowing users to add item to cart without having to reselect. better solution is needed.
            this.setState({ color: e.target.id, size: this.state.variants[this.state.gender].find(t => t.color === e.target.id).sizes[0].size });
        };
    }

    render() {
        let { props } = this;
        let { color, size, gender, activePicture } = this.state;

        return (
            <div className='productSubContainer' >
                <div className='TopSection' >

                    <ProductImage
                        activePicture={activePicture}
                        handleSelectPhoto={this.handleSelectPhoto}
                        {...props} />

                    <div className='infoSection' >
                        <ProductDetails
                            handleOptions={this.handleOptions}
                            addItemToCartSuccess={this.addItemToCartSuccess}
                            {...props}
                            {...this.state}
                        />
                        <ProductOptions
                            variants={this.state.variants}
                            handleOptions={this.handleOptions}
                            gender={gender}
                            color={color}
                            size={size}
                        />
                    </div>
                </div>

                <div className='BottomSection'>
                    <DisplaySimilarProducts {...props} />
                </div>
            </div>
        )
    }
}