import React from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from '~/layouts/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';

export default function WarehouseManagement() {
    const navigate = useNavigate();

    return (
        <DefaultLayout AsideElement={<Aside openedKey={'Sách'} selectedKey={'Quản lí kho hàng'} />}>
            <div className="flex flex-col p-12 gap-5">
                <p className="text-2xl font-bold">Quản lý kho hàng</p>

                <div className="flex flex-col gap-2">
                    <div>
                        <span
                            className="underline underline-offset-4 cursor-pointer  hover:text-sky-500 hover:font-semibold"
                            onClick={() => navigate('/quan-li-kho-hang/danh-sach-san-pham')}
                        >
                            Danh sách sản phẩm
                        </span>
                    </div>
                    <div>
                        <span
                            className="underline underline-offset-4 cursor-pointer  hover:text-sky-500 hover:font-semibold"
                            onClick={() => navigate('/quan-li-kho-hang/phieu-nhap')}
                        >
                            Quản lí phiếu nhập
                        </span>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
