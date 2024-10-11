import classNames from 'classnames/bind';
import { Carousel } from 'antd';

import styles from './BookCollection.module.css';
import { searchResult } from '~/dataTemorary';
import Book from '../Book/Book';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookCollection({ topic }) {
    const [enable, setEnable] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const sildes = windowWidth <= 500 ? 2 : windowWidth <= 850 ? 3 : windowWidth <= 1024 ? 4 : 5;

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    return (
        <section className={cx('container')}>
            <span className={cx('topic')}>{topic}</span>
            <div className={cx('wrapper')}>
                <Carousel
                    dots={false}
                    draggable
                    slidesToShow={sildes}
                    slidesToScroll={sildes - 1}
                    infinite={false}
                    beforeChange={() => setEnable(false)}
                    afterChange={() => setEnable(true)}
                >
                    {searchResult.map((book, index) => {
                        return <Book key={index} collection enable={enable} {...book} />;
                    })}
                </Carousel>
            </div>
            <div className={cx('more')}>
                <span className={cx('more-btn')}>Xem thêm &gt;&gt;</span>
            </div>
        </section>
    );
}

export default BookCollection;
