import { StatusCodes } from 'http-status-codes';
import { Book, BookImage, Category, Genre } from '../models/index.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';
import BookGenre from '../models/bookGenre.model.js';

const properties = {
    attributes: {
        exclude: [
            'book_available',
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
const getBookByName = (req, res) => {
    const name = req.params.name; // Get the book name from the route parameter
    Book.findOne({
        where: {
            book_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('book_name')), 'LIKE', name.toLowerCase()),
        },
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
        .then((book) => {
            // console.log('Fetched book:', book); // Log the fetched book
            if (!book) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: 'Book not found',
                });
            }
            res.status(StatusCodes.OK).json(book);
        })
        .catch((err) => {
            console.error('Error fetching book:', err); // Log error for debugging
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: err.message,
            });
        });
};
const getBooksByAuthor = (req, res) => {
    const author = req.params.author; // Get the author's name from the route parameter

    Book.findAll({
        where: {
            book_author: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('book_author')),
                'LIKE',
                author.toLowerCase(),
            ),
        },
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
        .then((books) => {
            if (!books || books.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: 'No books found for this author',
                });
            }
            res.status(StatusCodes.OK).json(books);
        })
        .catch((err) => {
            console.error('Error fetching books by author:', err); // Log error for debugging
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: err.message,
            });
        });
};

export const updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { data } = req.body;

        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({
                message: 'Sách không tồn tại!',
            });
        }

        await Book.update(
            {
                ...data,
            },
            {
                where: {
                    book_id: bookId,
                },
            },
        );

        res.status(200).json({ message: 'success' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export { getGenreOfBook, getAllBooks, getBookByName, getBooksByAuthor };
