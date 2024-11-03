import { StatusCodes } from 'http-status-codes';
import Book from '../models/book.model.js';
import BookImage from '../models/bookImage.model.js';
import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';
import RatingBook from '../models/ratingBook.model.js';
import Address from '../models/address.model.js';

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

const addBookToCart = async (req, res) => {
    const { quantity } = req.body;
    const { userId, bookId } = req.params;

    try {
        if (!quantity) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Please select the quantity of book!',
            });
        }

        const isExisted = await Cart.findOne({
            where: {
                user_id: userId,
                book_id: bookId,
            },
        });

        if (isExisted) {
            const updateItem = await Cart.update(
                {
                    quantity: parseInt(quantity),
                },
                {
                    where: {
                        user_id: userId,
                        book_id: bookId,
                    },
                },
            );

            return res.status(200).json({
                message: 'Update quantity of book!',
                updateItem,
            });
        }

        const item = await Cart.create({
            user_id: parseInt(userId),
            book_id: parseInt(bookId),
            quantity: parseInt(quantity),
        });

        return res.status(200).json({
            message: 'Add book to cart successfully!',
            item,
        });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: error.message,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUserData = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found.' });
        }

        await user.update(updatedUserData);

        res.status(StatusCodes.OK).json({
            message: 'User updated successfully.',
            user: user,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'An error occurred while updating the user.',
            error: error.message,
        });
    }
};

const getAddressOfUser = (req, res) => {
    const { userId } = req.params;

    User.findByPk(userId, {
        attributes: ['user_name', 'user_phone'],
        include: {
            model: Address,
            attributes: {
                exclude: ['address_id', 'address_description'],
            },
            required: true,
        },
    })
        .then((address) => res.status(200).json(address))
        .catch((err) =>
            res.status(StatusCodes.NOT_FOUND).json({
                message: err.message,
            }),
        );
};

export { getUserById, getUserByToken, getCartItems, addBookToCart, updateUser, getAddressOfUser };
