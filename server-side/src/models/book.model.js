import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define(
    'book',
    {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        book_name: DataTypes.STRING,
        book_cost: DataTypes.DECIMAL(20, 2),
        book_discount: DataTypes.DECIMAL(4, 2),
        book_end_cost: DataTypes.DECIMAL(20, 2),
        book_available: DataTypes.INTEGER,
        book_sold: DataTypes.INTEGER,
        book_star_rating: DataTypes.INTEGER,
        book_rating_num: DataTypes.INTEGER,
        book_description: DataTypes.TEXT,
        book_author: DataTypes.STRING,
        book_format: DataTypes.STRING,
        book_page_num: DataTypes.INTEGER,
        book_collection: DataTypes.STRING,
        book_status: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Book;
