import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Address from './address.model.js';
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
UserAddress.belongsTo(Address, {
    foreignKey: 'address_id',
    as: 'address', // Use this alias in your query
});
export default UserAddress;
