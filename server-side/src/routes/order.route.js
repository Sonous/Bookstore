import express from 'express';
import { saveOrder } from '../controllers/order.controller.js';

const orderRouter = express.Router();

// orderRouter.get('/:userId', getOrderByUser);

orderRouter.route('/').post(saveOrder);

export default orderRouter;
