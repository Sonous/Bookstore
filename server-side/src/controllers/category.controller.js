import { Category, Genre } from '../models/index.js';
import { StatusCodes } from 'http-status-codes';

const getAllCategories = (req, res) => {
    Category.findAll({
        where: req.query.category
            ? {
                  category_name: req.query.category,
              }
            : {},
        include: {
            model: Genre,
            limit: parseInt(req.query.limit) || null,
        },
    })
        .then((category) => res.status(StatusCodes.OK).json(category))
        .catch((err) =>
            res.status(StatusCodes.NOT_FOUND).json({
                message: err.message,
            }),
        );
};

export { getAllCategories };
