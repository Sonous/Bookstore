import express from 'express';
import * as BookController from '../controllers/book.controller.js';

const bookRouter = express.Router();

bookRouter.route('/:id/genre').get(BookController.getGenreOfBook);

bookRouter.route('/').get(BookController.getAllBooks);

bookRouter.route('/:bookId').patch(BookController.updateBook);

bookRouter.route('/:name').get(BookController.getBookByName);

bookRouter.route('/author/:author').get(BookController.getBooksByAuthor);

export default bookRouter;
