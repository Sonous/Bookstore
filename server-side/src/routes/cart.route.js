import express from 'express';
import { getCartItemFromUser } from '../controllers/cart.controller.js';

const cartRouter = express.Router();
cartRouter.route('/').post(getCartItemFromUser);
export default cartRouter;
