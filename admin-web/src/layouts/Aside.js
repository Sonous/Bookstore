import React, { useContext } from 'react';
import { BookOutlined, LogoutOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { SlBookOpen } from 'react-icons/sl';
import { BiBookAlt } from 'react-icons/bi';
import { MdOutlinePayment } from 'react-icons/md';
import { LiaShippingFastSolid } from 'react-icons/lia';

import { imageUrl } from '~/configs/axios.config';
import { AdminContext } from '~/context/AdminContextProvider';
import { useNavigate } from 'react-router-dom';

const tags = [
    {
        key: 'gr1',
        label: 'Quản trị hệ thống',
        type: 'group',
        children: [
            {
                key: 'Tổng quan',
                icon: <PieChartOutlined style={{ fontSize: 24 }} />,
                label: 'Tổng quan',
                nav: '/',
            },
        ],
    },
    {
        key: 'gr2',
        label: 'Chức năng quản lí',
        type: 'group',
        children: [
            {
                key: 'Người dùng',
                icon: <UserOutlined style={{ fontSize: 24 }} />,
                label: 'Người dùng',
            },
            {
                key: 'Sách',
                icon: <BookOutlined style={{ fontSize: 24 }} />,
                label: 'Sách',
                children: [
                    {
                        key: 'Quản lí đánh giá',
                        label: 'Quản lí đánh giá',
                        nav: '/quan-li-danh-gia',
                    },
                ],
            },
            {
                key: 'Danh mục',
                icon: <SlBookOpen size={24} />,
                label: 'Danh mục',
            },
            {
                key: 'Thể loại',
                icon: <BiBookAlt size={24} />,
                label: 'Thể loại',
            },
            {
                key: 'Phương thức thanh toán',
                icon: <MdOutlinePayment size={24} />,
                label: 'Phương thức thanh toán',
            },
            {
                key: 'Phương thức vận chuyển',
                icon: <LiaShippingFastSolid size={24} />,
                label: 'Phương thức vận chuyển',
            },
        ],
    },
];

export default function Aside({ openedKey, selectedKey }) {
    const { admin, logout, setPage } = useContext(AdminContext);
    const navigate = useNavigate();

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

            <div className="flex-1 flex flex-col gap-5 ">
                <Menu
                    items={tags}
                    mode="inline"
                    onClick={({ item }) => (item.props.nav ? navigate(item.props.nav) : navigate('/'))}
                    defaultOpenKeys={[openedKey]}
                    defaultSelectedKeys={[selectedKey]}
                />
            </div>

            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                    logout();
                    navigate('login');
                }}
            >
                <LogoutOutlined style={{ fontSize: 17 }} />
                <span className="flex-1">Đăng xuất</span>
            </div>
        </div>
    );
}
