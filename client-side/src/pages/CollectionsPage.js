import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import Header from '~/layouts/Header/Header';

import Footer from '~/layouts/Footer/Footer';
import Result from '~/component/Result';
import { useEffect, useState } from 'react';
import { request } from '~/config';

function CollectionsPage() {
    const { collection, genre = '' } = useParams();
    const [selectedCollection, setSelectedCollection] = useState(collection);
    const [selectedGenres, setSelectedGeners] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        setSelectedCollection(collection);
        setSelectedGeners([genre]);
    }, [collection, genre]);

    useEffect(() => {
        const fetchApi = () => {
            function getGenresOfCategory() {
                return request.get('/category', {
                    params: {
                        category: selectedCollection,
                    },
                });
            }

            function getBooksOfGenres() {
                return request.get('/book', {
                    params: {
                        genres: selectedGenres,
                        type: 'genre',
                    },
                });
            }

            function getBooksOfCategory() {
                return request.get('/book', {
                    params: {
                        category: selectedCollection,
                        type: 'category',
                    },
                });
            }

            function getBooksByCondition() {
                return request.get(`/book`, {
                    params: {
                        type: selectedCollection,
                    },
                });
            }

            function getBooks() {
                if (selectedGenres[0]) return getBooksOfGenres();
                if (selectedCollection === 'Sách mới' || selectedCollection === 'Sách bán chạy') {
                    return getBooksByCondition();
                }
                return getBooksOfCategory();
            }

            Promise.all([getGenresOfCategory(), getBooks()])
                .then((result) => {
                    if (selectedCollection === 'Sách mới' || selectedCollection === 'Sách bán chạy') {
                        setGenreList([
                            {
                                category_name: selectedCollection,
                                genres: [],
                            },
                        ]);
                    } else {
                        setGenreList(result[0]);
                    }
                    setBookList(result[1]);
                })
                .catch((err) => console.log(err.message));
        };

        fetchApi();
    }, [selectedCollection, selectedGenres]);

    return (
        <>
            <Header />
            <div className="w-full flex justify-center bg-main-bg-color py-5">
                <div className="w-main-width">
                    <div className="nav text-base font-semibold flex items-center gap-2">
                        <Link to="/">
                            <span className="hover:text-primary-color cursor-pointer transition-all">TRANG CHỦ</span>
                        </Link>
                        <FontAwesomeIcon icon={faChevronRight} className="text-xs font-medium" />
                        <span>{selectedCollection.toUpperCase()}</span>
                    </div>

                    <Result
                        category={genreList[0]}
                        selectedGenres={selectedGenres}
                        setSelectedGeners={setSelectedGeners}
                        data={bookList}
                        otherPage={selectedCollection === 'Sách mới' || selectedCollection === 'Sách bán chạy'}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CollectionsPage;
