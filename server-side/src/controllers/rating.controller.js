import RatingBook from '../models/ratingBook.model.js'; // Adjust paths as necessary
import User from '../models/user.model.js'; // Example for User model
import Book from '../models/book.model.js'; // Example for Book model
import BookImage from '../models/bookImage.model.js'; // Example for BookImage model
import { where } from 'sequelize';

const getUserRatings = async (req, res) => {
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
                    as: 'image',
                },
            },
        });

        res.status(200).json(userReviews);
    } catch (error) {
        console.error('Error fetching user ratings:', error);
        res.status(500).json({ error: error.message });
    }
};
const getBookRatings = async (req, res) => {
    const bookId = req.params.bookId; // Fix the param name to bookId
    try {
        const bookReviews = await RatingBook.findAll({
            where: { book_id: bookId }, // Fetch reviews based on book_id
            include: {
                model: User, // Include User data with specific attributes
                attributes: ['user_name', 'user_avatar_url'],
            },
        });

        res.status(200).json(bookReviews); // Respond with book reviews
    } catch (error) {
        console.error('Error fetching book ratings:', error);
        res.status(500).json({ error: error.message });
    }
};
export const addRating = async (req, res) => {
    try {
        const { bookId, userId, rating, rating_content } = req.body;

        // Check if the user has already rated the book
        const existingRating = await RatingBook.findOne({
            where: { book_id: bookId, user_id: userId },
        });

        // Create a new rating entry
        await RatingBook.create({
            book_id: bookId,
            user_id: userId,
            rating_star: rating,
            rating_content,
        });

        // Fetch all ratings for the book to calculate the new average
        const ratings = await RatingBook.findAll({
            where: { book_id: bookId },
        });

        const totalRatings = ratings.length;
        const averageRating = ratings.reduce((acc, curr) => acc + curr.rating_star, 0) / totalRatings;

        // Update the book's rating fields
        await Book.update(
            {
                book_star_rating: Math.round(averageRating),
                book_rating_num: totalRatings,
            },
            {
                where: { book_id: bookId },
            },
        );

        res.status(200).json({
            status: 'success',
            message: existingRating ? 'Rating updated successfully' : 'Rating added successfully',
        });
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllRatings = async (req, res) => {
    try {
        const { bookId } = req.body;
        const ratings = await RatingBook.findAll({
            where: { book_id: bookId },
            attributes: ['rating_star', 'rating_content', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['user_id', 'user_name', 'user_email', 'user_avatar_url'],
                },
            ],
        });
        res.status(200).json({ status: 'success', data: ratings });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export { getUserRatings, getBookRatings };
