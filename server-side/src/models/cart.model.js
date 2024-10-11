import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cart = sequelize.define(
    'cart',
    {
        user_id: {
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

export default Cart;
