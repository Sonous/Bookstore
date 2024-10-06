import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import styles from './Header.module.css';
import images from '~/assets/images';
import { routes } from '~/config';
import Search from '~/component/Search/Search';
import Navigation from '~/component/Navigation/Navigation';
import { searchResult as cartResult } from '~/dataTemorary';
import { convertPriceToString, sum } from '~/utils/functions';
import PopperWrapper from '~/component/Popper/Popper';
import Book from '~/component/Book/Book';

const cx = classNames.bind(styles);

function Header() {
    const [cartInfo, setCartInfo] = useState([...cartResult]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });
    return (
        <header className={cx('wrapper')}>
            {windowWidth >= 1000 && (
                <div className={cx('inner')}>
                    <Link to={routes.home}>
                        <img src={images.logo} alt="logo" className={cx('logo')} />
                    </Link>

                    <Navigation />

                    <Search />

                    <div className={cx('action')}>
                        <TippyHeadless
                            interactive
                            placement="bottom"
                            render={() => (
                                <PopperWrapper className={cx('cart-popper')}>
                                    <div className={cx('cart-header')}>
                                        <span>{`Giỏ hàng (${sum(cartInfo, 'quantity')})`}</span>
                                    </div>
                                    <div className={cx('cart-items')}>
                                        {cartInfo.map((item, index) => {
                                            return <Book key={index} {...item} cart />;
                                        })}
                                    </div>
                                    <div className={cx('cart-footer')}>
                                        <div className={cx('total')}>
                                            <span>Tổng cộng:</span>
                                            <span className={cx('price')}>
                                                {convertPriceToString(sum(cartInfo, 'currentPrice'))}
                                            </span>
                                        </div>
                                        <button className={cx('more')}>Xem giỏ hàng</button>
                                    </div>
                                </PopperWrapper>
                            )}
                            hideOnClick={false}
                        >
                            <button className={cx('cart-btn')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />
                                <span>Giỏ hàng</span>
                                <div className={cx('quantity')}>
                                    <span>{sum(cartInfo, 'quantity')}</span>
                                </div>
                            </button>
                        </TippyHeadless>

                        <TippyHeadless
                            interactive
                            placement="bottom"
                            render={() => (
                                <PopperWrapper className={cx('user-popper')}>
                                    <div className={cx('menu-item')}>
                                        <img src={images.userIcon} alt="user icon" />
                                        <span className={cx('title')}>Xem thông tin tài khoản</span>
                                    </div>
                                    <div className={cx('menu-item')}>
                                        <img src={images.orderIcon} alt="order icon" />
                                        <span className={cx('title')}>Đơn hàng của tôi</span>
                                    </div>
                                    <div className={cx('menu-item')}>
                                        <img src={images.heartIcon} alt="heart icon" />
                                        <span className={cx('title')}>Xem sản phẩm yêu thích</span>
                                    </div>
                                    <div className={cx('menu-item', 'logout')} onClick={() => navigate('/signIn')}>
                                        <img src={images.logoutIcon} alt="logout icon" />
                                        <span className={cx('title')}>Đăng xuất</span>
                                    </div>
                                </PopperWrapper>
                            )}
                            hideOnClick={false}
                        >
                            <button className={cx('user-btn')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                <span>Tài khoản</span>
                            </button>
                        </TippyHeadless>
                    </div>
                </div>
            )}

            {windowWidth < 1000 && (
                <div className="flex flex-col items-center w-full p-4">
                    <Link to={routes.home}>
                        <img src={images.logo} alt="logo" className={cx('logo')} />
                    </Link>
                    <div className="flex justify-between mt-3 w-full">
                        <Navigation burger /> 
                        
                        <Search />

                        <div className='flex gap-3'>
                            <span className='flex items-center'>
                                <FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />
                            </span>
                            <span className='flex items-center'>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
