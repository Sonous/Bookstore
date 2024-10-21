import React from 'react';
import { routes } from '~/configs';
import Aside from '~/layouts/Aside/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function UserManagement() {
    return (
        <DefaultLayout AsideElement={<Aside position={routes.nguoidung} />}>
            <div>UserManagement</div>
        </DefaultLayout>
    );
}
