import Home from '~/pages/Home';
import { routes } from '../configs';
import Login from '~/pages/Login';
import PrivateRoute from './PrivateRoute';
import Register from '~/pages/Register';
import UserManagement from '~/pages/UserManagement';
import BookManagement from '~/pages/BookManagement';
import CategoryManagement from '~/pages/CategoryManagement';
import GenreManagement from '~/pages/GenreManagement';
import PayingManagement from '~/pages/PayingManagement';
import TransportManagement from '~/pages/TransportManagement';

const Pages = [
    { path: routes.home, Component: Home, PrivateRoute: PrivateRoute },
    { path: routes.nguoidung, Component: UserManagement, PrivateRoute: PrivateRoute },
    { path: routes.sach, Component: BookManagement, PrivateRoute: PrivateRoute },
    { path: routes.danhmuc, Component: CategoryManagement, PrivateRoute: PrivateRoute },
    { path: routes.theloai, Component: GenreManagement, PrivateRoute: PrivateRoute },
    { path: routes.phuongthucthanhtoan, Component: PayingManagement, PrivateRoute: PrivateRoute },
    { path: routes.phuongthucvanchuyen, Component: TransportManagement, PrivateRoute: PrivateRoute },
    { path: routes.login, Component: Login },
    { path: routes.register, Component: Register },
];

export default Pages;
