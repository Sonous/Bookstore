import { request } from '~/config'; // Ensure the path is correct

const token = localStorage.getItem('token');

const orderApi = {
    saveOrder: async (order) => {
        try {
            if (!order) throw new Error('Order data is required.');

            if (!token) throw new Error('No token found. User might not be authenticated.');

            const response = await request.post(
                '/order',
                { order: order },
                {
                    headers: {
                        'x-access-token': token, // Include the token in headers
                    },
                },
            );

            return response.data; // Return data from the response
        } catch (error) {
            console.error('Error saving order:', error);
            throw new Error(error.message);
        }
    },
    async countOrders(userId, status) {
        try {
            const quantity = await request.get(`/order`, {
                headers: {
                    'x-access-token': token, // Include the token in headers
                },
                params: {
                    userId,
                    status,
                },
            });

            return quantity;
        } catch (error) {
            throw error;
        }
    },
    async updateOrder(orderId, newStatus) {
        try {
            const result = await request.post(
                `/order/${orderId}`,
                {
                    status: newStatus,
                },
                {
                    headers: {
                        'x-access-token': token, // Include the token in headers
                    },
                },
            );

            return result;
        } catch (error) {
            throw error;
        }
    },
    async getOrderById(orderId) {
        try {
            const order = await request.get(`/order/${orderId}`, {
                headers: {
                    'x-access-token': token, // Include the token in headers
                },
            });

            const parseOrders = {
                ...order,
                order_address_info: JSON.parse(order.order_address_info),
                order_books: JSON.parse(order.order_books),
            };

            return parseOrders;
        } catch (error) {
            throw error;
        }
    },
};

export default orderApi;
