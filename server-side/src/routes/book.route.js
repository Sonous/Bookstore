import express from 'express';
import * as BookController from '../controllers/book.controller.js';

const bookRouter = express.Router();

bookRouter.route('/:id').get(BookController.getBookById);

bookRouter.route('/:id/genre').get(BookController.getGenreOfBook);

bookRouter.route('/').get(BookController.getAllBooks);

export default bookRouter;
