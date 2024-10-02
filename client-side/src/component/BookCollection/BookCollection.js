import classNames from 'classnames/bind';
import { Carousel } from 'antd';

import styles from './BookCollection.module.css';
import { searchResult } from '~/dataTemorary';
import Book from '../Book/Book';
import { useState } from 'react';

const cx = classNames.bind(styles);

function BookCollection({ topic }) {
    const [enable, setEnable] = useState(true);

    return (
        <section className={cx('container')}>
            <span className={cx('topic')}>{topic}</span>
            <div className={cx('wrapper')}>
                <Carousel
                    dots={false}
                    draggable
                    slidesToShow={5}
                    slidesToScroll={4}
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
