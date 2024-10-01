import React from 'react';
import Header from '~/layouts/Header/Header';
import { Checkbox } from 'antd';
export default function CartPage() {
    return (
        <div className="">
            <Header />
            <div className="px-24  h-[1000px]">
                <h2 className="pt-6 text-xl">GIỎ HÀNG (2 sản phẩm)</h2>
                <Checkbox>Checkbox</Checkbox>
            </div>
        </div>
    );
}
