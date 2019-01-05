import React, { Component } from 'react';

const ProductImage = ({ product, activePicture, handleSelectPhoto }) => {
    return (<div className='photoSection' >
        <div className='photoContainer' >
            <img src={`/${activePicture}`} className='photo' alt="" />
        </div>
        <div className='gallerySection' >
            <div>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
            </div>
            <div className='galleryContainer' >
                {product.secondaryPhotos.length !== 0 ? product.secondaryPhotos.map((photo, i) => {
                    return (<div className='imgContainer' key={i} >
                        <img className='galleryPhoto' src={`/${photo}`} photoindex={i} onClick={handleSelectPhoto} alt='product' />
                    </div>)
                })
                    : (<div className='imgContainer' >
                        <img className='galleryPhoto' src={`/${activePicture}`} alt='product' />
                    </div>)}
            </div>
            <div>
                <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
    </div>);
}

export default ProductImage;