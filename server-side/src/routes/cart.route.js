import express from 'express';
import { addQuantity, subQuantity } from '../controllers/cart.controller.js';

const cartRouter = express.Router();
cartRouter.route('/addQuantity').post(addQuantity);
cartRouter.route('/subQuantity').post(subQuantity);
export default cartRouter;
