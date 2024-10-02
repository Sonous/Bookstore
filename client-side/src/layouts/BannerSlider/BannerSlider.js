import classNames from 'classnames/bind';
import { useRef, useEffect, useState } from 'react';
import { Carousel } from 'antd';
// import mapper from 'object-mapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './BannerSlider.module.css';
import images from '~/assets/images';
import { bannersSlider } from '~/dataTemorary';
// import callApi from '~/apis';

const cx = classNames.bind(styles);

// const map = {
//     banner_id: 'bannerId',
//     banner_image_name: 'bannerImageName',
//     book_name: 'book_name',
// };

function BannerSlider() {
    const [banners, setBanners] = useState(bannersSlider);

    const sliderRef = useRef();

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await callApi.getBanners();

    //         setBanners(result.map((banner) => mapper(banner, map)));
    //     };

    //     fetchApi();
    // }, []);

    const Arrows = ({ arrowLeft, arrowRight, handlePrevSlide, handleNextSlide }) => {
        return (
            <span
                className={cx({
                    arrowLeft,
                    arrowRight,
                })}
                onClick={arrowRight ? handleNextSlide : handlePrevSlide}
            >
                <FontAwesomeIcon icon={arrowRight ? faChevronRight : faChevronLeft} />
            </span>
        );
    };

    const handlePrevSlide = () => {
        sliderRef.current.prev();
    };

    const handleNextSlide = () => {
        sliderRef.current.next();
    };

    return (
        <div className={cx('container')}>
            <Carousel autoplay autoplaySpeed={2000} draggable ref={sliderRef}>
                {banners.map((banner, index) => {
                    return (
                        <div key={index} className={cx('banner-wrapper')}>
                            <img src={images[banner.title]} alt="banner" />
                        </div>
                    );
                })}
            </Carousel>
            <Arrows arrowLeft handlePrevSlide={handlePrevSlide} />
            <Arrows arrowRight handleNextSlide={handleNextSlide} />
        </div>
    );
}

export default BannerSlider;
