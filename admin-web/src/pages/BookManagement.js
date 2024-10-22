import React from 'react';
import { routes } from '~/configs';
import Aside from '~/layouts/Aside/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function BookManagement() {
    return (
        <DefaultLayout AsideElement={<Aside position={routes.sach} />}>
            <div>BookManagement</div>
        </DefaultLayout>
    );
}
