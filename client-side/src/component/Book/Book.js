import classNames from 'classnames/bind';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { convertPriceToString } from '~/utils/functions';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Book({
    enable = true,
    image,
    title,
    currentPrice,
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
            <Link to={enable ? `/books/${title}` : null}>
                <img src={images[image]} alt={title} className={cx('image')} />
            </Link>
            <div className={cx('info')}>
                <Link to={enable ? `/books/${title}` : null}>
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
