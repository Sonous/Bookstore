import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import styles from './Search.module.css';
import PopperWrapper from '../Popper/Popper';
import { searchResult as result } from '~/dataTemorary';
import Book from '../Book/Book';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(result);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const searchRef = useRef();

    // useEffect(() => {
    //     // if (!searchValue.trim()) {
    //     //     setSearchResult([]);
    //     //     return;
    //     // }
    //     // Call API
    // }, [searchValue]);

    const handleMouseOver = () => {
        searchRef.current.classList.add(cx('active'));
    };
    const handleMouseLeave = () => {
        searchRef.current.classList.remove(cx('active'));
    };

    return (
        <div>
            <TippyHeadless
                visible={showResult && searchResult.length}
                interactive
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
                hideOnClick={false}
                onClickOutside={() => setShowResult(false)}
            >
                <div className={cx('wrapper')} ref={searchRef}>
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
                        <button className={cx('clear')} onClick={() => setSearchValue('')}>
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
