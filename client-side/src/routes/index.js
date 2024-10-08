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
import BlogPage from '~/pages/BlogPage/BlogPage';

import SearchResultPage from '~/pages/SearchResultPage';

const Pages = [
    { path: routes.home, Component: HomePage },
    { path: routes.signIn, Component: SignInPage },
    { path: routes.cart, Component: CartPage },
    { path: routes.bookDetail, Component: BookDetail },
    { path: routes.user, Component: User },
    { path: routes.usercheck, Component: UserPage },
    { path: routes.paying, Component: PayingPage },

    { path: routes.dieuKhoan, Component: DieuKhoan },
    { path: routes.chinhSachBaoMat, Component: ChinhSachBaoMat },
    { path: routes.huongDanDatHang, Component: HuongDanDatHang },
    { path: routes.lienHe, Component: LienHe },
    { path: routes.chinhSachDoiTra, Component: ChinhSachDoiTra },
    { path: routes.phuongThucVanChuyen, Component: PhuongThucVanChuyen },

    { path: routes.collections, Component: CollectionsPage },

    { path: routes.blog, Component: BlogPage },

    { path: routes.results, Component: SearchResultPage },
];

export default Pages;
