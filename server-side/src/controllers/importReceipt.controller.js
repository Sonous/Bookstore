import { Op } from 'sequelize';
import ImportReceipt from '../models/importReceipt.model.js';
import { v4 as uuidv4 } from 'uuid';

export const createImportReceipt = async (req, res) => {
    try {
        const { data } = req.body;

        await ImportReceipt.create({
            id: uuidv4(),
            ...data,
        });

        res.status(200).json({
            message: 'create successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getImportReceipts = async (req, res) => {
    try {
        const { status } = req.query;

        const whereClause = {};

        if (status !== 'Tất cả') {
            whereClause.receipt_status = {
                [Op.like]: `${status}%`,
            };
        }

        const data = await ImportReceipt.findAll({
            where: {
                ...whereClause,
            },
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateReceipt = async (req, res) => {
    try {
        const { data } = req.body;
        const { receiptId } = req.params;

        await ImportReceipt.update(
            {
                ...data,
            },
            {
                where: {
                    id: receiptId,
                },
            },
        );

        res.status(200).json({
            message: 'success',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
