import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BlogType = sequelize.define(
    'blogtype',
    {
        type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        type_name: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default BlogType;
