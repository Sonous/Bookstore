import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Admin = sequelize.define(
    'admin',
    {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        admin_username: DataTypes.STRING,
        admin_password: DataTypes.STRING,
        admin_avatar_url: DataTypes.STRING,
        admin_name: DataTypes.STRING,
        role: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Admin;
