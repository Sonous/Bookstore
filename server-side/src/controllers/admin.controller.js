import { StatusCodes } from 'http-status-codes';
import Admin from '../models/admin.model.js';

const getAdminByToken = async (req, res) => {
    const admin_id = req.userId;
    const role = req.role;

    try {
        const admin = await Admin.findByPk(admin_id, {
            where: {
                role,
            },
            attributes: {
                exclude: ['admin_password'],
            },
        });

        if (admin) {
            return res.status(StatusCodes.ACCEPTED).json(admin);
        } else return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Admin do not exist!' });
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            message: error.message,
        });
    }
};

export { getAdminByToken };
