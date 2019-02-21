import React, { Component } from 'react';

class ProductImage extends Component {
    state = {
        photos: [],
        mainPhoto: {
            error: false,
            id: `mainPhoto`,
            currentIndex: 0,
            link: '',
            originalPhoto: '',
        },
    }

    componentDidMount() {
        let { secondaryPhotos } = this.props.product;
        let photos = []
        // debugger;
        secondaryPhotos.forEach((element, i) => {
            element.id = `${element.color}-${i}`
            element.error = false;
            photos.push(element);
        });
        let mainPhoto = {
            ...this.state.mainPhoto,
            link: this.props.activePicture,
            originalPhoto: this.props.activePicture,
        };
        this.setState({ photos, mainPhoto })
    }

    componentDidUpdate(prevProps, prevState) {
        debugger;
        if (prevState.mainPhoto.link === "") {
            let mainPhoto = JSON.parse(JSON.stringify(this.state.mainPhoto));
            mainPhoto.link = this.props.activePicture;
            mainPhoto.originalPhoto = this.props.activePicture;
            this.setState({ mainPhoto });
        } else if (this.props.activePicture !== prevProps.activePicture) {
            let { secondaryPhotos } = this.props.product;
            let photos = []

            secondaryPhotos.forEach((element, i) => {
                element.id = `${element.color}-${i}`
                element.error = false;
                photos.push(element);
            });
            this.setState({
                mainPhoto: {
                    error: false,
                    id: `mainPhoto`,
                    currentIndex: 0,
                    link: this.props.activePicture,
                    originalPhoto: this.props.activePicture,

                },
                photos
            })
        }
    }

    handleSelectPhoto = (e) => {
        let { photos } = this.state
        let mainPhoto = { ...this.state.mainPhoto };

        // first photo (currentIndex 0) in line is the main photo and thus not included in state.photos
        // thus making next index off by 1 number for photos, like this: 0 [0,1,2]. below we are mapping indexes.
        if (e.target.className.includes('next-pic')) {
            let nextIndex = 0;
            if (mainPhoto.currentIndex === 0) {
                nextIndex = 0;
                mainPhoto.currentIndex = nextIndex + 1;
            } else {
                nextIndex = mainPhoto.currentIndex;
                mainPhoto.currentIndex = nextIndex + 1;
            }
            if (photos[nextIndex] && photos[nextIndex].link !== "" && !photos[nextIndex].error) {
                mainPhoto.link = photos[nextIndex].link;
                mainPhoto.currentIndex = nextIndex + 1;
            } else {
                mainPhoto.link = mainPhoto.originalPhoto;
                mainPhoto.currentIndex = 0;
            }
        }
        if (e.target.className.includes('prev-pic')) {
            // 0  [0, 1, 2]
            let nextIndex1;
            if (mainPhoto.currentIndex === 0) {
                nextIndex1 = photos.length;
            } else {
                nextIndex1 = mainPhoto.currentIndex - 1;
            }

            if (nextIndex1 === 0) {
                mainPhoto.link = mainPhoto.originalPhoto;
                mainPhoto.currentIndex = 0;
            } else {
                if (photos[nextIndex1 - 1].color === "none") {
                    nextIndex1--
                }
                mainPhoto.link = photos[nextIndex1 - 1].link;
                mainPhoto.currentIndex = nextIndex1;
            }
        }

        if (e.target.id === 'mainPhotoIcon') {
            mainPhoto = {
                ...this.state.mainPhoto,
                link: this.state.mainPhoto.originalPhoto,
                currentIndex: 0,
            }
        } else if (e.target.className.includes('galleryPhoto')) {
            const index = parseInt(e.target.attributes.photoindex.value);
            mainPhoto = {
                ...this.state.mainPhoto,
                link: this.state.photos[index].link,
                currentIndex: index + 1,
            }
        }
        this.setState({ mainPhoto });
    }

    handleError = (e) => {
        let reload = false;
        let photos = JSON.parse(JSON.stringify(this.state.photos));
        let mainPhoto = JSON.parse(JSON.stringify(this.state.mainPhoto));
        if (e.target.id === 'mainPhoto') {
            mainPhoto.error = true;
            reload = true;
        } else {
            let parentId = e.target.parentElement.id;
            photos.forEach((element, i) => {
                if (element.id === parentId && !element.error) {
                    element.error = true;
                    reload = true;
                }
            })
        }
        if (reload) {
            this.setState({ photos, mainPhoto });
        }
    }

    render() {
        let { photos, mainPhoto } = this.state;

        return (<div className='photoSection' >
            <div className='photoContainer' >
                {!mainPhoto.error ? (<img
                    id='mainPhoto'
                    src={`/${mainPhoto.link}`}
                    onError={this.handleError}
                    className='photo'
                    alt=""
                />) : (
                        <div className={'photo-error'}><p>Not available</p></div>
                    )}
            </div>
            <div className='gallerySection' >
                <div>
                    <i className="fa fa-angle-left prev-pic" aria-hidden="true" onClick={this.handleSelectPhoto}></i>
                </div>
                <div className='galleryContainer' >
                    <div className={mainPhoto.error ? 'imgContainer hide' : 'imgContainer'} id='mainPhotoIcon' >
                        <img
                            id='mainPhotoIcon'
                            onClick={this.handleSelectPhoto}
                            src={`/${this.state.mainPhoto.originalPhoto}`}
                            onError={this.handleError}
                            className='galleryPhoto'
                            alt=""
                        />
                    </div>
                    {photos.length !== 0 ? photos.map((photo, i) => {
                        if (photo.color !== 'none') {
                            return (<div className={photo.error ? 'imgContainer hide' : 'imgContainer'} id={photo.id} key={i} >
                                <img
                                    className='galleryPhoto'
                                    src={`/${photo.link}`}
                                    photoindex={i}
                                    onClick={this.handleSelectPhoto}
                                    alt='product'
                                    onError={this.handleError}
                                />
                            </div>)
                        }
                    })
                        : null}
                </div>
                <div>
                    <i className="fa fa-angle-right next-pic" aria-hidden="true" onClick={this.handleSelectPhoto}></i>
                </div>
            </div>
        </div>)

    }
}


export default ProductImage;