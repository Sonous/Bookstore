import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import RatingBook from './ratingBook.model.js';

const User = sequelize.define(
    'user',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        user_name: DataTypes.STRING,
        user_phone: DataTypes.STRING,
        user_email: {
            type: DataTypes.STRING,
            unique: true, // Không cho phép trùng lặp email
        },
        user_password: DataTypes.STRING,
        user_avatar_url: DataTypes.STRING,
        address_id: DataTypes.INTEGER,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default User;
