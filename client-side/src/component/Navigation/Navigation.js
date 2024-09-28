import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';
import { categories, news } from '~/dataTemorary';
import PopperWrapper from '../Popper/Popper';
import { convertToSlug } from '~/utils/functions';

const cx = classNames.bind(styles);

function Navigation() {
    useEffect(() => {
        // Call API to take categories
        // Provide title to navigate to category details
    }, []);

    return (
        <nav className={cx('navigator')}>
            <TippyHeadless
                interactive
                offset={[50, 23]}
                placement="bottom"
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('categories-popper')}>
                            {categories.map((category, index) => {
                                return (
                                    <div key={index}>
                                        <h4 className={cx('title')}>{category.title}</h4>
                                        {category.genres.map((genre) => (
                                            <li className={cx('genre')}>
                                                <Link
                                                    to={`/categories/${convertToSlug(category.title)}/${convertToSlug(
                                                        genre,
                                                    )}`}
                                                >
                                                    {genre}
                                                </Link>
                                            </li>
                                        ))}
                                        {category.isContinue ? (
                                            <Link to={`/categories/${convertToSlug(category.title)}`}>
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
                                <Link to={`/blogs/${convertToSlug(title)}`} key={index} className={cx('news-member')}>
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
    );
}

export default Navigation;
