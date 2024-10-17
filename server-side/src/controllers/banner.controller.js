import { StatusCodes } from 'http-status-codes';
import Banner from '../models/banner.model.js';

const getBanners = (req, res) => {
    Banner.findAll()
        .then((banner) => res.status(StatusCodes.OK).json(banner))
        .catch((err) =>
            res.status(StatusCodes.NOT_FOUND).json({
                message: err.message,
            }),
        );
};

export { getBanners };
