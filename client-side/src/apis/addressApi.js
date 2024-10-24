import { request } from '~/config'; // Ensure the path is correct
const BASE_URL = 'http://localhost:5000/api'; 
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
    updateAddress: async (addressId, updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await request.put(
                `${BASE_URL}/address/${addressId}`, // Pass addressId in the URL
                updatedData,
                {
                    headers: {
                        'x-access-token': token,
                    },
                },
            );
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Error updating address');
            }
        } catch (error) {
            throw error;
        }
    },
};

export default addressApi;
