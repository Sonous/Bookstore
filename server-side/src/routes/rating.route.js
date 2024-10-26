import express from 'express';
import { addRating, getAllRatings, getBookRatings, getUserRatings } from '../controllers/rating.controller.js';

const ratingRouter = express.Router();

ratingRouter.get('/user/:userId', getUserRatings);

ratingRouter.get('/book/:bookId', getBookRatings);
ratingRouter.post('/', addRating);
ratingRouter.post('/getAllRatings', getAllRatings);

export default ratingRouter;
