import express from 'express';
import { register, login, registerAdmin, loginAdmin } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Đăng ký
authRouter.post('/register', register);

// Đăng nhập
authRouter.post('/login', login);

// Đăng ký admin
authRouter.post('/admin/register', registerAdmin);

// Đăng nhập admin
authRouter.post('/admin/login', loginAdmin);

export default authRouter;
