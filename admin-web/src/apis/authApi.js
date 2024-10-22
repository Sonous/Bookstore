const { request } = require('~/configs');

const authApi = {
    async login(admin_username, admin_password) {
        try {
            const data = await request.post('/auth/admin/login', {
                admin_username,
                admin_password,
            });

            return data.token;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    async regiter(admin_username, admin_password) {
        try {
            const data = await request.post('/auth/admin/register', {
                admin_username,
                admin_password,
            });

            return data.admin;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
};

export default authApi;
