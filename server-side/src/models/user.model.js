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
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

RatingBook.belongsTo(User, {
    foreignKey: 'user_id', // Define the foreign key relationship to User
    as: 'User', // Use this alias in your queries
});
export default User;
