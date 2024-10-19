import { StatusCodes } from 'http-status-codes';
import Book from '../models/book.model.js';
import BookImage from '../models/bookImage.model.js';
import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';

const getUserById = (req, res) => {
    User.findByPk(req.params.userId)
        .then((user) => res.status(200).json(user))
        .catch((err) =>
            res.status(404).json({
                message: err.message,
            }),
        );
};

const getUserByToken = (req, res) => {
    User.findOne({
        attributes: ['user_id', 'user_name', 'user_phone', 'user_email', 'user_avatar_url'],
        where: {
            user_id: req.userId,
        },
    })
        .then((user) => res.status(200).json(user))
        .catch((err) =>
            res.status(404).json({
                message: err.message,
            }),
        );
};

const getCartItems = (req, res) => {
    const { userId } = req.params;

    User.findAll({
        attributes: [],
        where: {
            user_id: parseInt(userId) || null,
        },
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
            through: {
                attributes: ['quantity'],
            },
            as: 'Cart',
            required: true,
        },
    })
        .then((items) => res.status(200).json(items))
        .catch((err) =>
            res.status(StatusCodes.NOT_FOUND).json({
                message: err.message,
            }),
        );
};

export { getUserById, getUserByToken, getCartItems };
