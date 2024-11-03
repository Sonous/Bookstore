import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser,faBell } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import styles from './Header.module.css';
import images from '~/assets/images';
import { routes } from '~/config';
import Search from '~/component/Search/Search';
import Navigation from '~/component/Navigation/Navigation';
import { convertPriceToString, sum } from '~/utils/functions';
import PopperWrapper from '~/component/Popper/Popper';
import Book from '~/component/Book/Book';
import { UserContext } from '~/context/UserContextProvider';
import request, { imageUrl } from '~/config/axios.config';
import { notification } from 'antd';
import Notification from '~/component/Notification';

const cx = classNames.bind(styles);

function Header() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const { user, logout, setIsLoading, alertExpiredLogin, cartItems, setCartItems, isReloadCart, setIsReloadCart } =
        useContext(UserContext);
    const [notifications, setNotifications] = useState([]);

    

    useEffect(() => {
        const fetchApi = () => {
            if (!user) return;
            const token = localStorage.getItem('token');
            request
                .get(`/user/${user.user_id}/cart`, {
                    headers: {
                        'x-access-token': token,
                    },
                })
                .then((books) => {
                    setCartItems(books.length > 0 ? books[0].Cart : []);
                    setIsReloadCart(false);
                })
                .catch((err) => {
                    if (err.message === 'Unauthorized!') {
                        alertExpiredLogin();
                    }
                });
        };

        fetchApi();
    }, [user, isReloadCart]);

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    const handleLogout = () => {
        setIsLoading(true);
        navigate('/');
        logout();
        setTimeout(() => {
            setIsLoading(false);
        }, 50);

    };

    useEffect(() => {
        const fetchNotifications = async () => {
            
            try {
                const response = await request.get(`/notification/${user.user_id}`);
                setNotifications(response);
                // console.log("user:", user.user_id);
                // console.log("Thông báo của user:", notifications);
            } catch (error) {
                console.error("Lỗi khi load notification:", error);
            } 
        };

        fetchNotifications();
    }, [user]);

    return (
        <header className={cx('wrapper')}>
            {windowWidth >= 1000 ? (
                <div className={cx('inner')}>
                    <Link to={routes.home}>
                        <img src={images.logo} alt="logo" className={cx('logo')} />
                    </Link>

                    <Navigation />

                    <Search />

                    {user ? (
                        <div className={cx('action')}>
                            <div>
                            <TippyHeadless
                                    interactive
                                    placement="bottom"
                                    render={() => (
                                        <PopperWrapper className={cx('cart-popper')}>
                                            <div className={cx('cart-header')}>
                                                <span>{`Thông báo (${
                                                    notifications.length 
                                                })`}</span>
                                            </div>
                                            {notifications.length > 0 ? (
                                                <div>
                                                    <div className={cx('cart-items')}>
                                                        {notifications.map((item, index) => {
                                                            return <Notification key={index} {...item}  />;
                                                        })}
                                                    </div>
                                                    
                                                </div>
                                            ) : (
                                                <div className="w-72 flex flex-col items-center">
                                                    <img src={images.nothingIcon} alt="nothing" className="h-32 w-32" />
                                                    <span>Chưa có thông báo nào...</span>
                                                </div>
                                            )}
                                        </PopperWrapper>
                                    )}
                                    hideOnClick={false}
                                >
                                    <button className={cx('cart-btn')} >
                                        <FontAwesomeIcon className={cx('icon')} icon={faBell} />
                                        {notifications.length > 0 && (
                                            <div className={cx('quantity')}>
                                                <span>{notifications.length}</span>
                                            </div>
                                        )}
                                    </button>
                                </TippyHeadless>
                                </div>
                                
                            <div>
                                
                                <TippyHeadless
                                    interactive
                                    placement="bottom"
                                    render={() => (
                                        <PopperWrapper className={cx('cart-popper')}>
                                            <div className={cx('cart-header')}>
                                                <span>{`Giỏ hàng (${
                                                    cartItems.length > 0 ? sum(cartItems, 'cart') : 0
                                                })`}</span>
                                            </div>
                                            {cartItems.length > 0 ? (
                                                <div>
                                                    <div className={cx('cart-items')}>
                                                        {cartItems.map((item, index) => {
                                                            return <Book key={index} {...item} cartPopper />;
                                                        })}
                                                    </div>
                                                    <div className={cx('cart-footer')}>
                                                        <div className={cx('total')}>
                                                            <span>Tổng cộng:</span>
                                                            <span className={cx('price')}>
                                                                {convertPriceToString(sum(cartItems, 'book_end_cost'))}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className={cx('more')}
                                                                onClick={() => navigate('/cart')}
                                                            >
                                                                Xem giỏ hàng
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-72 flex flex-col items-center">
                                                    <img src={images.nothingIcon} alt="nothing" className="h-32 w-32" />
                                                    <span>Chưa có sản phẩm nào...</span>
                                                </div>
                                            )}
                                        </PopperWrapper>
                                    )}
                                    hideOnClick={false}
                                >
                                    <button className={cx('cart-btn')} onClick={() => navigate('/cart')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />
                                        {cartItems.length > 0 && (
                                            <div className={cx('quantity')}>
                                                <span>{sum(cartItems, 'cart')}</span>
                                            </div>
                                        )}
                                    </button>
                                </TippyHeadless>
                            </div>


                            <TippyHeadless
                                interactive
                                placement="bottom"
                                render={() => (
                                    <PopperWrapper className={cx('user-popper')}>
                                        <div className={cx('menu-item')} onClick={() => navigate('/user')}>
                                            <img src={images.userIcon} alt="user icon" />
                                            <span className={cx('title')}>Xem thông tin tài khoản</span>
                                        </div>
                                        <div className={cx('menu-item')} onClick={() => navigate('/order')}>
                                            <img src={images.orderIcon} alt="order icon" />
                                            <span className={cx('title')}>Đơn hàng của tôi</span>
                                        </div>
                                        <div className={cx('menu-item')} onClick={() => navigate('/favoritebooks')}>
                                            <img src={images.heartIcon} alt="heart icon" />

                                            <span className={cx('title')}>Xem sách yêu thích</span>
                                        </div>
                                        <div className={cx('menu-item', 'logout')} onClick={handleLogout}>
                                            <img src={images.logoutIcon} alt="logout icon" />
                                            <span className={cx('title')}>Đăng xuất</span>
                                        </div>
                                    </PopperWrapper>
                                )}
                                hideOnClick={false}
                            >
                                <button className={cx('user-btn')}>
                                    {user.user_avatar_url ? (
                                        <img
                                            src={`${imageUrl}/${user.user_avatar_url} `}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    ) : (
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    )}
                                </button>
                            </TippyHeadless>
                        </div>
                    ) : (
                        <div>
                            <span
                                className="mr-2 py-2 px-5 bg-primary-color text-white rounded-lg font-bold cursor-pointer hover:opacity-85"
                                onClick={() => navigate('/signIn')}
                            >
                                Đăng nhập
                            </span>
                        </div>
                    )}

                </div>
            ) : (
                <div className="flex flex-col items-center w-full p-4">
                    <Link to={routes.home}>
                        <img src={images.logo} alt="logo" className={cx('logo')} />
                    </Link>
                    <div className="flex justify-between mt-3 w-full">
                        <Navigation burger />

                        <Search />

                        {user ? (
                            <div className="flex gap-3">
                                <span className="flex items-center">
                                    <FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />
                                </span>
                                <span className="flex items-center">
                                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                </span>
                            </div>
                        ) : (
                            <TippyHeadless
                                interactive
                                placement="bottom"
                                render={() => (
                                    <PopperWrapper className={cx('user-popper')}>
                                        <div className="flex flex-col p-2 gap-1 w-40">
                                            <span
                                                className="py-2 bg-primary-color text-white rounded-lg font-bold cursor-pointer hover:opacity-85 text-center"
                                                onClick={() => navigate('/signIn')}
                                            >
                                                Đăng nhập
                                            </span>
                                        </div>
                                    </PopperWrapper>
                                )}
                                trigger="click"
                            >
                                <span className="flex items-center">
                                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                </span>
                            </TippyHeadless>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
