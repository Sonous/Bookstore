import { routes } from '~/config';
import BookDetail from '~/pages/BookDetail';
import CartPage from '~/pages/CartPage';
import HomePage from '~/pages/HomePage/HomePage';
import PayingPage from '~/pages/PayingPage';
import SignInPage from '~/pages/SignInPage';
import SignUpPage from '~/pages/SignUpPage';

const Pages = [
    { path: routes.home, Component: HomePage },
    { path: routes.signIn, Component: SignInPage },
    { path: routes.signUp, Component: SignUpPage },
    { path: routes.cart, Component: CartPage },
    { path: routes.bookDetail, Component: BookDetail },
    { path: routes.paying, Component: PayingPage },
];

export default Pages;
