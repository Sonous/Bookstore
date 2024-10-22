import express from 'express';
import { getAddress } from '../controllers/address.controller.js';

const addressRouter = express.Router();
addressRouter.route('/').post(getAddress);
export default addressRouter;
