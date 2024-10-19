// authApi.js
import { request } from '~/config'; // Đảm bảo đường dẫn đúng

const authApi = {
    login: async (email, password) => {
        try {
            const data = await request.post('/auth/login', {
                user_email: email,
                user_password: password,
            });
            if (data?.message === 'Đăng nhập thành công!') {
                return data.token; // Trả về token
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    register: async (userDetails) => {
        try {
            const data = await request.post('/auth/register', userDetails);
            if (data?.message === 'Đăng ký thành công!') {
                return data.user; // 
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

};

export default authApi;