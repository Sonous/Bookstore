import classNames from 'classnames/bind';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { convertPriceToString, convertToSlug } from '~/utils/functions';

const cx = classNames.bind(styles);

function Book({ image, title, currentPrice, quantity = 0, cart = false, home = false }) {
    return (
        <li className={cx('book', {
            home
        })}>
            <Link to={`/books/${convertToSlug(title)}`}>
                <img src={image} alt={title} className={cx('image')} />
            </Link>
            <div className={cx('info')}>
                <Link to={`/books/${convertToSlug(title)}`}>
                    <span className={cx('title')}>{title}</span>
                </Link>
                <div>
                    <span className={cx('current-price')}>{convertPriceToString(currentPrice)} </span>
                    {cart && <span className={cx('quantity')}>x{quantity}</span>}
                </div>
            </div>
        </li>
    );
}

export default Book;
