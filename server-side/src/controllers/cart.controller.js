import Book from '../models/book.model.js';
import BookImage from '../models/bookImage.model.js';
import Cart from '../models/cart.model.js';
import User from '../models/user.model.js';

const getCartItemFromUser = async (userId) => {
    const response = await User.findAll({
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
    });
    if (Array.isArray(response) && response.length > 0) {
        return response[0]?.Cart ? response[0].Cart : [];
    }
    return [];
};
const addQuantity = async (req, res) => {
    const { userId, bookId } = req.body;
    const user_id = parseInt(userId);
    if (!user_id || !bookId) {
        return res.status(400).json({
            message: 'Missing fields',
            status: 'failed',
        });
    }
    try {
        const cartItem = await Cart.findOne({
            where: { user_id: user_id, book_id: bookId },
        });

        if (!cartItem) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cart item not found',
            });
        }

        cartItem.quantity += 1;
        await cartItem.save();
        const data = await getCartItemFromUser(userId);
        console.log(data);
        return res.status(200).json({
            status: 'success',
            message: 'Quantity increased successfully',
            data,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while increasing quantity',
            error: error.message,
        });
    }
};

const subQuantity = async (req, res) => {
    const { userId, bookId } = req.body;
    const user_id = parseInt(userId);
    if (!user_id || !bookId) {
        return res.status(400).json({
            message: 'Missing fields',
            status: 'failed',
        });
    }
    try {
        const cartItem = await Cart.findOne({
            where: { user_id: user_id, book_id: bookId },
        });

        if (!cartItem) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cart item not found',
            });
        }
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            const data = await getCartItemFromUser(userId);
            return res.status(200).json({
                status: 'success',
                message: 'Quantity decreased successfully',
                data,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while decreasing quantity',
            error: error.message,
        });
    }
};
export { addQuantity, subQuantity };
