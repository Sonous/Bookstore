import { routes } from '../configs';
import Login from '~/pages/Login';
import PrivateRoute from './PrivateRoute';
import Register from '~/pages/Register';
import AdminPage from '~/pages';

const Pages = [
    { path: routes.home, Component: AdminPage, PrivateRoute: PrivateRoute },
    { path: routes.login, Component: Login },
    { path: routes.register, Component: Register },
];

export default Pages;
