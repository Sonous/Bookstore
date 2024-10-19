const { request } = require('~/config');

const cartApi = {
    addQuantity: async (userId, bookId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await request.post(
                `/cart/addQuantity`,
                { userId, bookId },
                {
                    headers: {
                        'x-access-token': token,
                    },
                },
            );
            if (response?.message === 'success') {
                return response.data;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    subQuantity: async (userId, bookId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await request.post(
                `/cart/subQuantity`,
                { userId, bookId },
                {
                    headers: {
                        'x-access-token': token,
                    },
                },
            );
            if (response?.message === 'success') {
                return response.data;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
export default cartApi;
