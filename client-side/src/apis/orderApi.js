import { request } from '~/config'; // Ensure the path is correct

const orderApi = {
    // Get user order
    getOrderByUser: async (userId) => {
        try {
            const data = await request.get(`/order/${userId}`);
            return data || [];
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async saveOrder(order) {
        try {
            if (order) {
                const token = localStorage.getItem('token');

                await request.post(
                    '/order',
                    {
                        order: order,
                    },
                    {
                        headers: {
                            'x-access-token': token,
                        },
                    },
                );
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default orderApi;
