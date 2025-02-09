import blogRouter from './blog.route.js';
import bookRouter from './book.route.js';
import authRouter from './auth.route.js';
import bannerRouter from './banner.route.js';
import categoryRouter from './category.route.js';
import userRouter from './user.route.js';
import verifyToken from '../middleware/verifyToken.js';
import cartRouter from './cart.route.js';
import favoriteRouter from './favorite.route.js';
import adminRouter from './admin.route.js';
import ratingRouter from './rating.route.js';
import transportMethodRouter from './transportMethod.route.js';
import orderRouter from './order.route.js';
import addressRouter from './address.route.js';
import notificationRouter from './notification.route.js';
import importReceiptRouter from './importReceipt.route.js';

export default function routes(server) {
    server.use('/api/book', bookRouter);
    server.use('/api/blog', blogRouter);
    server.use('/api/auth', authRouter);
    server.use('/api/banner', bannerRouter);
    server.use('/api/category', categoryRouter);
    server.use('/api/user', verifyToken, userRouter);
    server.use('/api/cart', verifyToken, cartRouter);
    server.use('/api/admin', verifyToken, adminRouter);
    server.use('/api/importReceipt', importReceiptRouter);
    server.use('/api/favorite', favoriteRouter);
    server.use('/api/rating', ratingRouter);
    server.use('/api/order', verifyToken, orderRouter);
    server.use('/api/address', addressRouter);
    server.use('/api/transport', transportMethodRouter);
    server.use('/api/notification', notificationRouter);
}
