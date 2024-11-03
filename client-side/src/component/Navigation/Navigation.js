import classNamesBind from 'classnames/bind';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';
import PopperWrapper from '../Popper/Popper';
import { request } from '~/config';

const cx = classNamesBind.bind(styles);

const news = ['Hoạt động', 'Tin sách', 'Sự kiện'];

const mobileNews = [
    {
        genre_name: 'Hoạt động',
    },
    {
        genre_name: 'Tin sách',
    },
    {
        genre_name: 'Sự kiện',
    },
];

function Navigation({ burger = false }) {
    const [collections, setCollections] = useState([]);
    const [showCollection, setShowCollection] = useState();
    const [showCollections, setShowCollections] = useState(false);
    const [showNews, setShowNews] = useState(false);

    const menuRef = useRef();

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setShowCollections(false);
    };

    useEffect(() => {
        if (showCollections) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showCollections]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await request.get('/category', {
                    params: {
                        limit: 5,
                    },
                });
                setCollections(result);
            } catch (error) {
                throw new Error(error.message);
            }
        };

        fetchApi();
    }, []);

    return (
        <>
            {!burger && (
                <nav className={cx('navigator')}>
                    <div>
                        <TippyHeadless
                            interactive
                            offset={[50, 23]}
                            placement="bottom"
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <PopperWrapper className={cx('categories-popper')}>
                                        {collections.map((collection, index) => {
                                            return (
                                                <div key={index}>
                                                    <h4 className={cx('title', 'font-bold text-xl')}>
                                                        {collection.category_name}
                                                    </h4>
                                                    {collection.genres.map((genre, index) => {
                                                        return (
                                                            index < 4 && (
                                                                <li className={cx('genre')} key={index}>
                                                                    <Link
                                                                        to={`/collections/${collection.category_name}/${genre.genre_name}`}
                                                                    >
                                                                        {genre.genre_name}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        );
                                                    })}
                                                    {collection.genres.length > 4 ? (
                                                        <Link to={`/collections/${collection.category_name}`}>
                                                            <span className={cx('more')}>Xem thêm</span>
                                                        </Link>
                                                    ) : (
                                                        []
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </PopperWrapper>
                                </div>
                            )}
                            hideOnClick={false}
                            onShow={() => setShowCollections(true)}
                            onHide={() => setShowCollections(false)}
                        >
                            <div className={cx('category')}>
                                <span
                                    className={classNames('transition-all', {
                                        'text-primary-color': showCollections,
                                    })}
                                >
                                    Danh mục
                                </span>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={cx('icon transition-all', {
                                        'text-primary-color rotate-180': showCollections,
                                    })}
                                />
                            </div>
                        </TippyHeadless>
                    </div>

                    <TippyHeadless
                        interactive
                        offset={[50, 23]}
                        placement="bottom"
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <PopperWrapper className={cx('news-popper')}>
                                    {news.map((title, index) => (
                                        <Link to={`/blogs/${title}`} key={index} className={cx('news-member')}>
                                            <li>{title}</li>
                                        </Link>
                                    ))}
                                </PopperWrapper>
                            </div>
                        )}
                        hideOnClick={false}
                        onShow={() => setShowNews(true)}
                        onHide={() => setShowNews(false)}
                    >
                        <div className={cx('news')}>
                            <span
                                className={classNames('transition-all', {
                                    'text-primary-color': showNews,
                                })}
                            >
                                Tin tức
                            </span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={cx('icon transition-all', {
                                    'text-primary-color rotate-180': showNews,
                                })}
                            />
                        </div>
                    </TippyHeadless>
                </nav>
            )}

            {burger && (
                <nav className="flex items-center">
                    <span className="text-2xl flex items-center" onClick={() => setShowCollections(true)}>
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    {showCollections && (
                        <>
                            <div className="fixed z-50 top-0 left-0 h-full w-60 p-4 bg-white" ref={menuRef}>
                                <div className="flex justify-end pb-4">
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className="w-6 h-6"
                                        onClick={() => setShowCollections(false)}
                                    />
                                </div>
                                {[...collections, { category_name: 'Tin tức', genres: [...mobileNews] }].map(
                                    (collection, index) => {
                                        return (
                                            <div key={index}>
                                                <div
                                                    className={classNames('flex items-center', {
                                                        'text-primary-color': index === showCollection,
                                                    })}
                                                    onClick={() =>
                                                        setShowCollection((prev) => (prev === index ? null : index))
                                                    }
                                                >
                                                    <span className="flex-1 text-lg font-semibold">
                                                        {collection.category_name}
                                                    </span>
                                                    {index === showCollection ? (
                                                        <FontAwesomeIcon icon={faChevronUp} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faChevronDown} />
                                                    )}
                                                </div>
                                                {index === showCollection && (
                                                    <div className="pl-4">
                                                        {collection.genres.map((genre, index) => {
                                                            return collection.category_name !== 'Tin tức' ? (
                                                                <li className={cx('genre', 'list-none')} key={index}>
                                                                    <Link
                                                                        to={`/collections/${collection.category_name}/${genre.genre_name}`}
                                                                    >
                                                                        {genre.genre_name}
                                                                    </Link>
                                                                </li>
                                                            ) : (
                                                                <Link
                                                                    to={`/blogs/${genre.genre_name}`}
                                                                    key={index}
                                                                    className={cx('genre', 'list-none')}
                                                                >
                                                                    <li>{genre.genre_name}</li>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                            <div className="fixed top-0 left-0 bottom-0 right-0 bg-outside-menu-bg z-40"></div>
                        </>
                    )}
                </nav>
            )}
        </>
    );
}

export default Navigation;
