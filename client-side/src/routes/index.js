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



const Pages = [
    { path: routes.home, Component: HomePage },
    { path: routes.signIn, Component: SignInPage },
 
    { path: routes.cart, Component: CartPage },
    { path: routes.bookDetail, Component: BookDetail },
    { path: routes.paying, Component: PayingPage },

    { path: routes.dieuKhoan, Component: DieuKhoan },
    { path: routes.chinhSachBaoMat, Component: ChinhSachBaoMat },
    { path: routes.huongDanDatHang, Component: HuongDanDatHang },
    { path: routes.lienHe, Component: LienHe }, 
    { path: routes.chinhSachDoiTra, Component: ChinhSachDoiTra }, 
    { path: routes.phuongThucVanChuyen, Component: PhuongThucVanChuyen },
];

export default Pages;
