import { StatusCodes } from 'http-status-codes';
import { Book, BookImage, Genre } from '../models/index.js';

const getBookById = (req, res) => {
    const id = req.params.id;

    Book.findOne({
        where: {
            book_id: id,
        },
        include: BookImage,
    })
        .then((book) => res.status(StatusCodes.OK).json(book))
        .catch((err) =>
            res.status(StatusCodes.NOT_FOUND).json({
                message: err.message,
            }),
        );
};

const getGenreOfBook = (req, res) => {
    const id = req.params.id;

    Book.findAll({
        where: {
            book_id: id,
        },
        include: {
            model: Genre,
            attributes: ['genre_name'],
            through: { attributes: [] },
        },
    })
        .then((book) => res.status(StatusCodes.OK).json(book))
        .catch((err) =>
            res.status(StatusCodes.NOT_FOUND).json({
                message: err.message,
            }),
        );
};

export { getBookById, getGenreOfBook };
