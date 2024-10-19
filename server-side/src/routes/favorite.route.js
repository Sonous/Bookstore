import express from 'express';
import { addFavoriteBook, getFavoriteBooksByUser, removeFavoriteBook, removeAllFavorites } from '../controllers/favorite.controller.js';


const favoriteRouter = express.Router();


favoriteRouter.post('/', addFavoriteBook);


favoriteRouter.get('/:user_id', getFavoriteBooksByUser);


favoriteRouter.delete('/:user_id/:book_id', removeFavoriteBook);

favoriteRouter.delete('/:userId', removeAllFavorites);

export default favoriteRouter;