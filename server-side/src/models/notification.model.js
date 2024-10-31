import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Notification = sequelize.define(
    'notification',
    {
        notification_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        message: DataTypes.STRING,
        type: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('Unread', 'Read'),
            defaultValue: 'Unread',
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Notification;
