import classNames from 'classnames/bind';
import { Carousel } from 'antd';

import styles from './BookCollection.module.css';
import Book from '../Book/Book';
import { useEffect, useState } from 'react';
import { request } from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookCollection({ topic = '' }) {
    const [books, setBooks] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = () => {
            request
                .get(`/book`, {
                    params: {
                        category: topic,
                        type: topic === 'Sách mới' || topic === 'Sách bán chạy' ? topic : 'category',
                        limit: 10,
                    },
                })
                .then((res) => setBooks(res))
                .catch((err) => console.log(err.message));
        };
        fetchApi();
    }, []);

    const sildes = windowWidth <= 500 ? 2 : windowWidth <= 850 ? 3 : windowWidth <= 1024 ? 4 : 5;

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    return (
        <section className={cx('container')}>
            <span className={cx('topic')}>{topic}</span>
            <div className={cx('wrapper')}>
                <Carousel dots={false} draggable slidesToShow={sildes} slidesToScroll={sildes - 1} infinite={false}>
                    {books.map((book, index) => {
                        return <Book key={index} collection {...book} />;
                    })}
                </Carousel>
            </div>
            <div className={cx('more')}>
                <span className={cx('more-btn')} onClick={() => navigate(`/collections/${topic}`)}>
                    Xem thêm &gt;&gt;
                </span>
            </div>
        </section>
    );
}

export default BookCollection;
