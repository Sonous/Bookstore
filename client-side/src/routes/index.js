import { routes } from '~/config';
import HomePage from '~/pages/HomePage';
import SignInPage from '~/pages/SignInPage';
import SignUpPage from '~/pages/SignUpPage';

const Pages = [
    { path: routes.home, Component: HomePage },
    { path: routes.signIn, Component: SignInPage },
    { path: routes.signUp, Component: SignUpPage },
];

export default Pages;
