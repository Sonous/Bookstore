import { routes } from '../configs';
import Login from '~/pages/Login';
import PrivateRoute from './PrivateRoute';
import Register from '~/pages/Register';
import ReviewManagement from '~/pages/ReviewManagement/ReviewManagement';
import Home from '~/pages/Home';

const Pages = [
    { path: routes.home, Component: Home, PrivateRoute: PrivateRoute },
    { path: routes.quanLiDanhGia, Component: ReviewManagement, PrivateRoute: PrivateRoute },
    { path: routes.login, Component: Login },
    { path: routes.register, Component: Register },
];

export default Pages;
