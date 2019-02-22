import React, {Component} from 'react';
import axios from 'axios';

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(error, info) {
        axios.post('/error', {
            error_message: error.message,
            error_stack: error.stack,
            info,
        })
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