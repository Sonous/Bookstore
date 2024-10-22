import RatingBook from '../models/ratingBook.model.js'; // Adjust paths as necessary
import User from '../models/user.model.js'; // Example for User model
import Book from '../models/book.model.js'; // Example for Book model
import BookImage from '../models/bookImage.model.js'; // Example for BookImage model
import { where } from 'sequelize';

export const getUserRatings = async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const userReviews = await RatingBook.findAll({
            where: { user_id: userId },
            include: {
                model: Book,
                attributes: ['book_id', 'book_name', 'book_end_cost'],
                include: {
                    model: BookImage, 
                    attributes: ['book_image_url'],
                    as: 'image'
                },
                as: 'Book',
            },
        });

        res.status(200).json(userReviews);
    } catch (error) {
        console.error('Error fetching user ratings:', error);
        res.status(500).json({ error: error.message });
    }
};
