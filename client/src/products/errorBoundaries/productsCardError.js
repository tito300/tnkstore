import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    css = {
        imgError: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'grey',
            fontFamily: 'futura',
            fontSize: '22px'
        }
    }

    componentDidCatch(error, info) {
        this.setState({error: true});
    }


    render() {
        if(this.state.error) {
            return(
                <div
                className={`products__card`}>
                <div onClick={this.handleProductClick} className="products__card__img-cont" style={this.css.imgError}>
                    <p>Not available</p>
                </div>
                <div className="products__card__details">
                    <h3  className="products__card__details__title">Oops!</h3>
                    <p className="products__card__details__disc">Something went wrong here. Try to refresh the page</p>
                </div>
                <div className="products__card__btn">
                    
                </div>
            </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;