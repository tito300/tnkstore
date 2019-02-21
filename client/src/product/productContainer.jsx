import React, { Component } from 'react';
import axios from 'axios';
import Product from './product.jsx';
import ErrorBoundary from './errorBoundaries/productError';


export class ProductContainer extends Component {
    state = {
        product: null,
        pending: true,
        err: false,
        errMsg: null,
    }

    container = {
        width: '1200px',
        margin: '150px auto 0',
        paddingTop: '30px',
        overFlow: 'hidden',
        minHeight: 'calc(100vh - 78px)',
    }

    faSpinner = {
        width: 'fit-content',
        margin: '50px auto 150px auto',
        color: 'gray',
    }

    componentDidMount() {
        // debugger;
        let { computedMatch } = this.props;
        axios.get(`/api/products/product/${computedMatch.params.id}`)
            .then(({ data }) => {
                this.setState({ product: data, pending: false })
            })
            .catch((err) => {
                console.log('catch called');
                let msg = '';
                if (err.response.status === 404) {
                    msg = '404: product is not available. Please contact us or come back later.'
                } else {
                    msg = 'server is not responding, please try refreshing the page or contact us.'
                }
                this.setState({ pending: false, err: true, errMsg: msg });
            })
    }

    componentDidUpdate() {
        let { computedMatch } = this.props;
        debugger;
        if (computedMatch.params.id !== this.state.product.id) {
            axios.get(`/api/products/product/${computedMatch.params.id}`)
                .then(({ data }) => {
                    this.setState({ product: data, pending: false })
                })
                .catch((err) => {
                    console.log('catch called');
                    let msg = '';
                    if (err.response.status === 404) {
                        msg = '404: product is not available. Please contact us or come back later.'
                    } else {
                        msg = 'server is not responding, please try refreshing the page or contact us.'
                    }
                    this.setState({ pending: false, err: true, errMsg: msg });
                })
        }
    }

    render() {
        if (!this.state.err) {
            return (
                <div className="product-display" style={this.container}>
                    {this.state.product ?
                        <ErrorBoundary>
                            <Product product={this.state.product} />
                        </ErrorBoundary>
                        : <div style={this.faSpinner} >
                            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                        </div>
                    }
                </div>
            )
        }
        if (this.state.err) {
            return (<div className="product-list__Error">
                <p className="product-list__Error_title" >
                    Sorry!
                </p>
                <p className="product-list__Error_details">
                    {this.state.errMsg}
                </p>
            </div>)
        }
    }
}

export default ProductContainer;
