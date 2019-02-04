import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Paginator extends Component {


    getPagingElements = () => {
        let { page, handlePageChange, lastPage, numberOfPages } = this.props;
        let result = [];
        result.push(
            <li id='prev-page' className={page > 1 ? 'pager-li arrow-active' : 'pager-li'} onClick={handlePageChange}>
                <Link to="#">{`<`}</Link>
            </li>)
        let start = page <= 4 ? 1 : (page - 3);
        let end = numberOfPages < 4 ? numberOfPages : (start + 3);
        for (let i = start; i <= end; i++) {
            let class1 = page === i ? "pager-li active" : "pager-li"
            let num = i.toString();
            result.push(
                <li id={num} key={num} className={class1} onClick={handlePageChange}>
                    <Link to="#">{num}</Link>
                </li>)
        }
        result.push(
            <li id='next-page' className={lastPage ? 'pager-li' : 'pager-li arrow-active'} onClick={lastPage ? null : handlePageChange}>
                <Link to="#">{`>`}</Link>
            </li>)
        return result;
    }

    render() {
        return (
            <div className="pager-container">
                <ul className="pager-ul">
                    {this.getPagingElements()}
                </ul>
            </div>
        );
    }
}

export default Paginator;