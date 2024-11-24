import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ImportReceipt = sequelize.define(
    'importreceipt',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        createBy: DataTypes.STRING,
        store_name: DataTypes.STRING,
        store_address: DataTypes.TEXT,
        store_phone: DataTypes.STRING,
        provider_name: DataTypes.STRING,
        provider_address: DataTypes.TEXT,
        provider_phone: DataTypes.STRING,
        item_list: DataTypes.TEXT,
        note: DataTypes.TEXT,
        total_price: DataTypes.INTEGER,
        receipt_status: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

export default ImportReceipt;
