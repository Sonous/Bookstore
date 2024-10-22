import express from 'express';
import { getUserRatings } from '../controllers/rating.controller.js';

const ratingRouter = express.Router();

ratingRouter.get('/:userId', getUserRatings);

export default ratingRouter;
