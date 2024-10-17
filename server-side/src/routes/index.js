import blogRouter from './blog.route.js';
import bookRouter from './book.route.js';
import authRouter from './auth.route.js';

export default function routes(server) {
    server.use('/api/book', bookRouter);
    server.use('/api/blog', blogRouter);
    server.use('/api/auth', authRouter);
}
