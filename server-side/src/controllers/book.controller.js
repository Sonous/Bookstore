import { StatusCodes } from 'http-status-codes';
import { Book, BookImage, Genre } from '../models/index.js';
import { Op } from 'sequelize';

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

const getAllBooks = (req, res) => {
    switch (req.query.type) {
        case 'search':
            Book.findAll({
                attributes: {
                    exclude: [
                        'book_available',
                        'book_sold',
                        'book_rating_num',
                        'book_description',
                        'book_author',
                        'book_format',
                        'book_page_num',
                        'book_collection',
                    ],
                },
                where: {
                    book_name: {
                        [Op.like]: `%${req.query.q}%`,
                    },
                },
                include: {
                    model: BookImage,
                    attributes: ['book_image_url'],
                    limit: 1,
                },
                limit: parseInt(req.query.limit) || null,
            })
                .then((book) => res.status(StatusCodes.OK).json(book))
                .catch((err) =>
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: err.message,
                    }),
                );
            break;
        default:
            Book.findAll({
                include: [
                    {
                        model: BookImage,
                        attributes: ['book_image_url'],
                    },
                    {
                        model: Genre,
                        attributes: ['genre_name'],
                        through: { attributes: [] },
                    },
                ],
            })
                .then((book) => res.status(StatusCodes.OK).json(book))
                .catch((err) =>
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: err.message,
                    }),
                );
    }
};

export { getBookById, getGenreOfBook, getAllBooks };
