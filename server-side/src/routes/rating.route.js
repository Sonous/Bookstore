import express from 'express';
import { addRating, getAllRatings, getUserRatings } from '../controllers/rating.controller.js';

const ratingRouter = express.Router();

ratingRouter.get('/:userId', getUserRatings);
ratingRouter.post('/', addRating);
ratingRouter.post('/getAllRatings', getAllRatings);
export default ratingRouter;
