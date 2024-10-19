import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { convertPriceToString } from '~/utils/functions';
import { Rate } from 'antd';
import { memo, useState } from 'react';
import { imageUrl } from '~/config/axios.config';
import { AiOutlineClose } from 'react-icons/ai';
import favoriteApi from '~/apis/favoriteApi.js';
function BookFavorite({
    enable = true,
    bookimages,
    book_name,
    book_cost,
    book_id,
    book_end_cost,
    book_star_rating,
    user_id,
    onRemove,
}) {
    const [deleted, setDeleted] = useState(false);

    const handleClick = async () => {
        try {
            const success = await favoriteApi.removeFavoriteBook(user_id, book_id);
            if (success) {
                setDeleted(true); // Đánh dấu sách đã bị xóa
                onRemove();
            }
        } catch (error) {
            console.error('Error removing favorite book:', error);
        }
    };

    if (deleted) {
        return null; // Trả về null nếu sách đã bị xóa
    }

    return (
        <div>
            <div className="border border- [#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                <div className="w-full h-full flex justify-center items-center">
                    {/* image */}
                    <div className="w-[200px] mx-auto flex justify-center items-center">
                        <Link to={enable ? `/books/${book_name}` : null}>
                            <img
                                src={`${imageUrl}/${bookimages[0].book_image_url}`}
                                alt={book_name}
                                className="max-h-[160px] group-hover:scale-110 transition duration-300"
                            />
                        </Link>
                    </div>

                    {/* buton */}
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button onClick={handleClick}>
                            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                                <AiOutlineClose className="text-3xl" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <Link to={enable ? `/books/${book_name}` : null}>
                <span className="font-normal line-clamp-2 overflow-hidden text-ellipsis whitespace-normal">
                    {book_name}
                </span>
            </Link>
            <div>
                <span className="text-main font-medium">{convertPriceToString(book_end_cost)}</span>
                <span className="text-xs ml-3 line-through opacity-80">{convertPriceToString(book_cost)}</span>
            </div>
            {<Rate className="text-sm" disabled value={book_star_rating} />}
        </div>
    );
}

export default memo(BookFavorite);
