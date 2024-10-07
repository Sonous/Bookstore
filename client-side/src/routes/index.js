import { routes } from '~/config';
import BookDetail from '~/pages/BookDetail';
import CartPage from '~/pages/CartPage';
import PayingPage from '~/pages/PayingPage/PayingPage';
import HomePage from '~/pages/HomePage/HomePage';
import SignInPage from '~/pages/SignInPage';
import UserPage from '~/pages/User/UserCard';
import User from '~/pages/User/UserPage';
import CollectionsPage from '~/pages/CollectionsPage';
import BlogPage from '~/pages/BlogPage/BlogPage';

const Pages = [
    { path: routes.home, Component: HomePage },
    { path: routes.signIn, Component: SignInPage },
    { path: routes.cart, Component: CartPage },
    { path: routes.bookDetail, Component: BookDetail },
    { path: routes.user, Component: User },
    { path: routes.usercheck, Component: UserPage },

    { path: routes.paying, Component: PayingPage },
    { path: routes.collections, Component: CollectionsPage },

    { path: routes.blog, Component: BlogPage },
];

export default Pages;
