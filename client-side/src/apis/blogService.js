const { request } = require('~/config');

const blogApi = {
    getAllBlog: async (page, limit, type) => {
        try {
            const data = await request.get(`/blog?page=${page}&limit=${limit}&type=${type}`);
            if (data?.message === 'Success') {
                return data.data;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
export default blogApi;
