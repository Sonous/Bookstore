import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define(
    'order',
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        order_status: DataTypes.STRING,
        book_total_prices: DataTypes.DECIMAL(20, 2),
        transport_cost: DataTypes.DECIMAL(20, 2),
        order_total_total: DataTypes.DECIMAL(20, 2),
        user_id: DataTypes.INTEGER,
        address_id: DataTypes.INTEGER,
        pay_method_id: DataTypes.INTEGER,
        address_data: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Order;
