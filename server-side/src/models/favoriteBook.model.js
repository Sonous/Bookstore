import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FavoriteBook = sequelize.define(
    'favoritebook',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default FavoriteBook;
