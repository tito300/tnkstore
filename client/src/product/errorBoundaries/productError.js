import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
        this.setState({error: true});
    }

    render() {
        if(this.state.error) {
            return(
                <div className="product-list__Error">
                    <p>
                    Sorry! Something Went wrong, please try to refresh the page or contact us.
                    </p>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;