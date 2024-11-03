import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define(
    'order',
    {
        order_id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        order_address_info: DataTypes.TEXT,
        order_books: DataTypes.TEXT,
        order_status: {
            type: DataTypes.ENUM('Chờ thanh toán', 'Đang xử lý', 'Đang giao', 'Hoàn tất', 'Bị hủy', 'Đổi trả'),
            defaultValue: 'Chờ thanh toán',
        },
        books_total_prices: DataTypes.DECIMAL(20, 2),
        transport_name: DataTypes.STRING,
        transport_cost: DataTypes.DECIMAL(20, 2),
        pay_method_name: DataTypes.STRING,
        order_total_cost: DataTypes.DECIMAL(20, 2),
        user_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Order;
