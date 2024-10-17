import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define(
    'user',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Tự động tăng
        },
        user_name: DataTypes.STRING,
        user_phone: DataTypes.STRING,
        user_email: {
            type: DataTypes.STRING,
            unique: true, // Không cho phép trùng lặp email
        },
        user_password: DataTypes.STRING,
        user_avatar_url: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default User;
