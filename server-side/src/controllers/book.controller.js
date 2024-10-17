import { StatusCodes } from 'http-status-codes';
import { Book, BookImage, Category, Genre } from '../models/index.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';

const properties = {
    attributes: {
        exclude: [
            'book_available',
            // 'book_sold',
            'book_rating_num',
            'book_description',
            'book_author',
            'book_format',
            'book_page_num',
            'book_collection',
        ],
    },
    include: {
        model: BookImage,
        attributes: ['book_image_url'],
        limit: 1,
    },
};

// const getBookById = (req, res) => {
//     const id = req.params.id;

//     Book.findOne({
//         where: {
//             book_id: id,
//         },
//         include: BookImage,
//     })
//         .then((book) => res.status(StatusCodes.OK).json(book))
//         .catch((err) =>
//             res.status(StatusCodes.NOT_FOUND).json({
//                 message: err.message,
//             }),
//         );
// };

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
        .then((books) => res.status(StatusCodes.OK).json(books))
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
                ...properties,
                where: {
                    book_name: {
                        [Op.like]: `%${req.query.q}%`,
                    },
                },
                limit: parseInt(req.query.limit) || null,
            })
                .then((books) => res.status(StatusCodes.OK).json(books))
                .catch((err) =>
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: err.message,
                    }),
                );
            break;
        case 'genre':
            if (!Array.isArray(req.query.genres)) {
                req.query.genres = [req.query.genres];
            }
            Book.findAll({
                ...properties,
                where: {
                    [Op.and]: [
                        sequelize.literal(
                            `not exists(select *
                                    from genre
                                    where genre_name in (${req.query.genres.map((genre) => `'${genre}'`).join(', ')})
                                    and not exists (select *
                                                  from bookgenre
                                                  where bookgenre.book_id = book.book_id
                                                  and bookgenre.genre_id = genre.genre_id)
                        )`,
                        ),
                    ],
                },
                limit: parseInt(req.query.limit) || null,
            })
                .then((books) => res.status(StatusCodes.OK).json(books))
                .catch((err) =>
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: err.message,
                    }),
                );
            break;
        case 'category':
            Book.findAll({
                ...properties,
                include: [
                    {
                        model: Genre,
                        attributes: [],
                        through: { attributes: [] },
                        include: {
                            model: Category,
                            attributes: [],
                            where: {
                                category_name: req.query.category,
                            },
                        },
                        required: true,
                    },
                    properties.include,
                ],
            })
                .then((books) =>
                    res.status(StatusCodes.OK).json(
                        req.query.limit
                            ? books.filter((book, index) => {
                                  return index < req.query.limit;
                              })
                            : books,
                    ),
                )
                .catch((err) =>
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: err.message,
                    }),
                );
            break;
        case 'Sách mới':
            Book.findAll({
                ...properties,
                order: [['created_at', 'DESC']],
                limit: parseInt(req.query.limit) || null,
            })
                .then((books) => res.status(StatusCodes.OK).json(books))
                .catch((err) =>
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: err.message,
                    }),
                );
            break;
        case 'Sách bán chạy':
            Book.findAll({
                ...properties,
                order: [['book_sold', 'DESC']],
                limit: parseInt(req.query.limit) || null,
            })
                .then((books) => res.status(StatusCodes.OK).json(books))
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
                .then((books) => res.status(StatusCodes.OK).json(books))
                .catch((err) =>
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: err.message,
                    }),
                );
    }
};

export { getGenreOfBook, getAllBooks };
