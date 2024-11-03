import express from 'express';
import { addQuantity, deleteCartItem, subQuantity } from '../controllers/cart.controller.js';

const cartRouter = express.Router();
cartRouter.route('/addQuantity').post(addQuantity);
cartRouter.route('/subQuantity').post(subQuantity);
cartRouter.route('/deleteCartItem').post(deleteCartItem);
export default cartRouter;
