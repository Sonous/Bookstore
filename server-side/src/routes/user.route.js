import express from 'express';
import * as UserController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.route('/').get(UserController.getUserByToken);

userRouter.route('/:userId').get(UserController.getUserById);

userRouter.route('/:userId/cart').get(UserController.getCartItems);

export default userRouter;
