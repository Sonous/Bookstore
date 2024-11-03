import { Op } from 'sequelize';
import Order from '../models/order.model.js';

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByPk(orderId);

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: error.message });
    }
};

const saveOrder = async (req, res) => {
    try {
        const { order } = req.body;

        const result = await Order.create({
            order_id: Date.now().toString(),
            order_address_info: JSON.stringify(order.order_address_info),
            order_books: JSON.stringify(order.order_books),
            order_status: order.order_status,
            books_total_prices: order.books_total_prices,
            transport_name: order.transport_name,
            transport_cost: order.transport_cost,
            pay_method_name: order.pay_method_name,
            order_total_cost: order.order_total_cost,
            user_id: order.user_id,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const countOrders = async (req, res) => {
    try {
        const { userId, status } = req.query;

        const whereClause = {
            user_id: userId,
        };

        if (status !== 'Tất Cả') {
            whereClause.order_status = status;
            if (status === 'Đang xử lý') {
                whereClause.order_status = {
                    [Op.in]: ['Đang xử lý', 'Đang xác nhận'],
                };
            }
        }

        const quantity = await Order.count({
            where: whereClause,
        });

        res.status(200).json({
            status,
            quantity,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        await Order.update(
            {
                order_status: status,
            },
            {
                where: {
                    order_id: orderId,
                },
            },
        );

        res.status(200).json({
            message: 'Update successfully!',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { saveOrder, getOrderById, countOrders, updateOrder };
