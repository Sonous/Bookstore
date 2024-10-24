import { request } from '~/config'; // Đảm bảo đường dẫn đúng
const BASE_URL = 'http://localhost:5000/api';
const userApi = {
    updateUser: async (userId, updatedData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await request.put(
            `${BASE_URL}/user/${userId}`, updatedData, {
              headers: {
                  'x-access-token': token,
              },
          },);
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Error updating user');
          }
        } catch (error) {
            throw error;
        }
      },
      updateUserAvatar: async (userId, formData) => {
        try {
            const response = await fetch(`${BASE_URL}/user/${userId}/user_avatar_url`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'x-access-token': localStorage.getItem('token'), // Pass token if needed
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                return data; // Return data for further processing if needed
            } else {
                throw new Error(data.message || 'Error updating avatar');
            }
        } catch (error) {
            console.error('Error updating avatar:', error);
            throw error; // Propagate the error for further handling
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
