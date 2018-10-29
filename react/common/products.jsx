import React, { Component } from 'react';

class Products extends Component {
    state = {
        data: [{
            id: "12395930095",
            title: "Christmas t-shirt",
            discreption: "This is a special t-shirt for Christmas season",
            photo: "imgs/christmas-1.jpg",
            price: 24.99
        }, {
            id: "123959300903059",
            title: "Funny coding t-shirt",
            discreption: "If you love coding, this is for you",
            photo: "imgs/coding-1.jpg",
            price: 19.99
        }, {
            id: "1239234425930095",
            title: "Hunting t-shirt",
            discreption: "A special t-shirt for Hunting season",
            photo: "imgs/hunting-1.jpg",
            price: 29.99
        }, {
            id: "123959334320095",
            title: "Hunting funny t-shirt",
            discreption: "A funny t-shirt for Hunting season",
            photo: "imgs/hunting-2.jpg",
            price: 14.99
        }, {
            id: "121233395930095",
            title: "Hunting t-shirt",
            discreption: "A special t-shirt for Hunting season",
            photo: "imgs/hunting-1.jpg",
            price: 29.99
        }, {
            id: "123959300433395",
            title: "Hunting funny t-shirt",
            discreption: "A funny t-shirt for Hunting season",
            photo: "imgs/hunting-2.jpg",
            price: 14.99
        }]
    }


    render() {
        return (
            <div className="body-section">
                <h1 className="page-title">TOP SELLERS</h1>
                <div className="products">
                    {this.state.data.map((item, i) => {

                        return (<div key={item.id}
                            className={`products__card card-${i}`}>
                            <div className="products__card__img-cont">
                                <img src={item.photo} alt="" className="card-img"></img>
                            </div>
                            <div className="products__card__details">
                                <h3 className="products__card__details__title">{item.title}</h3>
                                <p className="products__card__details__disc">{item.discreption}</p>
                            </div>
                            <div className="products__card__btn">
                                <p className="products__card__btn__price">${item.price}</p>
                                <a href="" className="add-btn" data-id={item.id}>add to cart</a>
                            </div>
                            <div className="flash-success">
                                <p className="flash-s-msg">Item added to cart</p>
                            </div>
                        </div>)

                    })
                    }
                </div>
            </div>
        );
    }
}

export default Products;