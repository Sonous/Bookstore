import classNamesBind from 'classnames/bind';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';
import { categories } from '~/dataTemorary';
import PopperWrapper from '../Popper/Popper';
// import { convertToSlug } from '~/utils/functions';

const cx = classNamesBind.bind(styles);

const news = ['Hoạt động', 'Tin sách', 'Sự kiện'];

function Navigation({ burger = false }) {
    const [collections, setCollections] = useState(categories);
    const [showCollection, setShowCollection] = useState();
    const [showCollections, setShowCollections] = useState(false);

    const menuRef = useRef();

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setShowCollections(false);
    };

    useEffect(() => {
        // Call API to take categories
        // Provide title to navigate to category details

        if (showCollections) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showCollections]);

    return (
        <>
            {!burger && (
                <nav className={cx('navigator')}>
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
                                                <h4 className={cx('title')}>{collection.title}</h4>
                                                {collection.genres.map((genre, index) => (
                                                    <li className={cx('genre')} key={index}>
                                                        <Link to={`/collections/${collection.title}/${genre}`}>
                                                            {genre}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {collection.isContinue ? (
                                                    <Link to={`/collections/${collection.title}`}>
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
                    >
                        <div className={cx('category')}>
                            <span>Danh mục</span>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} />
                        </div>
                    </TippyHeadless>

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
                    >
                        <div className={cx('news')}>
                            <span>Tin tức</span>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} />
                        </div>
                    </TippyHeadless>
                </nav>
            )}

            {burger && (
                <nav className='flex items-center'>
                    <span className="text-2xl flex items-center" onClick={() => setShowCollections(true)}>
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    {showCollections && (
                        <>
                            <div className="fixed z-50 top-0 left-0 h-full w-60 p-4 bg-white" ref={menuRef}>
                                <div className='flex justify-end pb-4'>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className="w-6 h-6"
                                        onClick={() => setShowCollections(false)}
                                    />
                                </div>
                                {[...collections, {title: 'Tin tức', genres: [...news]}].map((collection, index) => {
                                    return (
                                        <div key={index}>
                                            <div
                                                className={classNames('flex items-center', {
                                                    'text-primary-color': index === showCollection,
                                                })}
                                                onClick={() => setShowCollection((prev) => (prev === index ? null : index))}
                                            >
                                                <span className="flex-1 text-lg font-semibold">{collection.title}</span>
                                                {index === showCollection ? (
                                                    <FontAwesomeIcon icon={faChevronUp} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronDown} />
                                                )}
                                            </div>
                                            {index === showCollection && (
                                                <div className="pl-4">
                                                    {collection.genres.map((genre, index) => (
                                                        <div key={index} className='cursor-pointer'>{genre}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='fixed top-0 left-0 bottom-0 right-0 bg-outside-menu-bg z-40'></div>
                        </>
                        
                    )}
                </nav>
            )}
        </>
    );
}

export default Navigation;
