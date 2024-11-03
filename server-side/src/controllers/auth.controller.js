import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Admin from '../models/admin.model.js';
import User from '../models/user.model.js';

dotenv.config();

const register = async (req, res) => {
    const { user_name, user_phone, user_email, user_password, user_avatar_url } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ where: { user_email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng!' });
        }

        // Tạo người dùng mới
        const newUser = await User.create({
            user_name,
            user_phone,
            user_email,
            user_password,
            user_avatar_url,
        });

        return res.status(201).json({ message: 'Đăng ký thành công!', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng ký', error });
    }
};

const login = async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        // Kiểm tra email
        const user = await User.findOne({ where: { user_email } });
        if (!user) {
            return res.status(400).json({ message: 'Sai email hoặc mật khẩu!' });
        }

        // So sánh mật khẩu
        if (user.user_password !== user_password) {
            return res.status(400).json({ message: 'Sai email hoặc mật khẩu!' });
        }

        //  JWT
        const token = jwt.sign({ id: user.user_id, email: user.user_email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(200).json({ message: 'Đăng nhập thành công!', token });
    } catch (error) {
        console.error('Lỗi:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập', error });
    }
};

const registerAdmin = async (req, res) => {
    const { admin_username, admin_password } = req.body;

    try {
        const isExisted = await Admin.findOne({
            where: {
                admin_username,
            },
        });

        if (isExisted) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Username has aldready existed!',
            });
        }

        const admin = await Admin.create({
            admin_username,
            admin_password,
            admin_avatar_url: '',
        });

        return res.status(StatusCodes.CREATED).json({
            message: 'Register successfully!',
            admin,
        });
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            message: error.message,
        });
    }
};

const loginAdmin = async (req, res) => {
    const { admin_username, admin_password } = req.body;

    try {
        const admin = await Admin.findOne({
            where: {
                admin_username,
                admin_password,
            },
        });

        if (!admin) {
            return res.status(400).json({ message: 'Wrong email or password!' });
        }

        const token = jwt.sign(
            {
                id: admin.admin_id,
                admin_username: admin.admin_username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            },
        );

        return res.status(StatusCodes.ACCEPTED).json({
            token,
        });
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            message: error.message,
        });
    }
};

export { register, login, registerAdmin, loginAdmin };
