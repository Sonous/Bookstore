import blogRouter from './blog.route.js';
import bookRouter from './book.route.js';
import authRouter from './auth.route.js';
import bannerRouter from './banner.route.js';
import categoryRouter from './category.route.js';
import userRouter from './user.route.js';
import verifyToken from '../middleware/verifyToken.js';
import favoriteRouter from './favorite.route.js';

export default function routes(server) {
    server.use('/api/book', bookRouter);
    server.use('/api/blog', blogRouter);
    server.use('/api/auth', authRouter);
    server.use('/api/banner', bannerRouter);
    server.use('/api/category', categoryRouter);
    server.use('/api/user', verifyToken, userRouter);
    server.use('/api/favorite', favoriteRouter);
}
