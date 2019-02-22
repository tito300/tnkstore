import React, { Component } from 'react';
import ContactUsModel from '../common/contactus__model';


class ImageSection extends Component {
    state = {
        contact: false,
    }

    handleContactClick = () => {
        this.setState({ contact: true })
    }
    handleCloseClick = () => {
        this.setState({ contact: false })
    }
    render() {
        const { contact } = this.state;
        return (
            <>
                <div className="part2__img img"></div>
                <div className="part2__text-content">
                    <h2>In Style Aisle</h2>
                    <p className="part2__text-content__disc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus pariatur
                            provident adipisci laborum quisquam reprehenderit fugit soluta maxime in ut <br />
                        amet quas laudantium eum nulla quis dolorem, rem, temporibus fugiat, eos facilis eligendi atque assumenda
                        et. Voluptatem, quod explicabo? Sapiente corrupti nisi nihil excepturi accusamus deserunt explicabo
                            consequatur dolore! Provident!</p>

                    <button className="large-btn" onClick={this.handleContactClick}>Discover</button>
                </div>
                <ContactUsModel show={contact ? 'true' : null} handleClick={this.handleCloseClick} />
            </>
        )
    }
}

export default ImageSection;