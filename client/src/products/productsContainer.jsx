import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './productCard';
import propTypes from 'prop-types';

export class Products extends Component {
    state = {
        products: [],
        allProducts: [],
        page: 1,
        numberOfPages: 4,
        itemsPerPage: 6,
        category: "top-sellers",
        error: false,
        errMsg: "",
        pending: false,
    }

    static propTypes = {
        data: propTypes.array,
    }

    async componentDidMount() {
        this.setState({ pending: true });
        let products = await this.getProducts();
        let numberOfPages = Math.ceil(products.length / this.state.itemsPerPage);
        this.setState({ allProducts: products, numberOfPages }, () => {
            this.updateCurrentPageProducts()
        })
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevstate.page !== this.state.page) {
            this.updateCurrentPageProducts();
        }
    }

    handlePageChange = (e) => {
        e.preventDefault();
        let id = e.target.id === "" ? e.target.parentNode.id : e.target.id;
        this.setState({ page: parseInt(id) });
    }

    getProducts = async () => {
        const url = `/api/products/${this.state.category}?page=${this.state.page}&productsPerReq=${this.state.itemsPerPage * this.state.numberOfPages}`

        let res = await axios.get(url)
        let data = [...res.data];
        let products = [...this.state.allProducts, ...data];

        // TODO: implement friendly error using Error boundaries comp
        if (data.length === undefined) return this.setState({ error: true, errMsg: "server response was not proper, try to refresh the page" });

        // NOTSURE: whether there is a need to keep products in redux;
        // this.props.populateProducts(products);

        return products;

    }

    updateCurrentPageProducts = () => {
        let { page, itemsPerPage, allProducts } = this.state;
        let all = [...allProducts]
        let result = all.slice(((page - 1) * itemsPerPage), (itemsPerPage * page))

        this.setState({ products: result, allProducts: all, pending: false });
        return result;
    }


    render() {
        let { page, products, pending, numberOfPages } = this.state;

        let getPagingElements = () => {
            let result = [];
            for (let i = 1; i <= numberOfPages; i++) {
                let class1 = page === i ? "pager-li active" : "pager-li"
                let num = i.toString();
                result.push(<li id={num} key={num} className={class1} onClick={this.handlePageChange}>
                    <a href="#" >{num}</a>
                </li>)
            }
            return result;
        }

        return (
            <div className="body-section">
                <h1 className="page-title">TOP SELLERS</h1>
                <div className="products">
                    {products.length > 0 ? products.map((item, i) => { // makes sure data exists
                        return (
                            <ProductCard
                                key={i}
                                i={i}
                                item={item}
                            />
                        )
                    })
                        : (products.length === 0) && !pending ? <p className='text-error'>Sorry, there is no more products to show</p>
                            : <p className="fetching-items">Fetching Items...</p>}
                </div>

                {/* TODO: extract this pager to a pure component to make it reusable */}
                <div className="pager-container">
                    <ul className="pager-ul">
                        {getPagingElements()}
                    </ul>
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
