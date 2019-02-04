import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './productCard';
import propTypes from 'prop-types';
import ErrorBoundary from './errorBoundaries/productsCardError'
import Paginator from '../common/paginator';
import Filters from './productFilters';

export class Products extends Component {
    constructor(props) {
        super(props)
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            currentPageProducts: [],
            allProducts: [],
            filteredProducts: [],
            filterInUse: false,
            page: 1,
            numberOfPages: 4,
            itemsPerPage: 6,
            category: "topsellers",
            error: false,
            errMsg: "",
            pending: false,
            load: 1,
            lastPage: false,
            filters: {
                type: null,
                color: null,
            }
        }
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

    async componentDidUpdate(prevprops, prevstate) {
        if (prevstate.page !== this.state.page) {
            debugger;
            return this.updateCurrentPageProducts();
        } else if (this.state.load !== prevstate.load) {
            return this.getAndPopulateNewLoad()
        } else if (this.props.match.params.category !== this.state.category) {
            this.getAndPopulateNewLoad({ newCategory: true });
        } else if ((this.state.filteredProducts.length !== prevstate.filteredProducts.length) || this.state.newCategory) {
            this.updateCurrentPageProducts();
        }
    }

    getAndPopulateNewLoad = async ({ newCategory, setState } = { newCategory: false, setState: true }) => {
        if (newCategory) {
            debugger;
            let products = await this.getProducts({ newLoad: true });
            if (products === null) {

                return this.setState({
                    error: true,
                    errMsg: 'Server is not responding please try refreshing the page or contact us at 999-999-9999',
                    pending: false,
                    category: this.props.match.params.category
                })
            }
            let numberOfPages = Math.ceil(products.length / this.state.itemsPerPage);
            return this.setState({
                newCategory: true,
                category: this.props.match.params.category,
                allProducts: products,
                numberOfPages,
                currentPageProducts: [],
                page: 1,
                error: false,
                errMsg: "",
                load: 1,
                filters: {},
                filterInUse: false,
            }, () => {
                this.updateCurrentPageProducts()
            })
        }

        let products = await this.getProducts({ newLoad: false });

        if (!setState) return products;
        if (products === null) {
            return this.setState({ lastPage: true });
        }
        return this.setState({
            newCategory: false,
            allProducts: products,
            page: this.state.page + 1,
            numberOfPages: Math.ceil(products.length / this.state.itemsPerPage)
        }, () => {
            this.updateCurrentPageProducts();
        });
    }

    getProducts = async ({ newLoad } = { newLoad: false }) => {

        const url = `/api/products/category/${this.props.match.params.category}?load=${newLoad ? '1' : this.state.load}&productsPerReq=${newLoad ? '24' : (this.state.itemsPerPage * 4)}`
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
            products = [...data];
        } else {
            products = [...this.state.allProducts, ...data];
        }
        this.fixImgPath(products);
        return products;
    }

    // the only method that should update currentPageProducts
    updateCurrentPageProducts = () => {
        const { page, itemsPerPage, allProducts, filteredProducts, filterInUse } = this.state;
        let all;
        if (filterInUse) {
            let filteredAllProducts = this.filterProducts(filteredProducts);
            all = [...filteredAllProducts];

            // TODO: fetch more products if products don't fill page
            if (all.length === 0) {
                all = this.getAndPopulateNewLoad({ setState: false });
                if (all && !all.length) {
                    this.setState({
                        lastPage: true,
                    })
                }
            }
        } else {
            all = [...allProducts]
        }
        let result = all.slice(((page - 1) * itemsPerPage), (itemsPerPage * page))

        this.setState({
            newCategory: false,
            currentPageProducts: result,
            allProducts: (filterInUse ? allProducts : all),
            pending: false,
            category: this.props.match.params.category,
            error: false,
            numberOfPages: Math.ceil(all.length / itemsPerPage),
            lastPage: (result.length < itemsPerPage ? true : false),
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

    handleInputChange = (e) => {
        if (e.target.name === "type") {
            this.filterByType(e.target.value)
        }
    }

    filterProducts = (products) => {

        let filters = { ...this.state.filters };
        let resultProducts = [...products];

        for (let filter in filters) {
            if (filter === 'type') {
                resultProducts = this.filterByType(filters.type, { setState: false });
            }
        }

        return resultProducts;
    }

    filterByType = (value, { setState } = { setState: true }) => {
        let { allProducts } = this.state;
        let filteredProducts = allProducts.filter(product => product.type === value);

        if (!setState) return filteredProducts;
        this.setState({
            filteredProducts,
            filterInUse: true,
            filters: {
                type: value,
            },
            page: 1,
        })
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

    getPageTitle = () => {
        let title = '';
        switch (this.state.category) {
            case 'topsellers':
                title = 'TOP SELLERS'
                break
            case 'newdesigns':
                title = 'NEW DESIGNS'
                break
            case 'tshirts':
                title = 'T-SHIRTS'
                break
            case 'children':
                title = 'CHILDREN'
                break
            default: return 'PRODUCTS'
        }
        return title;
    }

    render() {
        let { page, currentPageProducts, pending, numberOfPages, lastPage, category } = this.state;


        if (!this.state.error) {
            return (
                <div className="body-section">
                    <h1 className="page-title">{this.getPageTitle()}</h1>

                    {currentPageProducts.length > 0 ? (
                        <React.Fragment>
                            <Filters handleInputChange={this.handleInputChange} />

                            <div className="products">

                                {currentPageProducts.map((item, i) => { // makes sure data exists
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
                        : (currentPageProducts.length === 0) && !pending ? <p className='text-error'>Sorry, there is no more products to show</p>
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
        loggedin: state.active,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateProducts: (products) => { dispatch({ type: 'POPULATE_PRODUCTS', products: products }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
