import bookRouter from './book.route.js';

export default function routes(server) {
    server.use('/api/book', bookRouter);
}
