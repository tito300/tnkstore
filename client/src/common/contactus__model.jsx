import React from 'react';

export default ({ show, handleClick }) => {
    return (
        <div className="model contact-us" style={show && show === 'true' ? { display: 'flex' } : { display: 'none' }}>

            <div className="model__box">
                <span className="x" onClick={handleClick}>X</span>
                <div className="model__box__text-area">
                    <p className="title">Contact us</p>
                    <form className="text-area__box-form" action="">

                        <textarea placeholder=" Enter Email.."></textarea>
                        <button className="flexible-btn btn-2">Send</button>
                    </form>


                </div>
                <div className="model__box__img img-1"></div>

            </div>
        </div>
    )
}