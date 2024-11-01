import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Book from './book.model.js';
import User from './user.model.js';

const RatingBook = sequelize.define(
    'ratingbook',
    {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        user_id: DataTypes.INTEGER,
        book_id: DataTypes.INTEGER,
        rating_star: DataTypes.INTEGER,
        rating_content: DataTypes.TEXT,
        review_status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            defaultValue: 'pending',
        },
        likes_count: DataTypes.INTEGER,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default RatingBook;
