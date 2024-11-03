import React, { useContext } from 'react';
import { AdminContext } from '~/context/AdminContextProvider';
import Aside from '~/layouts/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';
import Home from './Home';
import ReviewManagement from './ReviewManagement/ReviewManagement';

export default function AdminPage() {
    const { page } = useContext(AdminContext);

    const showPage = () => {
        switch (page) {
            case 'ReviewManagement':
                return <ReviewManagement />;
            default:
                return <Home />;
        }
    };

    return <DefaultLayout AsideElement={<Aside />}>{showPage()}</DefaultLayout>;
}
