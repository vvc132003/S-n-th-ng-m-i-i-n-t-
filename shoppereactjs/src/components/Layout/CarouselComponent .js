import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../../CustomerHeader.scss';

const CarouselComponent = () => {
    return (
        <div className="py-4">
            <div className="header-container">
                <div className="row gx-1">
                    <div className="col-8" style={{ paddingRight: '-0.75rem !important' }}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block" style={{ width: '100%', height: '250px' }}
                                    src="https://cf.shopee.vn/file/sg-11134258-7rdwu-lz5r96s7z6nobd_xxhdpi"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block" style={{ width: '100%', height: '250px' }}
                                    src="https://cf.shopee.vn/file/sg-11134258-7rdxx-lz5r98z0ruwcf7_xxhdpi"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block" style={{ width: '100%', height: '250px' }}
                                    src="https://cf.shopee.vn/file/sg-11134258-7rdwt-lz5un80x008807_xxhdpi"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="col-4">
                        <img
                            className="img-fluid mb-1 custom-side-img" style={{ width: '100%', height: '123px' }}
                            src="https://cf.shopee.vn/file/sg-11134258-7rdxz-lz5unbfa55ae13_xhdpi"
                            alt="Side Image 1"
                        />
                        <img
                            className="img-fluid custom-side-img" style={{ width: '100%', height: '123px' }}
                            src="https://cf.shopee.vn/file/sg-11134258-7rdy2-lz77cn7jv3a2ec_xhdpi"
                            alt="Side Image 2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselComponent;
