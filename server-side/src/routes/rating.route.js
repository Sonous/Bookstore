import express from 'express';
import { addRating, approveRating, getAllRatings, getApprovedRatings, getBookRatings, getPendingRatings, getRejectedRatings, getUserRatings, rejectRating } from '../controllers/rating.controller.js';

const ratingRouter = express.Router();

ratingRouter.get('/user/:userId', getUserRatings);

ratingRouter.get('/book/:bookId', getBookRatings);
ratingRouter.post('/', addRating);
ratingRouter.post('/getAllRatings', getAllRatings);

ratingRouter.get('/pending', getPendingRatings); 
ratingRouter.put('/approve/:reviewId', approveRating); 
ratingRouter.put('/reject/:reviewId', rejectRating);   
ratingRouter.get('/approved', getApprovedRatings);
ratingRouter.get('/rejected', getRejectedRatings);

export default ratingRouter;
