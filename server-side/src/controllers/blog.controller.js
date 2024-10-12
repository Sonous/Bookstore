import { Blog } from '../models/index.js';

const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json({
            message: 'Success',
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching blogs',
            error: error.message,
        });
    }
};
export { getAllBlog };
