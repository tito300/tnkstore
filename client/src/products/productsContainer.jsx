import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './productCard';
import propTypes from 'prop-types';

class Products extends Component {

    static propTypes = {
        data: propTypes.array,
    }

    componentDidMount() {
        const url = `/api/products/top-sellers`

        axios.get(url).then((res) => {
            let data = [...res.data];

            this.props.populateProducts(data);
        });
    }


    render() {
        return (
            <div className="body-section">
                <h1 className="page-title">TOP SELLERS</h1>
                <div className="products">
                    {this.props.data[0] ? this.props.data.map((item, i) => { // makes sure data exists

                        return (

                            <ProductCard
                                key={i}
                                i={i}
                                item={item}
                            />

                        )

                    })
                        : <p>Fetching Items...</p>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.products.products,
        loggedin: state.active,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateProducts: (products) => { dispatch({ type: 'POPULATE_PRODUCTS', products: products }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);