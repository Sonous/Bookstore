
import Book from '../models/book.model.js'; 
import BookImage from '../models/bookImage.model.js'; 
import BookOrder from '../models/bookOrder.model.js';
import Order from '../models/order.model.js';
import PayingMethod from '../models/payingMethod.model.js';
import TransportMethod from '../models/transportMethod.model.js';

export const getOrderByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userOrders = await Order.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Book,
                    through: {
                        model: BookOrder,
                        attributes: [], 
                    },
                    attributes: ['book_id', 'book_name', 'book_end_cost'], 
                    include: {
                        model: BookImage,
                        attributes: ['book_image_url'],
                    },
                },
                {
                    model: PayingMethod,
                    attributes: ['pay_method_id', 'pay_method_name'],
                    as: 'payingMethod',
                },
                {
                    model: TransportMethod,
                    attributes: ['transport_id', 'transport_name', 'transport_cost'],
                    as: 'transportMethod', 
                },
            ],
        });
        res.status(200).json(userOrders);
    } catch (error) {
        console.error('Error fetching user order:', error);
        res.status(500).json({ error: error.message });
    }
};
