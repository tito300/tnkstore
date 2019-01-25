import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './productCard';
import propTypes from 'prop-types';
import ErrorBoundary from './errorBoundaries/productsCardError'

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
        if (products === null) {
            return this.setState({ error: true, errMsg: 'Server is not responding please try refreshing the page or contact us at 999-999-9999', pending: false })
        }
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
        // debugger;
        let res;
        try {
            res = await axios.get(url)
        } catch (err) {
            return null
        }

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
        if (!this.state.error) {
            return (
                <div className="body-section">
                    <h1 className="page-title">TOP SELLERS</h1>

                    {products.length > 0 ? (
                        <React.Fragment>
                            <div className="products">

                                {products.map((item, i) => { // makes sure data exists
                                    return (

                                        <ErrorBoundary>
                                            <ProductCard
                                                key={i}
                                                i={i}
                                                item={item}
                                            />
                                        </ErrorBoundary>


                                    )
                                })}
                            </div>
                            {/* TODO: extract this pager to a pure component to make it reusable */}
                            <div className="pager-container">
                                <ul className="pager-ul">
                                    {getPagingElements()}
                                </ul>
                            </div>
                        </React.Fragment>

                    )
                        : (products.length === 0) && !pending ? <p className='text-error'>Sorry, there is no more products to show</p>
                            : (<div className="fetching-items">
                                <div className="">Fetching Items...</div>
                                <div style={this.faSpinner} >
                                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                </div>
                            </div>)}



                </div>
            );
        }

        return (
            <div className="product-list__Error">
                <p className="product-list__Error_title" >
                    Oops!
                </p>
                <p className="product-list__Error_details">
                    {this.state.errMsg}
                </p>
            </div>
        )
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
