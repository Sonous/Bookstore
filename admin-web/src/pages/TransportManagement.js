import React from 'react';
import { routes } from '~/configs';
import Aside from '~/layouts/Aside/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function TransportManagement() {
    return (
        <DefaultLayout AsideElement={<Aside position={routes.phuongthucvanchuyen} />}>
            <div>TransportManagement</div>
        </DefaultLayout>
    );
}
