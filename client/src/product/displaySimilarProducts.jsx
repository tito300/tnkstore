import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class DisplaySimilarProducts extends Component {
    state = {
        similarProducts: [],
        error: false,
        page: 0,
        animate: false,
    }

    async componentDidMount() {
        const { brand, category, currentProduct } = this.props;
        let brandName = encodeURIComponent(brand);
        try {
            const products = await axios.get(`/api/products/similar?categories=${JSON.stringify(category)}&current=${currentProduct}&skip=${this.state.page}&brand=${brandName}`)
            this.setState({
                similarProducts: products.data,
                error: false
            })
        } catch (err) {
            this.setState({
                error: true,
                similarProducts: [],
            })
        }

    }

    handleNextClick = async (e) => {
        const { brand, category, currentProduct } = this.props;
        let brandName = encodeURIComponent(brand);

        let skip = this.state.page + 1;
        try {
            const products = await axios.get(`/api/products/similar?categories=${JSON.stringify(category)}&current=${currentProduct}&skip=${skip}&brand=${brandName}`);
            if (products.data.length) {
                this.setState({ animate: 'right' }, () => {
                    setTimeout(() => {
                        this.setState({
                            similarProducts: products.data,
                            error: false,
                            page: skip,
                            animate: 'show-left',
                        })
                    }, 120)
                })
            }
        } catch (err) {
            console.error(err);
        }
    }
    handlePrevClick = async (e) => {
        const { brand, category, currentProduct } = this.props;
        let brandName = encodeURIComponent(brand);

        if (this.state.page > 0) {
            let skip = this.state.page - 1;
            try {
                const products = await axios.get(`/api/products/similar?categories=${JSON.stringify(category)}&current=${currentProduct}&skip=${skip}&brand=${brandName}`);
                if (products.data.length) {
                    this.setState({ animate: 'left' }, () => {
                        setTimeout(() => {
                            this.setState({
                                similarProducts: products.data,
                                error: false,
                                page: skip,
                                animate: 'show-right',
                            })
                        }, 120)
                    })
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    handleProductClick = (e) => {
        this.props.history.push(`/product/${e.currentTarget.id}`);
    }

    render() {
        const { similarProducts, error, animate } = this.state;
        return (
            <>
                <p className='similarItems'>Similar Products</p>
                <div className='bottomGallery'>
                    <div>
                        <i className="fa fa-angle-left" aria-hidden="true" onClick={this.handlePrevClick}></i>
                    </div>
                    <div className="bottomPhotosGallery">
                        {similarProducts.length ?
                            similarProducts.map((product) => {
                                return (
                                    <div className={`bottomItem ${animate === 'left' ? 'hide-left'
                                        : animate === 'right' ? 'hide-right'
                                            : animate === 'show-left' ? 'show-left'
                                                : animate === 'show-right' ? 'show-right'
                                                    : ''}`} id={product.id} onClick={this.handleProductClick}>
                                        <img className='galleryPhoto' src={`/${product.photo}`} />
                                    </div>
                                )
                            })
                            : error ? <p className='error'>Sorry, no similar products to show</p>
                                : ''
                        }
                    </div>
                    <div>
                        <i className="fa fa-angle-right" aria-hidden="true" onClick={this.handleNextClick}></i>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(DisplaySimilarProducts);