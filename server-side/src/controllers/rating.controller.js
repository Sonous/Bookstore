import RatingBook from '../models/ratingBook.model.js'; // Adjust paths as necessary
import User from '../models/user.model.js'; // Example for User model
import Book from '../models/book.model.js'; // Example for Book model
import BookImage from '../models/bookImage.model.js'; // Example for BookImage model
import { Op, where } from 'sequelize';
import Notification from '../models/notification.model.js';

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
        const { bookId, userId, rating, rating_content, create_at } = req.body;

        // Create a new rating entry
        await RatingBook.create({
            book_id: bookId,
            user_id: userId,
            rating_star: rating,
            rating_content,
            review_status: 'pending',
            create_at: create_at,
        });

        res.status(200).json({
            status: 'success',
            message: 'Rating added successfully, pending for approval',
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
            where: { book_id: bookId, review_status: 'approved' },
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
const getPendingRatings = async (req, res) => {
    try {
        const pendingRatings = await RatingBook.findAll({
            where: { review_status: 'pending' },
            include: [
                {
                    model: User,
                    attributes: ['user_id', 'user_name', 'user_email', 'user_avatar_url'],
                },
                {
                    model: Book,
                    attributes: ['book_id', 'book_name'],
                },
            ],
        });

        res.status(200).json({ status: 'success', data: pendingRatings });
    } catch (error) {
        console.error('Error fetching pending ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const approveRating = async (req, res) => {
    const { reviewId } = req.params; // Get the review ID from the request parameters

    try {
        const rating = await RatingBook.findByPk(reviewId); // Find the rating by its ID
        console.log(rating.book_id);

        if (rating) {
            rating.review_status = 'approved'; // Set the status to approved
            await rating.save();

            await Notification.create({
                user_id: rating.user_id,
                title: 'Rating Approved',
                message: `Your rating for the book "${rating.book_id}" has been approved.`,
                type: 'Approval',
                created_at: new Date(),
            });

            // Fetch all ratings for the book to calculate the new average
            const ratings = await RatingBook.findAll({
                where: { book_id: rating.book_id },
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
                    where: { book_id: rating.book_id },
                },
            );

            res.status(200).json({ message: 'Rating approved successfully' });
        } else {
            res.status(404).json({ message: 'Rating not found' });
        }
    } catch (error) {
        console.error('Error approving rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getApprovedRatings = async (req, res) => {
    try {
        const approvedRatings = await RatingBook.findAll({
            where: { review_status: 'approved' },
            include: [
                {
                    model: User,
                    attributes: ['user_name', 'user_avatar_url'],
                },
                {
                    model: Book,
                    attributes: ['book_id', 'book_name'],
                },
            ],
        });

        res.status(200).json({ status: 'success', data: approvedRatings });
    } catch (error) {
        console.error('Error fetching approved ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const rejectRating = async (req, res) => {
    const { reviewId } = req.params; // Get the review ID from the request parameters

    try {
        const rating = await RatingBook.findByPk(reviewId); // Find the rating by its ID
        if (rating) {
            rating.review_status = 'rejected'; // Set the status to rejected
            await rating.save();

            await Notification.create({
                user_id: rating.user_id,
                title: 'Rating Rejected',
                message: `Your rating for the book "${rating.book_id}" has been rejected.`,
                type: 'Rejection',
                created_at: new Date(),
            });

            res.status(200).json({ message: 'Rating rejected successfully' });
        } else {
            res.status(404).json({ message: 'Rating not found' });
        }
    } catch (error) {
        console.error('Error rejecting rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getRejectedRatings = async (req, res) => {
    try {
        const rejectedRatings = await RatingBook.findAll({
            where: { review_status: 'rejected' },
            include: [
                {
                    model: User,
                    attributes: ['user_name', 'user_avatar_url'],
                },
                {
                    model: Book,
                    attributes: ['book_id', 'book_name'],
                },
            ],
        });

        res.status(200).json({ status: 'success', data: rejectedRatings });
    } catch (error) {
        console.error('Error fetching rejected ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getAllRatingAdmin = async (req, res) => {
    try {
        const ratings = await RatingBook.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_id', 'user_name', 'user_email', 'user_avatar_url'],
                },
                {
                    model: Book,
                    attributes: ['book_id', 'book_name'],
                },
            ],
        });

        res.status(200).json({ status: 'success', data: ratings });
    } catch (error) {
        console.error('Error fetching admin ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    getUserRatings,
    getBookRatings,
    approveRating,
    rejectRating,
    getPendingRatings,
    getApprovedRatings,
    getRejectedRatings,
    getAllRatingAdmin,
};
