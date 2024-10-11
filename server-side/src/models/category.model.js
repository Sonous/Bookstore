import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define(
    'category',
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        category_name: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Category;
