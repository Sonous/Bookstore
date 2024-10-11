import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RatingBook = sequelize.define(
    'ratingbook',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        rating_star: DataTypes.INTEGER,
        rating_content: DataTypes.TEXT,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default RatingBook;
