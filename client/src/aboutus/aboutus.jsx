import React from 'react';
import { connect } from 'tls';

const Aboutus = () => {
    return (
        <div className='body-section'>
            <div className="aboutus">
                <div className="aboutus__info">
                    <h1 className="aboutus__title">About us</h1>
                    <p className="aboutus__text">Hi there, As you might have already noticed, this version of the store is for presentational purposes only. My name is Tarek Demachkie and I am a fullstack nodejs and react web developer. This store was built from the ground up using Nodejs-express for the server, Mongodb for the database and React for the frontend.</p>
                    <p className="aboutus__text">I'm effiecient at javascript programing and enjoy its dual paradigm nature-- functional and protoypal. When possible I tend to prefer functional for predictability and better testing.</p>
                    <p className="aboutus__text">I also enjoy building servers using nodejs for a couple reasons. First, I prefer coding in one language on both sides for effiency and secondly I think Nodejs is great at handling IO intensive applications due to its single threaded nonblocking asynchronous nature.</p>
                    <p className="aboutus__text">Sass was used to construct css files and the smacss methodology was implied on most files</p>
                    <p className="aboutus__text">To view the source code for this app please check <a href="https://github.com/tito300/Elegant-T-K-FullStack">this github repository</a></p>
                </div>
                <div className="connect">
                    <h2 className="aboutus__title">Connect</h2>
                    <div className="icons">
                        <a href="https://www.facebook.com/Tarek.demachkie1">
                            <div className="icon facebook" href="#"></div>
                        </a>
                        <a href="https://www.linkedin.com/in/tarek-demachkie-b0693a107/">
                            <div className="icon linkedin" href="#"></div>
                        </a>
                        <a href="https://github.com/tito300">
                            <div className="icon github" href="#"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus;