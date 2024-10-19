import FavoriteBook from "../models/favoriteBook.model.js";
import Book from '../models/book.model.js';
import BookImage from '../models/bookImage.model.js';

export const addFavoriteBook = async (req, res) => {
    const { user_id, book_id } = req.body;

    try {
        const favoriteBook = await FavoriteBook.create({ user_id, book_id });
        res.status(201).json(favoriteBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy danh sách sách yêu thích của người dùng
export const getFavoriteBooksByUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const favoriteBooks = await FavoriteBook.findAll({
            where: { user_id },
            include: {
                model: Book,
                attributes: {
                    exclude: [
                        'book_available',
                        'book_rating_num',
                        'book_description',
                        'book_author',
                        'book_format',
                        'book_page_num',
                        'book_collection',
                    ],
                },
                include: {
                    model: BookImage,
                    attributes: ['book_image_url'],
                    limit: 1,
                },
                
                as: 'Book', // Đảm bảo alias đúng
                required: true,
            },
        });
        res.status(200).json(favoriteBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa sách yêu thích
export const removeFavoriteBook = async (req, res) => {
    const { user_id, book_id } = req.params;

    try {
        const result = await FavoriteBook.destroy({
            where: { user_id, book_id }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Favorite book not found' });
        }

        res.status(204).send(); // Thành công và không có nội dung trả về
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeAllFavorites = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Xóa tất cả sách yêu thích của người dùng
        await FavoriteBook.destroy({
            where: { user_id: userId },
        });

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'All favorite books have been removed.' });
    } catch (error) {
        console.error("Error removing all favorite books:", error);
        res.status(500).json({ message: 'Failed to remove favorite books.' });
    }
};