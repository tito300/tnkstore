import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './productCard';
import propTypes from 'prop-types';

class Products extends Component {
    state = {
        products: [],
        page: 1,
        itemsPerPage: 6,
        error: false,
        errMsg: "",
    }

    static propTypes = {
        data: propTypes.array,
    }

    componentDidMount() {
        const url = `/api/products/top-sellers`

        axios.get(url).then((res) => {
            let data = [...res.data];
            let products = [...this.state.products, ...data];

            if (data.length === undefined) return this.setState({ error: true, errMsg: "server response was not proper, try to refresh the page" });

            this.props.populateProducts(products);
            this.setState({ products })
        });
    }


    render() {
        return (
            <div className="body-section">
                <h1 className="page-title">TOP SELLERS</h1>
                <div className="products">
                    {this.state.products.length > 0 ? this.state.products.map((item, i) => { // makes sure data exists
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
        data: state.products.all,
        loggedin: state.active,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateProducts: (products) => { dispatch({ type: 'POPULATE_PRODUCTS', products: products }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);