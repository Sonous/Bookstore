import BookImage from './bookImage.model.js';
import Book from './book.model.js';
import Genre from './Genre.model.js';
import Category from './category.model.js';
import BlogType from './blogType.model.js';
import Blog from './blog.model.js';
import User from './user.model.js';
import Address from './address.model.js';
import Order from './order.model.js';
import PayingMethod from './payingMethod.model.js';
import FavoriteBook from './favoriteBook.model.js';
import Cart from './cart.model.js';
import RatingBook from './ratingBook.model.js';
import Notification from './notification.model.js';

// Associate between Book and BookImage
Book.hasMany(BookImage, {
    foreignKey: 'book_id',
});

BookImage.belongsTo(Book, {
    foreignKey: 'book_id',
});

// Associate between Book and Genre
Book.belongsToMany(Genre, {
    through: 'bookgenre',
    foreignKey: 'book_id',
    otherKey: 'genre_id',
});

Genre.belongsToMany(Book, {
    through: 'bookgenre',
    foreignKey: 'genre_id',
    otherKey: 'book_id',
});

// Associate between Genre and Category
Category.hasMany(Genre, {
    foreignKey: 'category_id',
});

Genre.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Associate between Blog and BlogType
BlogType.hasMany(Blog, {
    foreignKey: 'type_id',
});

Blog.belongsTo(BlogType, {
    foreignKey: 'type_id',
});

// Associate between Book and User
// favoritebook
User.belongsToMany(Book, {
    through: FavoriteBook,
    foreignKey: 'user_id',
    otherKey: 'book_id',
    as: 'FavoriteBook',
});

Book.belongsToMany(User, {
    through: FavoriteBook,
    foreignKey: 'book_id',
    otherKey: 'user_id',
    as: 'UsersWhoFavorited',
});

// cart
User.belongsToMany(Book, {
    through: Cart,
    foreignKey: 'user_id',
    otherKey: 'book_id',
    as: 'Cart',
});

Book.belongsToMany(User, {
    through: Cart,
    foreignKey: 'book_id',
    otherKey: 'user_id',
    as: 'UsersWithCart',
});

// Associate between User and RatingBook
User.hasMany(RatingBook, {
    foreignKey: 'user_id',
});

RatingBook.belongsTo(User, {
    foreignKey: 'user_id',
});

// Associate between Book and RatingBook
Book.hasMany(RatingBook, {
    foreignKey: 'book_id',
});

RatingBook.belongsTo(Book, {
    foreignKey: 'book_id',
});

// Associate between User and Address
Address.hasMany(User, {
    foreignKey: 'address_id',
});

User.belongsTo(Address, {
    foreignKey: 'address_id',
});

// Associate between User and Order
User.hasMany(Order, {
    foreignKey: 'user_id',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
});

// Associate between Notification and User
User.hasMany(Notification, {
    foreignKey: 'user_id',
});

Notification.belongsTo(User, {
    foreignKey: 'user_id',
});

// User.hasMany(RatingBook, { foreignKey: 'user_id', as: 'ratings' });
// Book.hasMany(RatingBook, { foreignKey: 'book_id', as: 'bookRatings' });

// RatingBook.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
// RatingBook.belongsTo(Book, { foreignKey: 'book_id', as: 'Book' });

export { Book, BookImage, Genre, Category, BlogType, Blog, User, Address, Order, PayingMethod };
