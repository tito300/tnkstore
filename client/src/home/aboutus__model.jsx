import React from 'react';

export default () => {
    return (
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
    )
}