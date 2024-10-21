import React, { useContext } from 'react';
import { BookOutlined, LogoutOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { SlBookOpen } from 'react-icons/sl';
import { BiBookAlt } from 'react-icons/bi';
import { MdOutlinePayment } from 'react-icons/md';
import { LiaShippingFastSolid } from 'react-icons/lia';

import { imageUrl } from '~/configs/axios.config';
import { AdminContext } from '~/context/AdminContextProvider';
import AsideTag from './AsideTag';
import { routes } from '~/configs';

const tags = [
    {
        Icon: UserOutlined,
        title: 'Người dùng',
        route: routes.nguoidung,
    },
    {
        Icon: BookOutlined,
        title: 'Sách',
        route: routes.sach,
    },
    {
        Icon: SlBookOpen,
        title: 'Danh mục',
        route: routes.danhmuc,
    },
    {
        Icon: BiBookAlt,
        title: 'Thể loại',
        route: routes.theloai,
    },
    {
        Icon: MdOutlinePayment,
        title: 'Phương thức thanh toán',
        size: 20,
        route: routes.phuongthucthanhtoan,
    },
    {
        Icon: LiaShippingFastSolid,
        title: 'Phương thức vận chuyển',
        size: 20,
        route: routes.phuongthucvanchuyen,
    },
];

export default function Aside({ position }) {
    const { admin, logout } = useContext(AdminContext);

    return (
        <div className="p-5 flex flex-col h-svh text-[16px]">
            <div className="flex items-center gap-2 pb-3">
                {admin ? (
                    <>
                        <img src={`${imageUrl}/${admin.admin_avatar_url}`} alt="" className="w-8 h-8 rounded-full" />
                        <span className="font-semibold ">{admin.admin_username}</span>
                    </>
                ) : (
                    <Avatar icon={<UserOutlined />} />
                )}
            </div>

            <div className="flex flex-col gap-3 mb-2 pb-2 border-b-2">
                <span>Quản trị hệ thống</span>
                <AsideTag Icon={PieChartOutlined} title={'Tổng quan'} route={routes.home} activeTag={position} />
            </div>

            <div className="flex-1 flex flex-col gap-5 ">
                <span>Chức năng quản lí</span>
                {tags.map((tag, index) => {
                    return (
                        <AsideTag
                            key={index}
                            Icon={tag.Icon}
                            title={tag.title}
                            size={tag.size || null}
                            route={tag.route}
                            activeTag={position}
                        />
                    );
                })}
            </div>

            <div className="flex items-center gap-2 cursor-pointer" onClick={() => logout()}>
                <LogoutOutlined style={{ fontSize: 17 }} />
                <span className="flex-1">Đăng xuất</span>
            </div>
        </div>
    );
}
