import React from 'react';

const DisplaySimilarProducts = ({ product }) => {
    return (
        <>
            <p className='similarItems'>Similar Products</p>
            <div className='bottomGallery'>
                <div>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className="bottomPhotosGallery">
                    <div className="bottomItem">
                        <img className='galleryPhoto' src={`/${product.photo}`} />
                    </div>
                    <div className="bottomItem">
                        <img className='galleryPhoto' src={`/${product.photo}`} />
                    </div>
                    <div className="bottomItem">
                        <img className='galleryPhoto' src={`/${product.photo}`} />
                    </div>
                    <div className="bottomItem">
                        <img className='galleryPhoto' src={`/${product.photo}`} />
                    </div>
                    <div className="bottomItem">
                        <img className='galleryPhoto' src={`/${product.photo}`} />
                    </div>
                </div>
                <div>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>
            </div>
        </>
    )
}

export default DisplaySimilarProducts;