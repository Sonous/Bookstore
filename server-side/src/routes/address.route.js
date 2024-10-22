import express from 'express';
import { getAddressByUser } from '../controllers/address.controller.js';

const addressRouter = express.Router();

addressRouter.get('/:userId', getAddressByUser);

export default addressRouter;
