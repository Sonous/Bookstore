import classNames from 'classnames/bind';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { convertPriceToString } from '~/utils/functions';
import { Rate } from 'antd';
import { memo } from 'react';
import { imageUrl } from '~/config/axios.config';

const cx = classNames.bind(styles);

function Book({
    enable = true,
    bookimages,
    book_name,
    book_cost,
    book_discount,
    book_end_cost,
    book_star_rating,
    book_status,
    quantity = 0,
    cart = false,
    home = false,
    collection = false,
}) {
    return (
        <li
            className={cx('book', {
                home,
                collection,
            })}
        >
            <Link to={enable ? `/books/${book_name}` : null}>
                <img src={`${imageUrl}/${bookimages[0].book_image_url}`} alt={book_name} className={cx('image')} />
            </Link>
            <div className={cx('info')}>
                <Link to={enable ? `/books/${book_name}` : null}>
                    <span className={cx('title')}>{book_name}</span>
                </Link>
                <div>
                    <span className={cx('current-price')}>{convertPriceToString(book_end_cost)}</span>
                    <span className="text-xs ml-3 line-through opacity-80">{convertPriceToString(book_cost)}</span>
                    {cart && <span className={cx('quantity')}>x{quantity}</span>}
                </div>
                {collection && <Rate className={cx('rate')} disabled value={book_star_rating} />}
            </div>
        </li>
    );
}

export default memo(Book);
