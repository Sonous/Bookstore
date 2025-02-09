import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Kiểm tra trạng thái đăng nhập
    return isAuthenticated ? children : <Navigate to="/signIn" />;
};

export default PrivateRoute;
