import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Blog = sequelize.define(
    'blog',
    {
        blog_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        blog_title: DataTypes.STRING,
        blog_content: DataTypes.TEXT,
        blog_thumbnail: DataTypes.STRING,
        type_id: DataTypes.INTEGER,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Blog;
