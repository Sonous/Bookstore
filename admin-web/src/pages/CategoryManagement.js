import React from 'react';
import { routes } from '~/configs';
import Aside from '~/layouts/Aside/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function CategoryManagement() {
    return (
        <DefaultLayout AsideElement={<Aside position={routes.danhmuc} />}>
            <div>CategoryManagement</div>
        </DefaultLayout>
    );
}
