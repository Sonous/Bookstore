import { StatusCodes } from 'http-status-codes';
import TransportMethod from '../models/transportMethod.model.js';

const getTransportMethodByPk = (req, res) => {
    const { id } = req.params;

    TransportMethod.findByPk(id)
        .then((method) => res.status(StatusCodes.OK).json(method))
        .catch((err) =>
            res.status(StatusCodes.NOT_FOUND).json({
                message: err.message,
            }),
        );
};

export { getTransportMethodByPk };
