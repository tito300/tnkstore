import React, { Component } from 'react';
import axios from 'axios';
import Product from './product.jsx';



export class ProductContainer extends Component {
    state = {
        product: null
    }

    container = {
        width: '1200px',
        margin: 'auto',
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
        axios.get(`/api/products/${computedMatch.params.id}`)
            .then(({ data }) => this.setState({ product: data }))
    }

    render() {
        return (
            <div style={this.container}>
                {this.state.product ?
                    <Product product={this.state.product} />
                    : <div style={this.faSpinner} >
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    </div>
                }
            </div>
        )
    }
}

export default ProductContainer;
