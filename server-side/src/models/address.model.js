import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Address = sequelize.define(
    'address',
    {
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        address_house_number: DataTypes.STRING,
        address_ward: DataTypes.STRING,
        address_district: DataTypes.STRING,
        address_province: DataTypes.STRING,
        address_description: DataTypes.TEXT,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Address;
