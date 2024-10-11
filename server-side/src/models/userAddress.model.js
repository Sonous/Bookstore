import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserAddress = sequelize.define(
    'useraddress',
    {
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default UserAddress;
