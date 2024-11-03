import { request } from '~/config'; // Ensure the path is correct

const orderApi = {
    // Get user order
    getOrderByUser: async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const data = await request.get(`/order/${userId}`,{
                headers: {
                    'x-access-token': token,
                },
            },);
            return data || [];
        } catch (error) {
            console.error('Error fetching user order:', error);
            throw new Error(error.message);
        }
    },
    getOrderById: async (id) => {
        try {
            const token = localStorage.getItem('token');
            const data = await request.get(`/order/${id}`,{
                headers: {
                    'x-access-token': token,
                },
            },);
            return data || [];
        } catch (error) {
            console.error('Error fetching user order:', error);
            throw new Error(error.message);
        }
    },
    // async saveOrder(order) {
    //     try {
    //         if (order) {
    //             const token = localStorage.getItem('token');

    //             await request.post(
    //                 '/order',
    //                 {
    //                     order: order,
    //                 },
    //                 {
    //                     headers: {
    //                         'x-access-token': token,
    //                     },
    //                 },
    //             );
    //         }
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // },
    saveOrder: async (order) => {
        try {
            if (!order) throw new Error('Order data is required.');

            const token = localStorage.getItem('token');
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
};

export default orderApi;
