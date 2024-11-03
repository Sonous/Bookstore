import classNames from 'classnames/bind';
import { useRef, useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './BannerSlider.module.css';
import { request } from '~/config';
import { imageUrl } from '~/config/axios.config';

const cx = classNames.bind(styles);

function BannerSlider() {
    const [banners, setBanners] = useState([]);

    const sliderRef = useRef();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await request.get('/banner');

                setBanners(result);
            } catch (error) {
                throw new Error(error.message);
            }
        };

        fetchApi();
    }, []);

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
                            <img src={`${imageUrl}/${banner.banner_image_url}`} alt={`${banner.banner_image_url}`} />
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
