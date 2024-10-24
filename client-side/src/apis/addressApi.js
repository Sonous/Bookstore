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
    // saveAddress: async (address) => {
    //     try {
    //         if (!address) throw new Error('Order data is required.');

    //         const token = localStorage.getItem('token');
    //         if (!token) throw new Error('No token found. User might not be authenticated.');

    //         const response = await request.post(
    //             '/address',
    //             { address: address },
    //             {
    //                 headers: {
    //                     'x-access-token': token, // Include the token in headers
    //                 },
    //             },
    //         );

    //         return response.data; // Return data from the response
    //     } catch (error) {
    //         console.error('Error saving order:', error);
    //         throw new Error(error.message);
    //     }
    // },
    // updateAddress: async (addressId, updatedData) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await request.put(
    //             `${BASE_URL}/address/${addressId}`, // Pass addressId in the URL
    //             updatedData,
    //             {
    //                 headers: {
    //                     'x-access-token': token,
    //                 },
    //             },
    //         );
    //         if (response.status === 200) {
    //             return response.data;
    //         } else {
    //             throw new Error('Error updating address');
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // },
};

export default addressApi;
