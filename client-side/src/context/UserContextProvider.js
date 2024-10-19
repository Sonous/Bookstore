import { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '~/component/Loading';
import { request } from '~/config';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        login();
    }, []);

    const alertExpiredLogin = () => {
        Swal.fire({
            title: 'Phiên làm việc của bạn đã hết hạn!',
            text: 'Vui lòng đăng nhập lại',
            icon: 'warning',
        }).then(({ isConfirmed, isDismissed }) => {
            if (isConfirmed || isDismissed) {
                logout();
                setIsLoading(false);
            }
        });
    };

    const login = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoading(true);

            request
                .get('/user', {
                    headers: {
                        'x-access-token': token,
                    },
                })
                .then((userInfo) => {
                    setUser(userInfo);
                    setIsLoading(false);
                })
                .catch((err) => {
                    alertExpiredLogin();
                });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    return (
        <UserContext.Provider value={{ user, login, logout, setIsLoading, alertExpiredLogin, cartItems, setCartItems }}>
            {isLoading ? (
                <div className="h-svh flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <>{children}</>
            )}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
