import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define(
    'user',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_name: DataTypes.STRING,
        user_phone: DataTypes.STRING,
        user_email: DataTypes.STRING,
        user_password: DataTypes.STRING,
        user_avatar_url: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default User;
