import { v4 as uuidv4 } from 'uuid';
import Book from '../models/book.model.js';
import BookImage from '../models/bookImage.model.js';
import Order from '../models/order.model.js';

// export const getOrderByUser = async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const userOrders = await Order.findAll({
//             where: { user_id: userId },
//             include: [
//                 {
//                     model: Book,
//                     through: {
//                         model: BookOr,
//                         attributes: [],
//                     },
//                     attributes: ['book_id', 'book_name', 'book_end_cost'],
//                     include: {
//                         model: BookImage,
//                         attributes: ['book_image_url'],
//                     },
//                 },
//                 {
//                     model: PayingMethod,
//                     attributes: ['pay_method_id', 'pay_method_name'],
//                     as: 'payingMethod',
//                 },
//                 {
//                     model: TransportMethod,
//                     attributes: ['transport_id', 'transport_name', 'transport_cost'],
//                     as: 'transportMethod',
//                 },
//             ],
//         });
//         res.status(200).json(userOrders);
//     } catch (error) {
//         console.error('Error fetching user order:', error);
//         res.status(500).json({ error: error.message });
//     }
// };
const getOrderByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userOrders = await Order.findAll({
            where: { user_id: userId },
            attributes: [
                'order_id',
                'order_address_info',
                'order_books',
                'order_status',
                'books_total_prices',
                'transport_name',
                'transport_cost',
                'pay_method_name',
                'order_total_cost',
                'created_at',  // Assuming you want to include timestamps
                'updated_at',
            ],
        });

        // Parse the JSON fields to return them as objects
        const parsedOrders = await Promise.all(userOrders.map(async (order) => {
            const parsedBooks = JSON.parse(order.order_books);
            
            // Fetch book images based on the book_ids from the parsedBooks
            const booksWithImages = await Promise.all(parsedBooks.map(async (book) => {
                const bookImages = await BookImage.findAll({
                    where: { book_id: book.book_id },
                    attributes: ['book_image_url'],
                });

                return {
                    ...book,
                    images: bookImages.map(image => image.book_image_url), // Map to get image URLs
                };
            }));

            return {
                order_id: order.order_id,
                order_address_info: JSON.parse(order.order_address_info),
                order_books: booksWithImages,
                order_status: order.order_status,
                books_total_prices: order.books_total_prices,
                transport_name: order.transport_name,
                transport_cost: order.transport_cost,
                pay_method_name: order.pay_method_name,
                order_total_cost: order.order_total_cost,
                createdAt: order.created_at,
                updatedAt: order.updated_at,
            };
        }));

        res.status(200).json(parsedOrders);
    } catch (error) {
        console.error('Error fetching user order:', error);
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

export { getOrderByUser, saveOrder };
