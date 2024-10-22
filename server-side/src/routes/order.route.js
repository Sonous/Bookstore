import express from 'express';
import { getOrderByUser } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/:userId', getOrderByUser);

export default orderRouter;
