import { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import adminApi from '~/apis/adminApi';
import Loading from '~/components/Loading';

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAdminInfo();
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

    const getAdminInfo = async () => {
        try {
            setIsLoading(true);

            const adminInfo = await adminApi.getAdminByToken();

            setAdmin(adminInfo);
            setIsLoading(false);
        } catch (error) {
            alertExpiredLogin();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAdmin(null);
    };
    return (
        <AdminContext.Provider
            value={{
                admin,
                setAdmin,
                getAdminInfo,
                logout,
                setIsLoading,
                alertExpiredLogin,
            }}
        >
            {isLoading ? (
                <div className="h-svh flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <>{children}</>
            )}
        </AdminContext.Provider>
    );
};

export { AdminContext, AdminContextProvider };
