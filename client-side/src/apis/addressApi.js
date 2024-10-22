import { request } from '~/config'; // Ensure the path is correct

const addressApi = {
    // Get user order
    getAddressByUser: async (userId) => {
        try {
            const data = await request.get(`/address/${userId}`);
            return data || []; 
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default addressApi;
