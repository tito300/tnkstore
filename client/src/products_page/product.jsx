import React, { Component } from 'react';
import { throws } from 'assert';
import propType from 'prop-types';
import ProductImage from './productImage';
import ProductDetails from './productDetails';
import DisplaySimilarProducts from './displaySimilarProducts'
// import { PromiseProvider } from 'mongoose';

export default class Product extends Component {

    state = {
        success: false,
        activePicture: '',
        gender: 'male',
        size: 'L',
        color: '',
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
        let { color, size, gender, activePicture } = this.state;

        return (
            <div className='productSubContainer' >
                <div className='TopSection' >

                    <ProductImage
                        activePicture={activePicture}
                        handleSelectPhoto={this.handleSelectPhoto}
                        {...props} />

                    <ProductDetails
                        handleOptions={this.handleOptions}
                        addItemToCartSuccess={this.addItemToCartSuccess}
                        {...props}
                        {...this.state}
                    />
                </div>

                <div className='BottomSection'>
                    <DisplaySimilarProducts {...props} />
                </div>
            </div>
        )
    }
}