import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BookGenre = sequelize.define(
    'bookgenre',
    {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        genre_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default BookGenre;
