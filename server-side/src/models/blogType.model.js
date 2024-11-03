import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BlogType = sequelize.define(
    'blogtype',
    {
        type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        type_name: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default BlogType;
