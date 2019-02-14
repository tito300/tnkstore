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
            errorLevel: 0, // 0 = ok; 1 = minor (e.g. 404); 2 = refresh needed (e.g. 500);
            errMsg: "",
            pending: false,
            lastPage: false,
            lastUsedFilter: null,
            filters: {
                gender: null,
                type: null,
                color: null,
                brand: null,
            },
        }
        this.faSpinner = {
            width: 'fit-content',
            margin: '50px auto 150px auto',
            color: 'gray',
            minHeight: '900px' // TODO: make this dynamic
        }
        this.cleanFiltersState = {
            type: null,
            color: null,
            brand: null,
            gender: null,
        }

        this.ProductsComp = React.createRef();
    }

    static propTypes = {
        data: propTypes.array,
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({ pending: true }, async () => {
            await this.getProducts();
        });
    }

    async componentDidUpdate(prevprops, prevstate) {
        if ((prevstate.pending !== this.state.pending) && this.state.pending === true) {
            if (prevstate.lastUsedFilter !== this.state.lastUsedFilter) {
                return this.getProducts({ filterChanged: true })
            }
            return this.getProducts();
        } else if (this.props.match.params.category !== this.state.category) {
            if (this.state.error) {
                return
            }
            window.scrollTo(0, 0)
            this.getProducts({ newCategory: true });
        }
    }

    getProducts = async ({ newCategory, filterChanged } = { newCategory: false, filterChanged: false }) => {

        let { page, itemsPerPage, filters, category } = this.state;
        let requestedPage = newCategory || filterChanged ? 1 : page;
        let type = filters.type ? `&type=${encodeURIComponent(filters.type)}` : '';
        let brand = filters.brand ? `&brand=${encodeURIComponent(filters.brand)}` : '';
        let color = filters.color ? `&color=${encodeURIComponent(filters.color)}` : '';
        let gender = filters.gender ? `&gender=${encodeURIComponent(filters.gender)}` : '';

        let url;

        if (newCategory) {
            url = `/api/products/category/${this.props.match.params.category}?page=${requestedPage}&productsPerReq=${itemsPerPage}`
        } else {
            url = `/api/products/category/${this.props.match.params.category}?page=${requestedPage}&productsPerReq=${itemsPerPage}${type}${brand}${color}${gender}`
        }
        let res;
        let products;

        try {
            res = await axios.get(encodeURI(url))
        } catch (err) {
            res = null;
        }
        if (!res.data.products || res.data.products.length === undefined) {
            return this.setState({
                error: true,
                errMsg: 'Server is not responding correctly, please try refreshing the page or contact us at 999-999-9999',
                pending: false,
                filters: this.cleanFiltersState
            })
        };

        products = [...res.data.products];

        if (products.length === 0) {
            return this.setState({
                error: true,
                errMsg: 'Sorry, No items available for this option. Try to adjust your filters',
                pending: false,
                errorLevel: 1,
            })
        }

        let pagesAvailable = Math.ceil(res.data.count / itemsPerPage);
        this.fixImgPath(products);
        this.setState({
            currentPageProducts: products,
            page: requestedPage,
            error: false,
            errMsg: "",
            pending: false,
            lastPage: pagesAvailable <= page ? true : false,
            numberOfPages: pagesAvailable <= 4 ? pagesAvailable : 4,
            category: newCategory ? this.props.match.params.category : category,
            filters: newCategory ? this.cleanFiltersState : filters,
        });
    }

    handlePageChange = (e) => {
        if ((e.target.id || e.target.parentNode.id) === 'next-page') {
            let currentPage = this.state.page + 1;
            this.setState({ page: currentPage, pending: true })
        } else if ((e.target.id || e.target.parentNode.id) === 'prev-page') {
            if (this.state.page !== 1) {
                this.setState({ page: (this.state.page - 1), lastPage: false, pending: true });
            }
            return
        } else {
            let id = e.target.id === "" ? e.target.parentNode.id : e.target.id;
            this.setState({ page: parseInt(id), lastPage: false, pending: true });
        }

    }

    handleFilterChange = (e) => {
        let { filters } = this.state;

        if (e.target.name === "type") {
            return this.setState({
                filters: {
                    type: e.target.value !== "all" ? e.target.value : null,
                    brand: typeof filters.brand === 'string' ? filters.brand : null,
                    color: typeof filters.color === 'string' ? filters.color : null,
                    gender: typeof filters.gender === 'string' ? filters.gender : null,
                },
                pending: true,
                lastUsedFilter: e.target.value,
            })
        } else if (e.target.name === "brand") {
            return this.setState({
                filters: {
                    brand: e.target.value !== "none" ? e.target.value : null,
                    type: typeof filters.type === 'string' ? filters.type : null,
                    color: typeof filters.color === 'string' ? filters.color : null,
                    gender: typeof filters.gender === 'string' ? filters.gender : null,
                },
                pending: true,
                lastUsedFilter: e.target.value,
            })
        } else if (e.target.name === "color") {
            return this.setState({
                filters: {
                    color: e.target.value !== "none" ? e.target.value : null,
                    type: typeof filters.type === 'string' ? filters.type : null,
                    brand: typeof filters.brand === 'string' ? filters.brand : null,
                    gender: typeof filters.gender === 'string' ? filters.gender : null,
                },
                pending: true,
                lastUsedFilter: e.target.value,
            })
        } else if (e.target.name === "gender") {
            return this.setState({
                filters: {
                    gender: e.target.value !== "none" ? e.target.value : null,
                    type: typeof filters.type === 'string' ? filters.type : null,
                    brand: typeof filters.brand === 'string' ? filters.brand : null,
                    color: typeof filters.color === 'string' ? filters.color : null,
                },
                pending: true,
                lastUsedFilter: e.target.value,
            })
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
            case 'holidays':
                title = 'HOLIDAYS'
                break
            case 'animals':
                title = 'ANIMALS'
                break
            default: return 'PRODUCTS'
        }
        return title;
    }

    render() {
        let { page, currentPageProducts, pending, numberOfPages, lastPage, filters, error } = this.state;

        return (
            <div className="body-section" ref={this.ProductsComp}>
                <h1 className="page-title">{this.getPageTitle()}</h1>
                <div className="products-container">
                    <Filters
                        handleFilterChange={this.handleFilterChange}
                        filters={filters}
                    />
                    <div className="products-section">
                        <div className="products">
                            {!pending && !error ?

                                currentPageProducts.map((item, i) => { // makes sure data exists
                                    return (
                                        <ErrorBoundary key={i}>
                                            <ProductCard
                                                i={i}
                                                item={item}
                                            />
                                        </ErrorBoundary>
                                    )
                                })
                                : pending && !error ? (
                                    <div id="fa-spinner__container">
                                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                    </div>
                                ) : (
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
                        </div>

                        {/* TODO: extract this pager to a pure component to make it reusable */}
                        <Paginator
                            numberOfPages={numberOfPages}
                            page={page}
                            handlePageChange={this.handlePageChange}
                            lastPage={lastPage}
                        />
                    </div>
                </div>

            </div>
        );
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
