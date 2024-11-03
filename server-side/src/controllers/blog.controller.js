import { Blog, BlogType } from '../models/index.js';

const getAllBlog = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const typeName = req.query.type;

        const whereClause = {};
        if (typeName) {
            whereClause['$BlogType.type_name$'] = typeName;
        }

        const blogs = await Blog.findAll({
            attributes: ['blog_id', 'blog_title', 'blog_content', 'blog_thumbnail', 'created_at', 'type_id'],
            include: [
                {
                    model: BlogType,
                    attributes: ['type_name'],
                    required: true,
                },
            ],
            where: whereClause,
            limit,
            offset,
        });

        const totalBlogs = await Blog.count({
            include: [
                {
                    model: BlogType,
                    attributes: [],
                    where: whereClause,
                },
            ],
        });

        res.status(200).json({
            message: 'Success',
            data: {
                blogs: blogs,
                total: totalBlogs,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching blogs',
            error: error.message,
        });
    }
};

export { getAllBlog };
