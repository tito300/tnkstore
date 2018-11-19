import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './productCard';

class Products extends Component {

    componentDidMount() {
        const url = `http://localhost:3001/api/top-sellers`
        axios.get(url).then((res) => {
            let data = [...res.data];
            this.props.populateProducts(data);
        });
    }

    render() {
        console.log(this.props);
        return (
            <div className="body-section">
                <h1 className="page-title">TOP SELLERS</h1>
                <div className="products">
                    {this.props.data && this.props.data.map((item, i) => { // makes sure data exists

                        return (

                            <ProductCard
                                key={i}
                                i={i}
                                item={item} />

                        )

                    })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        data: state.products,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateProducts: (products) => { dispatch({ type: 'POPULATE_PRODUCTS', products: products }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);