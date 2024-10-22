import React from 'react';
import { routes } from '~/configs';
import Aside from '~/layouts/Aside/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function Home() {
    return (
        <DefaultLayout AsideElement={<Aside position={routes.home} />}>
            <div>Home</div>
        </DefaultLayout>
    );
}
