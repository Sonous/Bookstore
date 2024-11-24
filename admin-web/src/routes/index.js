import { routes } from '../configs';
import Login from '~/pages/Login';
import PrivateRoute from './PrivateRoute';
import Register from '~/pages/Register';
import ReviewManagement from '~/pages/ReviewManagement/ReviewManagement';
import Home from '~/pages/Home';
import WarehouseManagement from '~/pages/WarehouseManagement/WarehouseManagement';
import BooksManagement from '~/pages/WarehouseManagement/BooksManagement';
import ReceiptManagement from '~/pages/WarehouseManagement/ReceiptManagement';
import Provider from '~/pages/Provider';

const Pages = [
    { path: routes.home, Component: Home, PrivateRoute: PrivateRoute },
    { path: routes.quanLiDanhGia, Component: ReviewManagement, PrivateRoute: PrivateRoute },
    { path: routes.quanLiKhoHang, Component: WarehouseManagement, PrivateRoute: PrivateRoute },
    { path: routes.quanLiSach, Component: BooksManagement, PrivateRoute: PrivateRoute },
    { path: routes.quanLiPhieuNhap, Component: ReceiptManagement, PrivateRoute: PrivateRoute },
    { path: routes.provider, Component: Provider, PrivateRoute: PrivateRoute },
    { path: routes.login, Component: Login },
    { path: routes.register, Component: Register },
];

export default Pages;
