import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BookOrder = sequelize.define(
    'bookorder',
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        quantity: DataTypes.INTEGER,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default BookOrder;
