import express from 'express';
import { saveOrder, countOrders, updateOrder, getOrderById } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.route('/').post(saveOrder).get(countOrders);

orderRouter.route('/:orderId').post(updateOrder).get(getOrderById);

export default orderRouter;
