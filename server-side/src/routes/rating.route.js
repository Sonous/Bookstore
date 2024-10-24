import express from 'express';
import { getBookRatings, getUserRatings } from '../controllers/rating.controller.js';

const ratingRouter = express.Router();


ratingRouter.get('/user/:userId', getUserRatings);

ratingRouter.get('/book/:bookId', getBookRatings);

export default ratingRouter;
