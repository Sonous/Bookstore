import classNames from 'classnames/bind';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { convertPriceToString } from '~/utils/functions';
import { Rate } from 'antd';
import { memo, useState, useContext, useEffect } from 'react';
import { imageUrl } from '~/config/axios.config';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { UserContext } from '~/context/UserContextProvider';

import favoriteApi from '~/apis/favoriteApi.js';

const cx = classNames.bind(styles);

function Book({
    enable = true,
    bookimages,
    book_id,
    book_name,
    book_cost,
    book_discount,
    book_end_cost,
    book_star_rating,
    book_status,
    cart,
    cartPopper = false,
    home = false,
    collection = false,
}) {
    const [liked, setLiked] = useState(false);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [showLike, setShowLike] = useState(false);

    // Kiểm tra danh sách yêu thích khi component mount
    useEffect(() => {
        const checkIfLiked = async () => {
            if (user) {
                // Gọi API để lấy danh sách yêu thích của người dùng
                const favoriteBooks = await favoriteApi.getFavoriteBooksByUser(user.user_id);
                const isLiked = favoriteBooks.some((favBook) => favBook.book_id === book_id);
                setLiked(isLiked);
            }
        };

        checkIfLiked();
    }, [user, book_id]);

    const handleClick = async () => {
        if (!user) {
            alert('Vui lòng đăng nhập để thêm sách yêu thích!');
            return;
        }
        if (loading) return; // Ngăn chặn nếu đang tải

        setLoading(true); // Bắt đầu trạng thái loading
        const newLikedState = !liked;

        try {
            if (newLikedState) {
                // Nếu liked = true, gọi API để thêm sách yêu thích
                const response = await favoriteApi.addFavoriteBook(user.user_id, book_id);
                console.log('Sách đã được thêm vào danh sách yêu thích:', response);
            } else {
                // Nếu liked = false, gọi API để xóa sách yêu thích
                const success = await favoriteApi.removeFavoriteBook(user.user_id, book_id);
                if (success) {
                    console.log('Sách đã được xóa khỏi danh sách yêu thích.');
                }
            }
        } catch (err) {
            console.error('Lỗi khi cập nhật sách yêu thích:', err);
        } finally {
            setLiked(newLikedState); // Cập nhật trạng thái liked
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    return (
        <li
            className={cx('book', {
                home,
                collection,
            })}
            onMouseOver={() => setShowLike(true)}
            onMouseLeave={() => setShowLike(false)}
        >
            {collection && showLike && (
                <div className="absolute top-0 right-0 bg-red-500 p-2">
                    <button onClick={handleClick}>
                        <div className="flex justify-center items-center text-base text-white w-6 h-6">
                            {liked ? <FaHeart /> : <FaRegHeart />}
                        </div>
                    </button>
                </div>
            )}

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
                    {cartPopper && <span className={cx('quantity')}>x{cart.quantity}</span>}
                </div>
                {collection && <Rate className={cx('rate')} disabled value={book_star_rating} />}
            </div>
        </li>
    );
}

export default memo(Book);
