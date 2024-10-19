import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Book from './book.model.js';

const FavoriteBook = sequelize.define(
    'favoritebook',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

// Thiết lập mối quan hệ
FavoriteBook.belongsTo(Book, {
    foreignKey: 'book_id',
    as: 'Book', // Đây là alias mà bạn sử dụng trong truy vấn
});

export default FavoriteBook;
