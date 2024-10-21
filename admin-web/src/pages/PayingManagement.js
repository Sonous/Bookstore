import React from 'react';
import { routes } from '~/configs';
import Aside from '~/layouts/Aside/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function PayingManagement() {
    return (
        <DefaultLayout AsideElement={<Aside position={routes.phuongthucthanhtoan} />}>
            <div>PayingManagement</div>
        </DefaultLayout>
    );
}
