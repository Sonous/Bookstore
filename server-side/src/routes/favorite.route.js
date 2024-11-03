import express from 'express';
import { addFavoriteBook, getFavoriteBooksByUser, removeFavoriteBook, removeAllFavorites } from '../controllers/favorite.controller.js';


const favoriteRouter = express.Router();


favoriteRouter.post('/add', addFavoriteBook);


favoriteRouter.get('/:userId', getFavoriteBooksByUser);


favoriteRouter.delete('/:userId/:bookId', removeFavoriteBook);

favoriteRouter.delete('/:userId', removeAllFavorites);

export default favoriteRouter;