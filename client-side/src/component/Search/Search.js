import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import mapper from 'object-mapper';

import styles from './Search.module.css';
import PopperWrapper from '../Popper/Popper';
import Book from '../Book/Book';
import { Link, useNavigate } from 'react-router-dom';
// import { useDebounce } from '~/hooks';
// import callApi from '~/apis';
import { searchResult as result } from '~/dataTemorary';

const cx = classNames.bind(styles);

// const map = {
//     book_id: 'id',
//     book_name: 'title',
//     book_end_cost: 'currentPrice',
//     book_image_name: 'image',
// };

function Search({ className }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const searchRef = useRef();

    // const debounced = useDebounce(searchValue, 500);

    // useEffect(() => {
    //     if (!searchValue.trim()) {
    //         setSearchResult([]);
    //         return;
    //     }

    //     // Call Api
    //     const fetchApi = async () => {
    //         setLoading(true);

    //         const res = await callApi.search(debounced);

    //         setSearchResult(res.map((book) => mapper(book, map)));

    //         setLoading(false);
    //     };

    //     fetchApi();

    //     // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    // }, [debounced]);

    const handleMouseOver = () => {
        searchRef.current.classList.add(cx('active'));
    };
    const handleMouseLeave = () => {
        searchRef.current.classList.remove(cx('active'));
    };
    const handleNavigateToSearchPage = (e) => {
        if (e.key === 'Enter') {
            navigate(`/results?q=${searchValue}&type=large`);
        }
    };

    return (
        <div className={className}>
            <TippyHeadless
                visible={showResult && searchResult.length}
                interactive
                // zIndex={49}
                placement="bottom"
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs} className={cx('search-container')}>
                        <PopperWrapper className={cx('search-popper')}>
                            <h4 className={cx('result-header')}>Sản phẩm</h4>
                            {searchResult.map((item, index) => {
                                return <Book key={index} search {...item} />;
                            })}
                            <Link to={`/books/${searchValue}`}>
                                <span className={cx('more')}>Xem thêm</span>
                            </Link>
                            {/* Logic xem thêm khi gọi API */}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
            >
                <div className={cx('wrapper')} ref={searchRef} onKeyDown={handleNavigateToSearchPage}>
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>

                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value.trimStart())}
                        // onKeyDown={} handle when use enter to request
                        onFocus={() => setShowResult(true)}
                        type="text"
                        placeholder="Tìm kiếm..."
                        onMouseOver={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                    />

                    {searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                </div>
            </TippyHeadless>
        </div>
    );
}

export default Search;
