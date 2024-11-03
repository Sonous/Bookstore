const { request } = require('~/config');

const blogApi = {
    getAllBlog: async (page, limit, type) => {
        try {
            let data;
            if (page && limit && type) {
                data = await request.get(`/blog?page=${page}&limit=${limit}&type=${type}`);
            } else {
                data = await request.get(`/blog`);
            }

            if (data?.message === 'Success') {
                return data.data;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
export default blogApi;
