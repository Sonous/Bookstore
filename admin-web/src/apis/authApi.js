const { request } = require('~/configs');

const authApi = {
    async login(admin_username, admin_password, role) {
        try {
            const data = await request.post('/auth/admin/login', {
                admin_username,
                admin_password,
                role,
            });

            return data.token;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    async regiter(admin_username, admin_password, admin_name, role) {
        try {
            const data = await request.post('/auth/admin/register', {
                admin_username,
                admin_password,
                admin_name,
                role,
            });

            return data.admin;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
};

export default authApi;
