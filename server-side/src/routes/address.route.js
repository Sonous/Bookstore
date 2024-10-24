import express from 'express';
import { getAddressByUser, updateAddress } from '../controllers/address.controller.js';
// import express from 'express';
// import { getAddressByUser } from '../controllers/address.controller.js';

// const addressRouter = express.Router();

addressRouter.get('/:userId', getAddressByUser);

addressRouter.put('/address/:addressId', updateAddress);
// addressRouter.get('/:userId', getAddressByUser);

export default addressRouter;
