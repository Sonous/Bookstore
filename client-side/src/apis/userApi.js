import { request } from '~/config'; // Đảm bảo đường dẫn đúng
const BASE_URL = 'http://localhost:5000/api';
const userApi = {
    updateUser: async (userId, updatedData) => {
        try {
            const response = await request.put(`${BASE_URL}/user/${userId}`, updatedData);

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Error updating user');
            }
        } catch (error) {
            throw error;
        }
    },

    async getAddressOfUser(user_id) {
        try {
            const token = localStorage.getItem('token');

            const address = await request.get(`/user/${user_id}/address`, {
                headers: {
                    'x-access-token': token,
                },
            });

            return address;
        } catch (error) {
            throw error;
        }
    },
};

export default userApi;
