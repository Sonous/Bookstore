import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Banner = sequelize.define(
    'banner',
    {
        banner_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        banner_image_url: DataTypes.STRING,
        banner_link: DataTypes.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default Banner;
