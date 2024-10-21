import { request } from '~/configs';

const adminApi = {
    async getAdminByToken() {
        const token = localStorage.getItem('token');

        try {
            const admin = await request.get('/admin', {
                headers: {
                    'x-access-token': token,
                },
            });

            return admin;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
};

export default adminApi;
