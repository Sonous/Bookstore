import { routes } from '~/config';
import BookDetail from '~/pages/BookDetail';
import CartPage from '~/pages/CartPage';
import PayingPage from '~/pages/PayingPage/PayingPage';
import HomePage from '~/pages/HomePage/HomePage';
import SignInPage from '~/pages/SignInPage';

import DieuKhoan from '~/pages/InformationPage/DieuKhoan';
import ChinhSachBaoMat from '~/pages/InformationPage/ChinhSachBaoMat';
import LienHe from '~/pages/InformationPage/LienHe';
import HuongDanDatHang from '~/pages/InformationPage/HuongDanDatHang';
import ChinhSachDoiTra from '~/pages/InformationPage/ChinhSachDoiTra';
import PhuongThucVanChuyen from '~/pages/InformationPage/PhuongThucVanChuyen';

import UserPage from '~/pages/User/UserCard';
import User from '~/pages/User/UserPage';
import CollectionsPage from '~/pages/CollectionsPage';

import SearchResultPage from '~/pages/SearchResultPage';
import OrderPage from '~/pages/OrderDetail/OrderDetailPage';
import BlogLayout from '~/pages/BlogPage/BlogLayout';

const Pages = [
    { path: routes.home, Component: HomePage },
    { path: routes.signIn, Component: SignInPage },
    { path: routes.signUp, Component: SignInPage },
    { path: routes.cart, Component: CartPage },
    { path: routes.bookDetail, Component: BookDetail },
    { path: routes.user, Component: User },
    { path: routes.usercheck, Component: UserPage },
    { path: routes.order, Component: OrderPage },
    { path: routes.paying, Component: PayingPage },

    { path: routes.dieuKhoan, Component: DieuKhoan },
    { path: routes.chinhSachBaoMat, Component: ChinhSachBaoMat },
    { path: routes.huongDanDatHang, Component: HuongDanDatHang },
    { path: routes.lienHe, Component: LienHe },
    { path: routes.chinhSachDoiTra, Component: ChinhSachDoiTra },
    { path: routes.phuongThucVanChuyen, Component: PhuongThucVanChuyen },

    { path: routes.collections, Component: CollectionsPage },

    { path: routes.blog, Component: BlogLayout },
    { path: routes.blogdetail, Component: BlogLayout },

    { path: routes.results, Component: SearchResultPage },
];

export default Pages;
