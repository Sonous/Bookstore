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
    through: 'favoritebook',
    foreignKey: 'user_id',
    otherKey: 'book_id',
});

Book.belongsToMany(User, {
    through: 'favoritebook',
    foreignKey: 'book_id',
    otherKey: 'user_id',
});

// cart
User.belongsToMany(Book, {
    through: 'cart',
    foreignKey: 'user_id',
    otherKey: 'book_id',
});

Book.belongsToMany(User, {
    through: 'cart',
    foreignKey: 'book_id',
    otherKey: 'user_id',
});

// ratingbook
User.belongsToMany(Book, {
    through: 'ratingbook',
    foreignKey: 'user_id',
    otherKey: 'book_id',
});

Book.belongsToMany(User, {
    through: 'ratingbook',
    foreignKey: 'book_id',
    otherKey: 'user_id',
});

// Associate between User and Address
User.belongsToMany(Address, {
    through: 'useraddress',
    foreignKey: 'user_id',
    otherKey: 'address_id',
});

Address.belongsToMany(User, {
    through: 'useraddress',
    foreignKey: 'address_id',
    otherKey: 'user_id',
});

// Associate between User and Order
User.hasMany(Order, {
    foreignKey: 'user_id',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
});

// Associate between Address and Order
Address.hasMany(Order, {
    foreignKey: 'address_id',
});

Order.belongsTo(Address, {
    foreignKey: 'address_id',
});

// Associate between Book and Order
Book.belongsToMany(Order, {
    through: 'bookorder',
    foreignKey: 'book_id',
    otherKey: 'order_id',
});

Order.belongsToMany(Book, {
    through: 'bookorder',
    foreignKey: 'order_id',
    otherKey: 'book_id',
});

// Associate between PayingMethod and Order
PayingMethod.hasMany(Order, {
    foreignKey: 'pay_method_id',
});

Order.belongsTo(PayingMethod, {
    foreignKey: 'pay_method_id',
});

export { Book, BookImage, Genre, Category, BlogType, Blog, User, Address, Order, PayingMethod };
