import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Genre = sequelize.define(
    'genre',
    {
        genre_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: sequelize.literal('DEFAULT'),
        },
        genre_name: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Genre;
