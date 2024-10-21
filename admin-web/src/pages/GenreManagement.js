import React from 'react';
import { routes } from '~/configs';
import Aside from '~/layouts/Aside/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function GenreManagement() {
    return (
        <DefaultLayout AsideElement={<Aside position={routes.theloai} />}>
            <div>GenreManagement</div>
        </DefaultLayout>
    );
}
