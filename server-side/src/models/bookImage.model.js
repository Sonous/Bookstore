import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BookImage = sequelize.define(
    'bookimage',
    {
        book_image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        book_image_url: DataTypes.STRING,
        book_id: DataTypes.INTEGER,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default BookImage;
