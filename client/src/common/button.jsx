import React from 'react';
import { Link } from 'react-router-dom'

export default ({ to, id, text }) => {
    return (
        <Link to={to} className="add-btn" data-id={id}>{text}</Link>
    )
}