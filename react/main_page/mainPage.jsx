import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookie from 'js-cookie'
import jwtDecoded from 'jwt-decode'



class MainPage extends Component {

    componentDidMount() {
        /* 
         * js file is required here because it requires some element to be mounted to
         * function properly
         *  */
        delete require.cache[require.resolve('../../public/index')]
        require('../../public/index');

        let jwt = Cookie.get('jwt');
        if (this.props.location.state && this.props.location.state.from === '/login') {
            console.log('FIRED: componentDidMount in mainPage');
            axios(`/api/users/cart/updateCart?login=true`, {
                method: 'post',
                /* token is set in cookies and will be sent automatically */
                // headers: { Authorization: `bearer ${localStorage.getItem('jwt')}` },
                data: {
                    items: this.props.cartItems,
                }
            })
                .then((res) => {
                    if (res.data instanceof Array) {

                        this.props.populateCartItems(res.data);
                    }
                });
        } else if (!this.props.loggedin && jwt) {
            localStorage.setItem('jwt', jwt);
            this.props.login(jwt);
        }
    }
    render() {
        return (
            <React.Fragment>

                <div className="body-section section tnk" id="0">
                    <div className="part1">
                        <div className="text-animate">
                            <span>T</span>
                            <span>n</span>
                            <span id="k">K</span>
                            <span>Q</span>
                            <span>u</span>
                            <span>a</span>
                            <span>l</span>
                            <span>i</span>
                            <span>t</span>
                            <span>y</span>
                        </div>

                        <p className="meta">Where You Can Buy Quality.</p>

                        <div className="model" style={{ display: 'none' }}>

                            <div className="model__box">
                                <span className="x">X</span>
                                <div className="model__box__text-area">
                                    <p className="title">GROW WITH US</p>
                                    <p className="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatibus atque
                                        debitis aut amet excepturi fugit vero recusandae veniam, nihil reprehenderit et ea impedit quaerat
                                        assumenda sapiente. Alias veritatis aut labore iusto reiciendis. Placeat fugiat, illum temporibus
                                        consectetur corrupti harum unde mollitia quidem adipisci dolor laudantium sunt eaque aspernatur
                    accusamus.</p>
                                    <form className="text-area__box-form" action="">

                                        <input placeholder=" Enter Email.." type="email"></input>
                                        <button className="flexible-btn btn-2">SUBSRIBE</button>

                                    </form>


                                </div>
                                <div className="model__box__img img-1"></div>

                            </div>
                        </div>

                        <div className="model contact-us" style={{ display: 'none' }}>

                            <div className="model__box">
                                <span className="x">X</span>
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




                    </div>

                    <img className="arrow next" src="/imgs/Arrow-2.png" alt="" style={{ display: 'block' }}></img>
                    <span className="scroll" style={{ display: 'block' }}>SCROLL</span>
                </div>



                <div className="part2 section" id="1">
                    <div className="part2__img img"></div>
                    <div className="part2__text-content">
                        <h2>In Style Aisle</h2>
                        <p className="part2__text-content__disc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus pariatur
            provident adipisci laborum quisquam reprehenderit fugit soluta maxime in ut <br />
                            amet quas laudantium eum nulla quis dolorem, rem, temporibus fugiat, eos facilis eligendi atque assumenda
                            et. Voluptatem, quod explicabo? Sapiente corrupti nisi nihil excepturi accusamus deserunt explicabo
            consequatur dolore! Provident!</p>

                        <button className="large-btn">Discover</button>
                    </div>
                </div>
                <div className="section" id="2">
                    <div className="part3" id="">
                        <div className="part3__cards-wrapper">
                            <a href="/top-sellers">
                                <div className="simple-product-card block-1">
                                    <div className="simple-product-card__img img-1"></div>
                                    <div className="simple-product-card__text">
                                        <h3 className="simple-product-card__text__title">Best Sellers</h3>
                                        <p className="simple-product-card__text__disc">Do you want to know what others are buying? click
                            here</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div className="simple-product-card block-2">
                                    <div className="simple-product-card__img img-2"></div>
                                    <div className="simple-product-card__text">
                                        <h3 className="simple-product-card__text__title">Hot Topic</h3>
                                        <p className="simple-product-card__text__disc">Here you can find trending subjects.</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div className="simple-product-card block-3">
                                    <div className="simple-product-card__img img-3"></div>
                                    <div className="simple-product-card__text">
                                        <h3 className="simple-product-card__text__title">Our favorites</h3>
                                        <p className="simple-product-card__text__disc">This is our personal favorites.</p>
                                    </div>
                                </div>
                            </a>
                        </div>


                        <div className="wide-note-section">
                            <div className="wide-note-section__wrapper">
                                <h4 className="title">Did you know?</h4>
                                <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae odit
                                    necessitatibus esse saepe laboriosam voluptas aperiam. Perferendis laudantium illo dicta voluptas
                                    dolorum, ut enim labore esse temporibus praesentium aliquam minus neque facilis nulla quisquam
                                    accusantium delectus culpa doloribus et sint architecto magnam nostrum quas ducimus? Repudiandae
                                    dolor, reprehenderit, totam nihil at consectetur temporibus aliquid consequuntur non aliquam
                                    asperiores explicabo vitae suscipit, voluptas voluptatibus numquam qui magni eius! Facilis, tempora
                    perferendis?</p>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.user.active,
        cartItems: state.cart.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateCartItems: (items) => {
            dispatch({ type: 'POPULATE_CARTITEMS', data: items });
        },
        login: (jwt) => {
            const payload = jwtDecoded(jwt);
            dispatch({ type: 'LOGIN', payload });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);