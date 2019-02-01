import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './productCard';
import propTypes from 'prop-types';
import ErrorBoundary from './errorBoundaries/productsCardError'
import { Link } from 'react-router-dom'
import Paginator from '../common/paginator';

export class Products extends Component {
    constructor(props) {
        super(props)
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    state = {
        products: [],
        allProducts: [],
        page: 1,
        numberOfPages: 4,
        itemsPerPage: 6,
        category: "topsellers",
        error: false,
        errMsg: "",
        pending: false,
        load: 1,
        lastPage: false,
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
        console.log('props: ')
        console.log(this.props);

    }

    async componentDidUpdate(prevprops, prevstate) {
        if (prevstate.page !== this.state.page) {
            return this.updateCurrentPageProducts();
        } else if (this.state.load !== prevstate.load) {
            let products = await this.getProducts();
            if (products === null) {

                return this.setState({ lastPage: true });
            }
            return this.setState({ allProducts: products, page: this.state.page + 1, numberOfPages: Math.ceil(products.length / this.state.itemsPerPage) }, () => {
                this.updateCurrentPageProducts();
            });

        } else if (this.props.match.params.category !== this.state.category) {

            let products = await this.getProducts(true);
            if (products === null) {

                return this.setState({
                    error: true,
                    errMsg: 'Server is not responding please try refreshing the page or contact us at 999-999-9999',
                    pending: false,
                    category: this.props.match.params.category
                })
            }

            let numberOfPages = Math.ceil(products.length / this.state.itemsPerPage);
            this.setState({
                category: this.props.match.params.category,
                allProducts: products,
                numberOfPages,
                products: [],
                page: 1,
                error: false,
                errMsg: "",
                load: 1,
            }, () => {
                this.updateCurrentPageProducts()
            })
        }
    }

    getProducts = async (newLoad = false) => {
        const url = `/api/products/category/${this.props.match.params.category}?load=${newLoad ? '1' : this.state.load}&productsPerReq=${this.state.itemsPerPage * this.state.numberOfPages}`
        let res;
        let products;

        try {
            res = await axios.get(url)
        } catch (err) {

            return null
        }

        if (!res.data || !res.data.length) return null;

        let data = [...res.data];
        if (data.length === undefined) return this.setState({ error: true, errMsg: "server response was not proper, try to refresh the page" });


        // to avoid duplicating data;
        if (newLoad) {
            products = data;
        } else {
            products = [...this.state.allProducts, ...data];
        }
        this.fixImgPath(products);

        return products;

    }

    updateCurrentPageProducts = () => {
        let { page, itemsPerPage, allProducts } = this.state;
        let all = [...allProducts]
        let result = all.slice(((page - 1) * itemsPerPage), (itemsPerPage * page))

        this.setState({
            products: result,
            allProducts: all,
            pending: false,
            category: this.props.match.params.category,
            error: false
        });
        return result;
    }

    handlePageChange = (e) => {
        if ((e.target.id || e.target.parentNode.id) === 'next-page') {
            if (this.state.page === this.state.numberOfPages) {
                return this.setState({ load: this.state.load + 1 });
            }
            let currentPage = this.state.page + 1;
            this.setState({ page: currentPage })
        } else if ((e.target.id || e.target.parentNode.id) === 'prev-page') {
            if (this.state.page !== 1) {
                this.setState({ page: (this.state.page - 1), lastPage: false })
            }
            return
        } else {
            let id = e.target.id === "" ? e.target.parentNode.id : e.target.id;
            this.setState({ page: parseInt(id), lastPage: false });
        }

    }

    /**
     * adds '.' to path to make it relative to domain.
     * @param {array} products
     */
    fixImgPath = (products) => {

        products.forEach((product, i) => {
            if (!products[i].photo.includes('../.')) {
                product.photo = `../.${product.photo}`;
                product.secondaryPhotos.forEach(element => {
                    element.link = `../.${element.link}`;
                })
            }
        })
    }

    render() {
        let { page, products, pending, numberOfPages, lastPage, category } = this.state;


        if (!this.state.error) {
            return (
                <div className="body-section">
                    <h1 className="page-title">{
                        category === 'topsellers' ? 'TOP SELLERS'
                            : category === 'newdesigns' ? 'NEW DESIGNS'
                                : 'PRODUCTS'
                    }</h1>

                    {products.length > 0 ? (
                        <React.Fragment>
                            <div className="products">

                                {products.map((item, i) => { // makes sure data exists
                                    return (

                                        <ErrorBoundary key={i}>
                                            <ProductCard
                                                i={i}
                                                item={item}
                                            />
                                        </ErrorBoundary>
                                    )
                                })}
                            </div>
                            {/* TODO: extract this pager to a pure component to make it reusable */}
                            <Paginator
                                numberOfPages={numberOfPages}
                                page={page}
                                handlePageChange={this.handlePageChange}
                                lastPage={lastPage}
                            />
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
