import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TransportMethod = sequelize.define(
    'transportmethod',
    {
        transport_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        transport_name: DataTypes.STRING,
        transport_cost: DataTypes.DECIMAL(20, 2),
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default TransportMethod;
