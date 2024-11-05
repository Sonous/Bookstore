import React from 'react';
import Aside from '~/layouts/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function Home() {
    return (
        <DefaultLayout AsideElement={<Aside selectedKey={'Tổng quan'} />}>
            <div>Home</div>
        </DefaultLayout>
    );
}
