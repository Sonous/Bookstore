import express from 'express';
import { getOrderById, getOrderByUser, saveOrder } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/:userId', getOrderByUser);
orderRouter.get('/:Id', getOrderById);
orderRouter.route('/').post(saveOrder);

export default orderRouter;
