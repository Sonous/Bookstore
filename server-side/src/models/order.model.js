import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import PayingMethod from './payingMethod.model.js';
import TransportMethod from './transportMethod.model.js';

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
        books_total_prices: DataTypes.DECIMAL(20, 2),
        order_total_cost: DataTypes.DECIMAL(20, 2),
        user_id: DataTypes.INTEGER,
        address_id: DataTypes.INTEGER,
        pay_method_id: DataTypes.INTEGER,
        address_data: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);
Order.belongsTo(PayingMethod, {
    foreignKey: 'pay_method_id',
    as: 'payingMethod', // Use this alias in your query
});

Order.belongsTo(TransportMethod, {
    foreignKey: 'transport_id',
    as: 'transportMethod', // Use this alias in your query
});

export default Order;
